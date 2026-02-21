import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from './providers';

export const metadata: Metadata = {
  title: 'RN Learn — React Native Learning Platform',
  description: 'A comprehensive learning platform for React Native with auto-updating curriculum, progress tracking, and deprecation alerts. Available in Thai and English.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
