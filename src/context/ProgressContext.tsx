'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  useEffect(() => {
    const saved = localStorage.getItem('rn-learn-progress');
    if (saved) {
      try { setProgress(JSON.parse(saved)); } catch {}
    }
  }, []);

  const toggleLesson = (lessonId: string) => {
    setProgress(prev => {
      const next = { ...prev, [lessonId]: !prev[lessonId] };
      localStorage.setItem('rn-learn-progress', JSON.stringify(next));
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
