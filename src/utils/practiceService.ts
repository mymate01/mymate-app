import { supabase } from './supabase';
import { GRADE1_MODULES } from './grade1Data';
import { PracticeModule, UserProgressData } from '../types/practice';

/**
 * Data Service for MyMate Practice Pad (Grade 1 focus)
 */
export const PracticeService = {
  /**
   * Fetch all active practice modules for Grade 1
   */
  async getModules(): Promise<PracticeModule[]> {
    try {
      // Attempt to fetch from Supabase
      const { data, error } = await supabase
        .from('learning_modules')
        .select('*');
      
      // If Supabase is unconfigured, has an error, or is empty, use our rich local seed dataset
      if (error || !data || data.length === 0) {
        console.log('PracticeService: Supabase unconfigured or returned empty. Using premium local Grade 1 dataset.');
        return GRADE1_MODULES;
      }
      
      // Map Supabase rows back to PracticeModule type
      // Expects learning_modules.content_data to match PracticeModule layout
      const modules: PracticeModule[] = data.map(row => ({
        id: row.id,
        title: row.title,
        subject: row.content_data?.subject || 'maths',
        description: row.content_data?.description || '',
        icon: row.content_data?.icon || '📝',
        difficulty: row.content_data?.difficulty || 'Beginner',
        questions: row.content_data?.questions || []
      }));
      
      return modules;
    } catch (e) {
      console.warn('PracticeService: Failed to fetch from Supabase. Falling back to local Grade 1 data.', e);
      return GRADE1_MODULES;
    }
  },

  /**
   * Fetch a specific module by ID
   */
  async getModuleById(id: string): Promise<PracticeModule | null> {
    const modules = await this.getModules();
    return modules.find(m => m.id === id) || null;
  },

  /**
   * Log user quiz score and progress outcomes
   */
  async logUserProgress(progress: UserProgressData): Promise<boolean> {
    try {
      // 1. Attempt to sync with Supabase
      const { error } = await supabase
        .from('user_progress')
        .insert({
          user_id: progress.userId || null, // Map to logged in user if available
          module_id: progress.moduleId,
          score: progress.score,
          completed_at: progress.completedAt
        });

      if (error) {
        console.warn('PracticeService: Supabase progress insert failed. Saving to LocalStorage instead.', error.message);
      } else {
        console.log('PracticeService: Progress successfully logged to Supabase.');
      }
    } catch (e) {
      console.warn('PracticeService: Exception logging progress to Supabase. Saving to LocalStorage.', e);
    }

    // 2. Always persist locally in LocalStorage as secondary backup & local streaks
    try {
      if (typeof window !== 'undefined') {
        const historyKey = 'mymate_practice_history';
        const existingRaw = localStorage.getItem(historyKey);
        const history: UserProgressData[] = existingRaw ? JSON.parse(existingRaw) : [];
        
        history.push(progress);
        localStorage.setItem(historyKey, JSON.stringify(history));
        
        // Update local streak counter
        this.updateStreak();
        return true;
      }
    } catch (localErr) {
      console.error('PracticeService: LocalStorage persistence failed.', localErr);
    }

    return false;
  },

  /**
   * Get locally stored progress logs
   */
  getHistory(): UserProgressData[] {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('mymate_practice_history');
        return raw ? JSON.parse(raw) : [];
      }
    } catch (e) {
      console.error('PracticeService: Failed to read history from LocalStorage', e);
    }
    return [];
  },

  /**
   * Update active user daily streak
   */
  updateStreak(): number {
    try {
      if (typeof window !== 'undefined') {
        const streakKey = 'mymate_practice_streak';
        const lastPracticeKey = 'mymate_last_practice_date';
        
        const todayStr = new Date().toDateString();
        const lastPracticeDate = localStorage.getItem(lastPracticeKey);
        
        let currentStreak = parseInt(localStorage.getItem(streakKey) || '0', 10);
        
        if (!lastPracticeDate) {
          currentStreak = 1;
        } else {
          const lastDate = new Date(lastPracticeDate);
          const todayDate = new Date(todayStr);
          
          const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            // Consecutive day, increment
            currentStreak += 1;
          } else if (diffDays > 1) {
            // Streak broken, reset
            currentStreak = 1;
          }
          // If diffDays is 0 (same day), do nothing to streak count
        }
        
        localStorage.setItem(streakKey, currentStreak.toString());
        localStorage.setItem(lastPracticeKey, todayStr);
        
        return currentStreak;
      }
    } catch (e) {
      console.error('PracticeService: Failed to update streak', e);
    }
    return 0;
  },

  /**
   * Get active user daily streak
   */
  getStreak(): number {
    try {
      if (typeof window !== 'undefined') {
        // First verify if the streak is broken
        const lastPracticeKey = 'mymate_last_practice_date';
        const streakKey = 'mymate_practice_streak';
        
        const lastPracticeDate = localStorage.getItem(lastPracticeKey);
        if (lastPracticeDate) {
          const lastDate = new Date(lastPracticeDate);
          const todayDate = new Date(new Date().toDateString());
          
          const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays > 1) {
            // Streak broken, reset
            localStorage.setItem(streakKey, '0');
            return 0;
          }
        }
        
        return parseInt(localStorage.getItem(streakKey) || '0', 10);
      }
    } catch (e) {
      console.error('PracticeService: Failed to read streak', e);
    }
    return 0;
  }
};
