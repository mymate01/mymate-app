export type Grade1Subject = 'maths' | 'abacus' | 'english' | 'fraction' | 'maths_additions' | 'maths_subtractions' | 'maths_wordproblems' | 'general_knowledge' | 'science' | 'games' | 'games_maze' | 'games_puzzle' | 'games_pattern' | 'games_detective' | 'hindi';


export type QuestionType = 'mcq' | 'abacus_count' | 'fraction_shading' | 'maze' | 'sliding_puzzle' | 'pattern_match' | 'detective';

export interface ScaffoldingHint {
  conceptClue: string;      // Friendly, inspiring nudge about the concept (shown on first hint click)
  stepByStepClue: string;  // Detailed mathematical or grammatical help (shown on second hint click)
}

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  subject: Grade1Subject;
  questionText: string;
  options?: string[];               // Required for MCQs
  correctAnswer?: string | number; // String index for MCQ (e.g. "A" or "0"), number for abacus count/shading
  explanation: string;
  hint: ScaffoldingHint;
  
  // Interactive component parameters
  abacusTargetCount?: number;       // For abacus_count questions, target number of beads
  fractionTotalSegments?: number;  // For fraction_shading, total parts of the shape
  fractionShadedTarget?: number;   // For fraction_shading, target parts to be shaded
  shapeType?: 'circle' | 'square' | 'rectangle'; // For fraction shapes

  // Worksheet equation parameters
  operandA?: number;
  operandB?: number;
  operator?: '+' | '-';
  wordProblemItem?: string;

  // Game parameters
  mazeGrid?: number[][];          // 0=path, 1=wall, 2=start, 3=end
  puzzleTiles?: (string | null)[]; // flat array of tile labels, null = empty slot
  puzzleSize?: number;             // grid dimension (3 or 4)
  patternSequence?: string[];      // visual sequence, '?' marks the missing piece
  patternOptions?: string[];       // 4 visual options for pattern match
  sceneEmojis?: string[];          // characters in the detective scene
  sceneStory?: string;             // narrative text for the scenario
  sceneClues?: string[];           // clue texts
}

export interface PracticeModule {
  id: string;
  title: string;
  subject: Grade1Subject;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: PracticeQuestion[];
}

export interface UserProgressData {
  moduleId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  completedAt: string;
}
