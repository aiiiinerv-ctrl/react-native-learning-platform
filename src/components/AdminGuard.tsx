'use client';
import { useAuth } from '@/context/AuthContext';
import { isAdminEmail } from '@/lib/admin';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <div className="empty-state"><div className="empty-state-icon">⏳</div><p>Loading...</p></div>;

    if (!user || !isAdminEmail(user.email)) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🔒</div>
                <p>Access denied — Admin only</p>
            </div>
        );
    }

    return <>{children}</>;
}
