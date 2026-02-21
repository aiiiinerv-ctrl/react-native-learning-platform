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

export interface FirestoreUsage {
    documents: number;
    estimatedStorageMB: number;
    collections: { name: string; docCount: number; estimatedSizeKB: number }[];
    reads: number;  // estimated reads this session
}

// Spark Plan free tier daily limits
export const SPARK_LIMITS = {
    reads: 50000,
    writes: 20000,
    deletes: 20000,
    storedDataGB: 1,       // 1 GiB stored data
    networkEgressGB: 10,   // 10 GiB/month
};

let sessionReads = 0;
let sessionWrites = 0;

export function trackRead(count: number = 1) { sessionReads += count; }
export function trackWrite(count: number = 1) { sessionWrites += count; }
export function getSessionReads() { return sessionReads; }
export function getSessionWrites() { return sessionWrites; }

export async function getFirestoreUsageEstimate(): Promise<FirestoreUsage> {
    const collectionNames = ['users'];
    const collectionStats: { name: string; docCount: number; estimatedSizeKB: number }[] = [];
    let totalDocs = 0;
    let totalSizeBytes = 0;

    for (const name of collectionNames) {
        const snap = await getDocs(collection(db, name));
        trackRead(snap.size);
        let colSizeBytes = 0;

        for (const d of snap.docs) {
            const dataStr = JSON.stringify(d.data());
            const docSize = dataStr.length + d.id.length + 32; // rough estimate
            colSizeBytes += docSize;

            // Check for subcollections (notifications, progress)
            try {
                const notifSnap = await getDocs(collection(db, name, d.id, 'notifications'));
                trackRead(notifSnap.size || 1);
                totalDocs += notifSnap.size;
                for (const nd of notifSnap.docs) {
                    colSizeBytes += JSON.stringify(nd.data()).length + nd.id.length + 32;
                }
            } catch {
                // subcollection may not exist
            }
        }

        totalDocs += snap.size;
        totalSizeBytes += colSizeBytes;
        collectionStats.push({
            name,
            docCount: snap.size,
            estimatedSizeKB: Math.round(colSizeBytes / 1024 * 100) / 100,
        });
    }

    return {
        documents: totalDocs,
        estimatedStorageMB: Math.round(totalSizeBytes / (1024 * 1024) * 1000) / 1000,
        collections: collectionStats,
        reads: sessionReads,
    };
}
