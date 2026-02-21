'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Locale, TranslationKeys } from './translations';

interface I18nContextType {
    locale: Locale;
    t: TranslationKeys;
    toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en');
    useEffect(() => {
        const saved = localStorage.getItem('rn-learn-locale') as Locale;
        if (saved && (saved === 'th' || saved === 'en')) setLocale(saved);
    }, []);
    const toggleLocale = () => {
        const nl = locale === 'en' ? 'th' : 'en';
        setLocale(nl);
        localStorage.setItem('rn-learn-locale', nl);
    };
    return (
        <I18nContext.Provider value={{ locale, t: translations[locale], toggleLocale }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n must be used within I18nProvider');
    return ctx;
}
