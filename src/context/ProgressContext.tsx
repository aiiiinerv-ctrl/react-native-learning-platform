'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/data/types';

interface ProgressContextType {
  progress: Progress;
  toggleLesson: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  getCompletedCount: () => number;
  completedLessons: string[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>({});
  const { user } = useAuth();

  // Load progress from localStorage or Firestore
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        // User is logged in — load from Firestore
        try {
          const ref = doc(db, 'users', user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const firestoreProgress = snap.data().progress || {};
            // Merge with any localStorage progress
            const localRaw = localStorage.getItem('rn-learn-progress');
            const localProgress = localRaw ? JSON.parse(localRaw) : {};
            const merged = { ...localProgress, ...firestoreProgress };
            setProgress(merged);
            // Save merged back to Firestore
            await setDoc(ref, { progress: merged }, { merge: true });
            // Clear localStorage after successful merge
            localStorage.removeItem('rn-learn-progress');
          } else {
            // First time user — migrate localStorage to Firestore
            const localRaw = localStorage.getItem('rn-learn-progress');
            if (localRaw) {
              const localProgress = JSON.parse(localRaw);
              setProgress(localProgress);
              await setDoc(doc(db, 'users', user.uid), { progress: localProgress });
              localStorage.removeItem('rn-learn-progress');
            }
          }
        } catch (err) {
          console.error('Failed to load Firestore progress:', err);
          // Fallback to localStorage
          const saved = localStorage.getItem('rn-learn-progress');
          if (saved) setProgress(JSON.parse(saved));
        }
      } else {
        // Not logged in — use localStorage
        const saved = localStorage.getItem('rn-learn-progress');
        if (saved) {
          try { setProgress(JSON.parse(saved)); } catch { }
        }
      }
    };
    loadProgress();
  }, [user]);

  const saveProgress = useCallback(async (next: Progress) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { progress: next }, { merge: true });
      } catch (err) {
        console.error('Failed to save to Firestore:', err);
        localStorage.setItem('rn-learn-progress', JSON.stringify(next));
      }
    } else {
      localStorage.setItem('rn-learn-progress', JSON.stringify(next));
    }
  }, [user]);

  const toggleLesson = (lessonId: string) => {
    setProgress(prev => {
      const next = { ...prev, [lessonId]: !prev[lessonId] };
      saveProgress(next);
      return next;
    });
  };

  const isCompleted = (lessonId: string) => !!progress[lessonId];
  const getCompletedCount = () => Object.values(progress).filter(Boolean).length;
  const completedLessons = Object.entries(progress).filter(([, v]) => v).map(([k]) => k);

  return (
    <ProgressContext.Provider value={{ progress, toggleLesson, isCompleted, getCompletedCount, completedLessons }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
