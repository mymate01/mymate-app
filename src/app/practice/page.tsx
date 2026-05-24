'use client';

import React, { useState, useEffect } from 'react';
import styles from './practice.module.css';
import { PracticeService } from '../../utils/practiceService';
import { PracticeModule, PracticeQuestion, UserProgressData } from '../../types/practice';
import { 
  generateAbacusQuestions, 
  generateAdditionQuestionsDynamic, 
  generateSubtractionQuestionsDynamic, 
  generateWordProblemsDynamic,
  generateEnglishLogicQuestionsDynamic,
  generateFractionQuestionsDynamic,
  generateGeneralKnowledgeQuestionsDynamic,
  generateScienceQuestionsDynamic,
  generateMazeQuestionsDynamic,
  generateSlidingPuzzleQuestionsDynamic,
  generatePatternMatchQuestionsDynamic,
  generateDetectiveQuestionsDynamic,
  generateHindiQuestionsDynamic,
  AbacusDifficulty 
} from '../../utils/grade1Data';
import { supabase } from '../../utils/supabase';

// Subcomponents
import GradeExamSelector from '../../components/Practice/GradeExamSelector';
import SetupDashboard from '../../components/Practice/SetupDashboard';
import QuizRunner from '../../components/Practice/QuizRunner';
import ScoreReview from '../../components/Practice/ScoreReview';
import GameCategoryPicker from '../../components/Practice/GameCategoryPicker';

export default function PracticePage() {
  // ─── STATE MANAGEMENT ──────────────────────────────────────────
  const [activeView, setActiveView] = useState<'dashboard' | 'quiz' | 'review' | 'gamePicker'>('dashboard');
  const [modules, setModules] = useState<PracticeModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<PracticeModule | null>(null);

  // Authentication & Gatekeeper States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setupMode, setSetupMode] = useState(false);
  const [setupDifficulty, setSetupDifficulty] = useState<AbacusDifficulty>('beginner');
  const [setupQuestionCount, setSetupQuestionCount] = useState<number>(10);
  const [showAuthWallModal, setShowAuthWallModal] = useState(false);
  const [authWallReason, setAuthWallReason] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [showComingSoonModal, setShowComingSoonModal] = useState<string | null>(null);
  const [activeDashboardTab, setActiveDashboardTab] = useState<'stats' | 'curriculum'>('stats');
  
  // Dashboard stats
  const [streakCount, setStreakCount] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [totalStarsEarned, setTotalStarsEarned] = useState(0);

  // Active quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Map of answers: key is question.id, value is string index (MCQ) or number (abacus/fractions)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | number>>({});
  
  // Track active visual values for single question interactives
  const [activeFractionShaded, setActiveFractionShaded] = useState(0);
  const [activeAbacusValue, setActiveAbacusValue] = useState(0);

  // Track abacuses for double abacus worksheet view (questions A & B)
  const [activeAbacusA, setActiveAbacusA] = useState(0);
  const [activeAbacusB, setActiveAbacusB] = useState(0);

  // Scaffolding hints state: key is question.id, value is hint level (0 | 1 | 2)
  const [hintLevels, setHintLevels] = useState<Record<string, number>>({});

  const [startTime, setStartTime] = useState<number>(0);
  const [timeTakenSeconds, setTimeTakenSeconds] = useState(0);
  const [finalScores, setFinalScores] = useState<boolean[]>([]);

  // ─── LOAD INITIAL STATS ────────────────────────────────────────
  useEffect(() => {
    async function loadData() {
      const fetchedModules = await PracticeService.getModules();
      setModules(fetchedModules);

      // Check auth status (Supabase session + local mock status)
      try {
        if (supabase && supabase.auth) {
          const { data: { user } } = await supabase.auth.getUser();
          const localLogin = typeof window !== 'undefined' ? localStorage.getItem('mymate_logged_in') === 'true' : false;
          setIsLoggedIn(!!user || localLogin);
        } else {
          const localLogin = typeof window !== 'undefined' ? localStorage.getItem('mymate_logged_in') === 'true' : false;
          setIsLoggedIn(localLogin);
        }
      } catch (e) {
        const localLogin = typeof window !== 'undefined' ? localStorage.getItem('mymate_logged_in') === 'true' : false;
        setIsLoggedIn(localLogin);
      }

      const history = PracticeService.getHistory();
      const currentStreak = PracticeService.getStreak();
      setStreakCount(currentStreak);

      if (history.length > 0) {
        setQuestionsAnswered(history.reduce((sum, h) => sum + h.totalQuestions, 0));
        setTotalStarsEarned(history.reduce((sum, h) => sum + h.score, 0));
        
        const totalAccuracy = history.reduce((sum, h) => sum + h.accuracy, 0);
        setAverageAccuracy(Math.round(totalAccuracy / history.length));
      }
    }
    loadData();
  }, [activeView]);

  // Sync abacus slider values when navigating in double abacus mode
  useEffect(() => {
    if (selectedModule && selectedModule.subject === 'abacus') {
      const qA = selectedModule.questions[currentQuestionIndex];
      const qB = selectedModule.questions[currentQuestionIndex + 1];

      if (qA) {
        const valA = quizAnswers[qA.id] !== undefined ? Number(quizAnswers[qA.id]) : 0;
        setActiveAbacusA(valA);
      }
      if (qB) {
        const valB = quizAnswers[qB.id] !== undefined ? Number(quizAnswers[qB.id]) : 0;
        setActiveAbacusB(valB);
      }
    }
  }, [currentQuestionIndex, selectedModule]);

  // ─── HANDLERS ──────────────────────────────────────────────────
  const startQuiz = (module: PracticeModule) => {
    setSelectedModule(module);
    if (module.subject === 'games') {
      setActiveView('gamePicker');
    } else {
      setSetupMode(true);
      setSetupDifficulty('beginner');
      setSetupQuestionCount(10);
    }
  };

  const handleSelectGame = (gameSubject: string) => {
    if (!selectedModule) return;
    const gameTitles: Record<string, string> = {
      games_maze: 'Maze Runner',
      games_puzzle: 'Sliding Puzzle',
      games_pattern: 'Pattern Match',
      games_detective: 'Detective Club'
    };
    setSelectedModule({
      ...selectedModule,
      subject: gameSubject as any,
      title: gameTitles[gameSubject] || 'Game'
    });
    setSetupMode(true);
    setSetupDifficulty('beginner');
    setSetupQuestionCount(10);
    setActiveView('dashboard');
  };

  const handleStartProceduralQuiz = () => {
    if (!selectedModule) return;
    
    let proceduralQuestions: PracticeQuestion[] = [];
    let title = selectedModule.title;
    
    const difficultyLabel = setupDifficulty === 'beginner' 
      ? 'Simple' 
      : setupDifficulty === 'medium' 
        ? 'Two Digit' 
        : 'Three Digit';
    
    const sub = selectedModule.subject;
    if (sub === 'abacus') {
      proceduralQuestions = generateAbacusQuestions(setupQuestionCount, setupDifficulty, Date.now());
      title = `Grade 1 Abacus Master (${setupDifficulty.charAt(0).toUpperCase() + setupDifficulty.slice(1)})`;
    } else if (sub === 'maths_additions') {
      proceduralQuestions = generateAdditionQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      title = `Grade 1 Additions (${difficultyLabel})`;
    } else if (sub === 'maths_subtractions') {
      proceduralQuestions = generateSubtractionQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      title = `Grade 1 Subtractions (${difficultyLabel})`;
    } else if (sub === 'maths_wordproblems') {
      proceduralQuestions = generateWordProblemsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      title = `Grade 1 Word Problems (${difficultyLabel})`;
    } else if (sub === 'english') {
      proceduralQuestions = generateEnglishLogicQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      const elLabel = setupDifficulty === 'beginner' ? 'Beginner' : setupDifficulty === 'medium' ? 'Intermediate' : 'Advanced';
      title = `Grade 1 English Logic (${elLabel})`;
    } else if (sub === 'fraction') {
      proceduralQuestions = generateFractionQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      const frLabel = setupDifficulty === 'beginner' ? 'Beginner' : setupDifficulty === 'medium' ? 'Intermediate' : 'Advanced';
      title = `Grade 1 Fraction Shapes (${frLabel})`;
    } else if (sub === 'general_knowledge') {
      proceduralQuestions = generateGeneralKnowledgeQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      const gkLabel = setupDifficulty === 'beginner' ? 'Beginner' : setupDifficulty === 'medium' ? 'Intermediate' : 'Advanced';
      title = `Grade 1 General Knowledge (${gkLabel})`;
    } else if (sub === 'science') {
      proceduralQuestions = generateScienceQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      const scLabel = setupDifficulty === 'beginner' ? 'Beginner' : setupDifficulty === 'medium' ? 'Intermediate' : 'Advanced';
      title = `Grade 1 Science (${scLabel})`;
    } else if (sub === 'games_maze') {
      proceduralQuestions = generateMazeQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      title = `Maze Runner`;
    } else if (sub === 'games_puzzle') {
      proceduralQuestions = generateSlidingPuzzleQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      title = `Sliding Puzzle`;
    } else if (sub === 'games_pattern') {
      proceduralQuestions = generatePatternMatchQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      title = `Pattern Match`;
    } else if (sub === 'games_detective') {
      proceduralQuestions = generateDetectiveQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      title = `Detective Club`;
    } else if (sub === 'hindi') {
      proceduralQuestions = generateHindiQuestionsDynamic(setupQuestionCount, setupDifficulty, Date.now());
      const hnLabel = setupDifficulty === 'beginner' ? 'Beginner' : setupDifficulty === 'medium' ? 'Intermediate' : 'Advanced';
      title = `Grade 1 Hindi (${hnLabel})`;
    }
    
    const modifiedModule: PracticeModule = {
      ...selectedModule,
      title,
      questions: proceduralQuestions
    };
    
    setSelectedModule(modifiedModule);
    setSetupMode(false);
    
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setHintLevels({});
    setActiveFractionShaded(0);
    setActiveAbacusValue(0);
    setActiveAbacusA(0);
    setActiveAbacusB(0);
    setStartTime(Date.now());
    setActiveView('quiz');
  };

  const handleMCQSelect = (questionId: string, optionIndex: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    playSelectionSound();
  };

  const handleAbacusChangeSingle = (val: number, questionId: string) => {
    setActiveAbacusValue(val);
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: val
    }));
  };

  const handleAbacusChangeA = (val: number, questionId: string) => {
    setActiveAbacusA(val);
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: val
    }));
  };

  const handleAbacusChangeB = (val: number, questionId: string) => {
    setActiveAbacusB(val);
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: val
    }));
  };

  const handleFractionChange = (val: number, questionId: string) => {
    setActiveFractionShaded(val);
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: val
    }));
  };

  const toggleHint = (questionId: string, currentLevel: number) => {
    const nextLevel = currentLevel + 1;
    if (nextLevel <= 2) {
      setHintLevels(prev => ({
        ...prev,
        [questionId]: nextLevel
      }));
    }
  };

  const playSelectionSound = () => {
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      // AudioContext blocked
    }
  };

  const playFinalScoreSound = (accuracy: number) => {
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (accuracy >= 75) {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
          gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.12);
          osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5
          gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.24);
          osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.36); // C6
          gain.gain.setValueAtTime(0.15, ctx.currentTime + 0.36);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.72);
        } else {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          osc.frequency.setValueAtTime(587.33, ctx.currentTime + 0.15); // D5
          gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.42);
        }
      }
    } catch (e) {
      // AudioContext blocked
    }
  };

  const handleTextAnswerChange = (questionId: string, value: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handlePrevQuizPage = () => {
    if (!selectedModule) return;

    const isAbacus = selectedModule.subject === 'abacus';
    const isMathSheet = selectedModule.subject === 'maths_additions' || selectedModule.subject === 'maths_subtractions';
    const stepSize = isMathSheet ? 5 : isAbacus ? 2 : 1;
    const prevIndex = currentQuestionIndex - stepSize;

    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      setActiveFractionShaded(0);
      setActiveAbacusValue(0);
      setActiveAbacusA(0);
      setActiveAbacusB(0);
    }
  };

  const handleNextQuizPage = async () => {
    if (!selectedModule) return;

    const isAbacus = selectedModule.subject === 'abacus';
    const isMathSheet = selectedModule.subject === 'maths_additions' || selectedModule.subject === 'maths_subtractions';
    const stepSize = isMathSheet ? 5 : isAbacus ? 2 : 1;
    const nextIndex = currentQuestionIndex + stepSize;

    if (nextIndex < selectedModule.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setActiveFractionShaded(0);
      setActiveAbacusValue(0);
      setActiveAbacusA(0);
      setActiveAbacusB(0);
    } else {
      // SUBMIT QUIZ: Calculate final scoring
      const scores = selectedModule.questions.map(q => {
        const userAnswer = quizAnswers[q.id];
        if (userAnswer === undefined) return false;

        const cleanUser = userAnswer.toString().trim();
        const cleanCorrect = q.correctAnswer?.toString().trim();
        return cleanUser === cleanCorrect;
      });

      const correctCount = scores.filter(Boolean).length;
      const totalTime = Math.round((Date.now() - startTime) / 1000);
      setTimeTakenSeconds(totalTime);
      setFinalScores(scores);

      const accuracy = Math.round((correctCount / selectedModule.questions.length) * 100);

      const newProgress: UserProgressData = {
        moduleId: selectedModule.id,
        userId: 'temp-student-id',
        score: correctCount,
        totalQuestions: selectedModule.questions.length,
        accuracy: accuracy,
        timeSpentSeconds: totalTime,
        completedAt: new Date().toISOString()
      };

      await PracticeService.logUserProgress(newProgress);
      playFinalScoreSound(accuracy);
      setActiveView('review');
    }
  };

  const exitQuiz = () => {
    setSelectedModule(null);
    setSetupMode(false);
    setShowAuthWallModal(false);
    setActiveView('dashboard');
  };

  // ─── RENDER SUB-VIEWS ──────────────────────────────────────────
  const renderLoggedInDashboard = () => {
    if (activeDashboardTab === 'curriculum') {
      return (
        <div className={styles.dashboardWrapper}>
          <div className={`${styles.bgOrb} ${styles.orb1}`} />
          <div className={`${styles.bgOrb} ${styles.orb2}`} />
          
          <button className={styles.backBtn} onClick={() => setActiveDashboardTab('stats')}>
            <span>←</span> Back to Dashboard
          </button>
          
          <GradeExamSelector
            onSelectGrade={(grade) => setSelectedGrade(grade)}
            onShowComingSoon={(title) => setShowComingSoonModal(title)}
          />
        </div>
      );
    }

    const history = PracticeService.getHistory();
    const streak = PracticeService.getStreak();
    const hasHistory = history.length > 0;
    
    const totalTaken = history.length;
    const avgAccuracy = hasHistory ? Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / totalTaken) : 0;
    
    const moduleStats: Record<string, { total: number, correct: number, accuracySum: number, count: number, name: string }> = {};
    
    const getModuleName = (id: string) => {
      if (id.includes('additions')) return 'Grade 1 Additions';
      if (id.includes('subtractions')) return 'Grade 1 Subtractions';
      if (id.includes('wordproblems')) return 'Grade 1 Word Problems';
      if (id.includes('abacus')) return 'Grade 1 Abacus';
      if (id.includes('english')) return 'Grade 1 English';
      if (id.includes('fraction')) return 'Grade 1 Fractions';
      if (id.includes('general-knowledge')) return 'Grade 1 General Knowledge';
      if (id.includes('science')) return 'Grade 1 Science';
      if (id.includes('games')) return 'Grade 1 Games';
      if (id.includes('hindi')) return 'Grade 1 Hindi';
      return id;
    };

    history.forEach(h => {
      if (!moduleStats[h.moduleId]) {
        moduleStats[h.moduleId] = { total: 0, correct: 0, accuracySum: 0, count: 0, name: getModuleName(h.moduleId) };
      }
      moduleStats[h.moduleId].accuracySum += h.accuracy;
      moduleStats[h.moduleId].count += 1;
    });

    const moduleAverages = Object.entries(moduleStats).map(([id, stat]) => ({
      id,
      name: stat.name,
      avgAccuracy: Math.round(stat.accuracySum / stat.count)
    }));

    const sortedByAccuracy = [...moduleAverages].sort((a, b) => a.avgAccuracy - b.avgAccuracy);
    const weakest = sortedByAccuracy[0];
    const strongest = sortedByAccuracy[sortedByAccuracy.length - 1];

    return (
      <div className={styles.dashboardWrapper} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', paddingBottom: '20px' }}>
        <div className={`${styles.bgOrb} ${styles.orb1}`} />
        <div className={`${styles.bgOrb} ${styles.orb2}`} />

        <div className={styles.headerArea} style={{ width: '100%', marginBottom: '24px' }}>
          <div className={styles.headerText}>
            <h1 className="text-gradient" style={{ fontSize: '2.2rem', fontWeight: 800 }}>Practice Dashboard 📊</h1>
            <p>Welcome back! Monitor your statistics and choose customized practices.</p>
          </div>
          <button 
            type="button"
            onClick={() => setActiveDashboardTab('curriculum')}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.9rem' }}
          >
            <span>🚀</span> Start New Practice
          </button>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsContainerCard}>
          <div className={styles.glassDashboardCard}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2d3748', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📈</span> Learning Stats
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center', marginTop: '16px' }}>
              <div style={{ background: '#fffcf9', border: '1px solid rgba(255, 126, 95, 0.15)', borderRadius: '12px', padding: '10px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Taken</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff6b4a', marginTop: '4px' }}>{totalTaken}</div>
              </div>
              <div style={{ background: '#fffcf9', border: '1px solid rgba(255, 126, 95, 0.15)', borderRadius: '12px', padding: '10px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Accuracy</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff6b4a', marginTop: '4px' }}>{avgAccuracy}%</div>
              </div>
              <div style={{ background: '#fffcf9', border: '1px solid rgba(255, 126, 95, 0.15)', borderRadius: '12px', padding: '10px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>Streak</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff6b4a', marginTop: '4px' }}>{streak}🔥</div>
              </div>
            </div>
          </div>

          <div className={styles.glassDashboardCard}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2d3748', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🎯</span> Focus & Weak Areas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              {strongest ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', padding: '8px 12px', borderRadius: '10px', border: '1px solid #bbf7d0', fontSize: '0.85rem' }}>
                  <span style={{ color: '#15803d', fontWeight: 600 }}>🌟 Highest: {strongest.name}</span>
                  <span style={{ fontWeight: 800, color: '#15803d' }}>{strongest.avgAccuracy}%</span>
                </div>
              ) : (
                <p style={{ color: '#718096', fontSize: '0.85rem', fontStyle: 'italic' }}>Take quizzes to see Topic Strengths.</p>
              )}
              {weakest ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff5f5', padding: '8px 12px', borderRadius: '10px', border: '1px solid #fed7d7', fontSize: '0.85rem' }}>
                  <span style={{ color: '#c53030', fontWeight: 600 }}>⚠️ Lowest: {weakest.name}</span>
                  <span style={{ fontWeight: 800, color: '#c53030' }}>{weakest.avgAccuracy}%</span>
                </div>
              ) : (
                <p style={{ color: '#718096', fontSize: '0.85rem', fontStyle: 'italic' }}>Take quizzes to see Topic Weaknesses.</p>
              )}
            </div>
          </div>

          <div className={styles.glassDashboardCard}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2d3748', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💡</span> Practice Advice
            </h3>
            <div style={{ marginTop: '12px' }}>
              {weakest ? (
                <div style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.4' }}>
                  Your accuracy in <strong>{weakest.name}</strong> is currently {weakest.avgAccuracy}%. We suggest reviews and practice in this module.
                  <button 
                    type="button"
                    onClick={() => {
                      setSelectedGrade(1);
                      setActiveDashboardTab('curriculum');
                    }}
                    className={styles.testSkillBtn}
                    style={{ marginTop: '10px', padding: '6px 12px', fontSize: '0.8rem', width: 'auto', display: 'inline-block' }}
                  >
                    Practice Weak Subject
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                  No recommendation history yet. Select "Start New Practice" to take your first session!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className={styles.statsDashboardCard} style={{ marginTop: '16px', width: '100%' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2d3748', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📅</span> Recent Session History
          </h3>
          {hasHistory ? (
            <div style={{ overflowX: 'auto', marginTop: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.05)', color: '#718096' }}>
                    <th style={{ padding: '8px', fontWeight: 700 }}>Topic / Module</th>
                    <th style={{ padding: '8px', fontWeight: 700 }}>Score</th>
                    <th style={{ padding: '8px', fontWeight: 700 }}>Accuracy</th>
                    <th style={{ padding: '8px', fontWeight: 700 }}>Date Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(-5).reverse().map((h, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                      <td style={{ padding: '10px 8px', fontWeight: 600, color: '#2d3748' }}>{getModuleName(h.moduleId)}</td>
                      <td style={{ padding: '10px 8px', color: '#ff6b4a', fontWeight: 700 }}>{h.score} / {h.totalQuestions}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <span style={{
                          background: h.accuracy >= 80 ? '#e6fffa' : h.accuracy >= 50 ? '#fffaf0' : '#fff5f5',
                          color: h.accuracy >= 80 ? '#00695c' : h.accuracy >= 50 ? '#dd6b20' : '#e53e3e',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}>
                          {h.accuracy}%
                        </span>
                      </td>
                      <td style={{ padding: '10px 8px', color: '#a0aec0' }}>{new Date(h.completedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#718096', fontSize: '0.9rem', margin: '20px 0 10px 0', fontStyle: 'italic' }}>
              No completed sessions found. Click "Start New Practice" to begin!
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    // If a grade is selected, show the specific grade's challenges (regardless of login status)
    if (selectedGrade !== null) {
      return (
        <div className={styles.dashboardWrapper}>
          <div className={`${styles.bgOrb} ${styles.orb1}`} />
          <div className={`${styles.bgOrb} ${styles.orb2}`} />

          <button className={styles.backBtn} onClick={() => setSelectedGrade(null)}>
            <span>←</span> Back to Grades
          </button>

          <h2 className={styles.gridTitle}>Choose your Grade {selectedGrade} Challenge 🎈</h2>
          <div className={styles.subjectGrid}>
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                className={styles.subjectCard}
                onClick={() => startQuiz(m)}
              >
                <span className={styles.subjectIcon}>{m.icon}</span>
                <h3 className={styles.subjectTitle}>{m.title}</h3>
                <p className={styles.subjectDesc}>{m.description}</p>
                <div className={styles.subjectFooter}>
                  <span className={styles.diffBadge}>{m.difficulty}</span>
                  <span className={styles.startBtn}>
                    Play Quiz <span>→</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (isLoggedIn) {
      return renderLoggedInDashboard();
    }

    return (
      <GradeExamSelector
        onSelectGrade={(grade) => setSelectedGrade(grade)}
        onShowComingSoon={(title) => setShowComingSoonModal(title)}
      />
    );
  };

  // View 1.6: Glassmorphic Gated Auth Modal Wall
  const renderAuthWallModal = () => {
    if (!showAuthWallModal) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.authWallCard}>
          <span className={styles.lockBadge}>🔒</span>
          <h2 className={styles.authTitle}>Unlock Premium Exercises</h2>
          <p className={styles.authText}>
            You clicked a gated option: <strong>{authWallReason}</strong>.<br/>
            Free users are limited to a 10-question sample quiz. Sign in to your MyMate account to unlock up to 50 questions and 1,000+ procedural calculations!
          </p>
          <button
            type="button"
            className={styles.setupStartBtn}
            onClick={() => {
              window.location.href = '/login?redirect=/practice';
            }}
            style={{ margin: '8px 0 12px 0' }}
          >
            Sign In with MyMate 🔑
          </button>
          <br />
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={() => setShowAuthWallModal(false)}
          >
            Cancel and Play Free 10-Question Sample
          </button>
        </div>
      </div>
    );
  };

  const renderComingSoonModal = () => {
    if (!showComingSoonModal) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.authWallCard}>
          <span className={styles.lockBadge} style={{ animation: 'none', fontSize: '3.5rem' }}>🚀</span>
          <h2 className={styles.authTitle}>Coming Soon!</h2>
          <p className={styles.authText}>
            Practice curriculum and interactive challenges for <strong>{showComingSoonModal}</strong> are currently under construction.
            <br/><br/>
            In the meantime, you can explore our fully featured <strong>1st Grade</strong> modules!
          </p>
          <button
            type="button"
            className={styles.setupStartBtn}
            onClick={() => {
              setSelectedGrade(1);
              setShowComingSoonModal(null);
            }}
            style={{ margin: '8px 0 12px 0' }}
          >
            Try Grade 1 Practice
          </button>
          <br />
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={() => setShowComingSoonModal(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <main className={styles.practiceContainer}>
      {setupMode && selectedModule && (
        <SetupDashboard
          selectedModule={selectedModule}
          setupDifficulty={setupDifficulty}
          onSetSetupDifficulty={setSetupDifficulty}
          setupQuestionCount={setupQuestionCount}
          onSetSetupQuestionCount={setSetupQuestionCount}
          isLoggedIn={isLoggedIn}
          onTriggerAuthWall={(reason) => {
            setAuthWallReason(reason);
            setShowAuthWallModal(true);
          }}
          onExit={exitQuiz}
          onStart={handleStartProceduralQuiz}
        />
      )}
      {!setupMode && activeView === 'gamePicker' && (
        <div style={{ paddingTop: '40px' }}>
          <GameCategoryPicker 
            onSelectGame={handleSelectGame} 
            onBack={() => setActiveView('dashboard')} 
          />
        </div>
      )}
      {!setupMode && activeView === 'dashboard' && renderDashboard()}
      {!setupMode && activeView === 'quiz' && selectedModule && (
        <QuizRunner
          selectedModule={selectedModule}
          currentQuestionIndex={currentQuestionIndex}
          quizAnswers={quizAnswers}
          hintLevels={hintLevels}
          activeFractionShaded={activeFractionShaded}
          activeAbacusValue={activeAbacusValue}
          activeAbacusA={activeAbacusA}
          activeAbacusB={activeAbacusB}
          onAbacusAChange={handleAbacusChangeA}
          onAbacusBChange={handleAbacusChangeB}
          onFractionChange={handleFractionChange}
          onMCQSelect={handleMCQSelect}
          onToggleHint={toggleHint}
          onExit={exitQuiz}
          onNextPage={handleNextQuizPage}
          onPrevPage={handlePrevQuizPage}
          onTextAnswerChange={handleTextAnswerChange}
        />
      )}
      {!setupMode && activeView === 'review' && selectedModule && (
        <ScoreReview
          selectedModule={selectedModule}
          finalScores={finalScores}
          quizAnswers={quizAnswers}
          timeTakenSeconds={timeTakenSeconds}
          onDone={() => setActiveView('dashboard')}
        />
      )}
      {renderAuthWallModal()}
      {renderComingSoonModal()}
    </main>
  );
}
