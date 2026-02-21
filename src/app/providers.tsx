'use client';
import { I18nProvider } from '@/i18n/I18nProvider';
import { AuthProvider } from '@/context/AuthContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <I18nProvider>
                <AuthProvider>
                    <ProgressProvider>
                        <Navbar />
                        <main>{children}</main>
                    </ProgressProvider>
                </AuthProvider>
            </I18nProvider>
        </ThemeProvider>
    );
}
