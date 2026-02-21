'use client';
import { I18nProvider } from '@/i18n/I18nProvider';
import { ProgressProvider } from '@/context/ProgressContext';
import Navbar from '@/components/Navbar';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <I18nProvider>
            <ProgressProvider>
                <Navbar />
                <main>{children}</main>
            </ProgressProvider>
        </I18nProvider>
    );
}
