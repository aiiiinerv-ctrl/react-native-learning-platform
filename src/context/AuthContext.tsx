'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getToken } from 'firebase/messaging';
import { auth, googleProvider, db, messaging } from '@/lib/firebase';
import { isAdminEmail } from '@/lib/admin';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const requestNotificationPermissionAndSaveToken = async (uid: string) => {
        if (!messaging) return;
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const currentToken = await getToken(messaging, {
                    // vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE' 
                });
                if (currentToken) {
                    await setDoc(doc(db, 'users', uid), {
                        fcmToken: currentToken,
                    }, { merge: true });
                }
            }
        } catch (error) {
            console.error('Failed to get FCM token:', error);
        }
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            setIsAdmin(isAdminEmail(u?.email));
            setLoading(false);

            // Save/update user profile in Firestore
            if (u) {
                try {
                    await setDoc(doc(db, 'users', u.uid), {
                        displayName: u.displayName || '',
                        email: u.email || '',
                        photoURL: u.photoURL || '',
                        lastActive: new Date().toISOString(),
                    }, { merge: true });

                    // Also setup push notifications
                    await requestNotificationPermissionAndSaveToken(u.uid);
                } catch (err) {
                    console.error('Failed to save user profile:', err);
                }
            }
        });
        return () => unsub();
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error('Google sign-in failed:', err);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (err) {
            console.error('Sign-out failed:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
