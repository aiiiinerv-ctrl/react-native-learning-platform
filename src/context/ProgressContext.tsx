'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import { addNotification, createLessonCompleteNotification } from '@/lib/notifications';
import { curriculum } from '@/data/curriculum';
import { Progress } from '@/data/types';

interface ProgressContextType {
  progress: Progress;
  toggleLesson: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  getCompletedCount: () => number;
  completedLessons: string[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

function getLessonTitle(lessonId: string, locale: string): string {
  for (const level of curriculum) {
    for (const mod of level.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.id === lessonId) return locale === 'th' ? lesson.titleTh : lesson.titleEn;
      }
    }
  }
  return lessonId;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>({});
  const { user } = useAuth();
  const { locale } = useI18n();

  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        try {
          const ref = doc(db, 'users', user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const firestoreProgress = snap.data().progress || {};
            const localRaw = localStorage.getItem('rn-learn-progress');
            const localProgress = localRaw ? JSON.parse(localRaw) : {};
            const merged = { ...localProgress, ...firestoreProgress };
            setProgress(merged);
            await setDoc(ref, { progress: merged }, { merge: true });
            localStorage.removeItem('rn-learn-progress');
          } else {
            const localRaw = localStorage.getItem('rn-learn-progress');
            if (localRaw) {
              const localProgress = JSON.parse(localRaw);
              setProgress(localProgress);
              await setDoc(doc(db, 'users', user.uid), { progress: localProgress }, { merge: true });
              localStorage.removeItem('rn-learn-progress');
            }
          }
        } catch (err) {
          console.error('Failed to load Firestore progress:', err);
          const saved = localStorage.getItem('rn-learn-progress');
          if (saved) setProgress(JSON.parse(saved));
        }
      } else {
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
      const wasCompleted = prev[lessonId];
      const next = { ...prev, [lessonId]: !wasCompleted };
      saveProgress(next);

      // Send notification when marking as complete (not when un-marking)
      if (!wasCompleted && user) {
        const title = getLessonTitle(lessonId, locale);
        const notif = createLessonCompleteNotification(title, lessonId, locale);
        addNotification(user.uid, notif).catch(console.error);
      }

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
