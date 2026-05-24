'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.css';
import { supabase } from '../../utils/supabase';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/practice';

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (!supabase.auth) {
        setErrorMsg('Supabase client is not configured. Please check your .env.local file.');
        setLoading(false);
        return;
      }

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Registration successful! (If email confirmations are enabled in Supabase, please check your inbox.)');
        setIsSignUp(false); // Switch to sign in mode
        setPassword(''); // Clear password for security
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Successful login, redirect
        router.push(redirectPath);
      }
    } catch (error: any) {
      console.log('Authentication failed:', error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Welcome to MyMate</h1>
        <p className={styles.loginSubtitle}>
          {isSignUp ? 'Create an account to track your progress!' : 'Sign in to unlock premium practice sessions!'}
        </p>

        {errorMsg && (
          <div style={{ color: '#e53e3e', background: '#fed7d7', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailAuth}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="student@mymate.edu" 
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className={styles.input} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '0.95rem', color: '#718096' }}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button 
            type="button" 
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
            style={{ background: 'none', border: 'none', color: '#ff7e5f', fontWeight: 'bold', cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#fffcf9' }}>
        <p style={{ color: '#ff6b4a', fontWeight: 800 }}>Loading Login...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
