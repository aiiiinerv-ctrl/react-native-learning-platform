import { db } from './firebase';
import { collection, doc, setDoc, getDocs, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export interface AppNotification {
    id: string;
    type: 'lesson_complete' | 'recommendation' | 'achievement';
    title: string;
    body: string;
    lessonId?: string;
    createdAt: string;
    read: boolean;
}

export async function addNotification(uid: string, notification: Omit<AppNotification, 'id'>) {
    const notifRef = doc(collection(db, 'users', uid, 'notifications'));
    await setDoc(notifRef, notification);
    return notifRef.id;
}

export async function getNotifications(uid: string): Promise<AppNotification[]> {
    const snap = await getDocs(collection(db, 'users', uid, 'notifications'));
    return snap.docs
        .map(d => ({ id: d.id, ...d.data() } as AppNotification))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function markNotificationRead(uid: string, notifId: string) {
    await updateDoc(doc(db, 'users', uid, 'notifications', notifId), { read: true });
}

export async function markAllRead(uid: string) {
    const snap = await getDocs(collection(db, 'users', uid, 'notifications'));
    const updates = snap.docs.filter(d => !d.data().read).map(d =>
        updateDoc(doc(db, 'users', uid, 'notifications', d.id), { read: true })
    );
    await Promise.all(updates);
}

export function createLessonCompleteNotification(lessonTitle: string, lessonId: string, locale: string): Omit<AppNotification, 'id'> {
    return {
        type: 'lesson_complete',
        title: locale === 'th' ? '🎉 เรียนจบบทเรียน!' : '🎉 Lesson Complete!',
        body: locale === 'th'
            ? `คุณเรียนจบบทเรียน "${lessonTitle}" แล้ว`
            : `You completed the lesson "${lessonTitle}"`,
        lessonId,
        createdAt: new Date().toISOString(),
        read: false,
    };
}
