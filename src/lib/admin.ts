import { db } from './firebase';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { curriculum } from '@/data/curriculum';

export const ADMIN_EMAILS = ['ainerv86@gmail.com'];

export function isAdminEmail(email: string | null | undefined): boolean {
    return !!email && ADMIN_EMAILS.includes(email);
}

export interface UserProfile {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    lastActive: string;
    progress: Record<string, boolean>;
}

export async function getAllUsers(): Promise<UserProfile[]> {
    const snap = await getDocs(collection(db, 'users'));
    return snap.docs.map(d => ({ uid: d.id, ...d.data() } as UserProfile));
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? { uid: snap.id, ...snap.data() } as UserProfile : null;
}

export function getTotalLessonCount(): number {
    return curriculum.reduce((sum, level) =>
        sum + level.modules.reduce((s, m) => s + m.lessons.length, 0), 0);
}

export function getUserProgress(progress: Record<string, boolean>): number {
    const completed = Object.values(progress || {}).filter(Boolean).length;
    const total = getTotalLessonCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function generateRecommendation(progress: Record<string, boolean>, locale: string): string {
    const completedIds = new Set(Object.entries(progress || {}).filter(([, v]) => v).map(([k]) => k));

    for (const level of curriculum) {
        for (const mod of level.modules) {
            for (const lesson of mod.lessons) {
                if (!completedIds.has(lesson.id)) {
                    const title = locale === 'th' ? lesson.titleTh : lesson.titleEn;
                    return locale === 'th'
                        ? `แนะนำให้เรียนบทถัดไป: "${title}" ในระดับ ${level.id}`
                        : `We recommend continuing with: "${title}" in ${level.id} level`;
                }
            }
        }
    }

    return locale === 'th' ? 'ยินดีด้วย! คุณเรียนจบทุกบทเรียนแล้ว 🎉' : 'Congratulations! You completed all lessons 🎉';
}

export async function sendRecommendationToUser(uid: string, message: string) {
    const notifRef = doc(collection(db, 'users', uid, 'notifications'));
    await setDoc(notifRef, {
        type: 'recommendation',
        title: 'Learning Recommendation',
        body: message,
        createdAt: new Date().toISOString(),
        read: false,
    });
}

export async function getFirestoreCollections(): Promise<{ name: string; docs: { id: string; data: any }[] }[]> {
    const collections = ['users'];
    const result = [];

    for (const name of collections) {
        const snap = await getDocs(collection(db, name));
        result.push({
            name,
            docs: snap.docs.map(d => ({ id: d.id, data: d.data() })),
        });
    }

    return result;
}

export async function deleteDocument(collectionName: string, docId: string) {
    await deleteDoc(doc(db, collectionName, docId));
}
