export interface Lesson {
    id: string;
    titleEn: string;
    titleTh: string;
    descriptionEn: string;
    descriptionTh: string;
    sdkVersion: string;
    lastUpdated: string;
    contentEn: string;
    contentTh: string;
    codeExamples: CodeExample[];
    deprecations?: DeprecationInfo[];
}

export interface CodeExample {
    title: string;
    language: string;
    code: string;
}

export interface DeprecationInfo {
    feature: string;
    deprecatedInVersion: string;
    severity: 'warning' | 'critical';
    oldCode: string;
    newCode: string;
    descriptionEn: string;
    descriptionTh: string;
}

export interface Module {
    id: string;
    titleEn: string;
    titleTh: string;
    descriptionEn: string;
    descriptionTh: string;
    lessons: Lesson[];
}

export interface Level {
    id: 'beginner' | 'intermediate' | 'expert';
    modules: Module[];
}

export type Progress = Record<string, boolean>;
