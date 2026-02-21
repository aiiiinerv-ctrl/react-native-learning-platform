export type Locale = 'th' | 'en';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      expert: 'Expert',
      dashboard: 'Dashboard',
      language: 'ไทย',
    },
    // Home page
    home: {
      hero_title: 'Master React Native',
      hero_subtitle: 'A comprehensive learning platform with auto-updating curriculum, progress tracking, and SDK deprecation alerts',
      hero_cta: 'Start Learning',
      levels_title: 'Choose Your Learning Path',
      latest_sdk: 'Latest SDK',
      total_lessons: 'Total Lessons',
      auto_updated: 'Auto-Updated',
      updates_title: 'Latest SDK Updates',
      features_title: 'Platform Features',
      feature_auto_update: 'Auto-Update Engine',
      feature_auto_update_desc: 'Curriculum automatically syncs with the latest React Native SDK releases',
      feature_progress: 'Progress Tracking',
      feature_progress_desc: 'Track your learning journey with detailed progress analytics',
      feature_deprecation: 'Deprecation Alerts',
      feature_deprecation_desc: 'Get notified about deprecated APIs and learn replacement patterns',
      feature_bilingual: 'Bilingual Content',
      feature_bilingual_desc: 'Switch between Thai and English anytime',
    },
    // Level descriptions
    levels: {
      beginner: {
        title: 'Beginner',
        description: 'Start your React Native journey. Learn project setup, MVVM/MVC patterns, core components, and basic navigation.',
        modules_count: 'modules',
        lessons_count: 'lessons',
      },
      intermediate: {
        title: 'Intermediate',
        description: 'Deep dive into state management, advanced routing, data persistence, and testing strategies.',
        modules_count: 'modules',
        lessons_count: 'lessons',
      },
      expert: {
        title: 'Expert',
        description: 'Master CI/CD pipelines, bundle optimization, native modules, and production deployment.',
        modules_count: 'modules',
        lessons_count: 'lessons',
      },
    },
    // Dashboard
    dashboard: {
      title: 'Learning Dashboard',
      overall_progress: 'Overall Progress',
      completed: 'Completed',
      in_progress: 'In Progress',
      not_started: 'Not Started',
      deprecation_alerts: 'Deprecation Alerts',
      recently_updated: 'Recently Updated Lessons',
      no_alerts: 'No deprecation alerts for your completed lessons!',
      no_progress: 'Start learning to track your progress!',
      replacement: 'Replacement',
      affected_lesson: 'Affected Lesson',
      severity: 'Severity',
      since_version: 'Since Version',
    },
    // Lesson
    lesson: {
      mark_complete: 'Mark as Complete',
      mark_incomplete: 'Mark as Incomplete',
      completed: 'Completed',
      next_lesson: 'Next Lesson',
      prev_lesson: 'Previous Lesson',
      back_to_module: 'Back to Module',
      deprecation_warning: 'Deprecation Warning',
      deprecated_code: 'Deprecated Code',
      replacement_code: 'Replacement Code',
      sdk_version: 'SDK Version',
      progress: 'Progress',
    },
    // Common
    common: {
      lessons: 'lessons',
      modules: 'modules',
      loading: 'Loading...',
      error: 'Something went wrong',
      version: 'Version',
    },
  },
  th: {
    // Navigation
    nav: {
      home: 'หน้าหลัก',
      beginner: 'เริ่มต้น',
      intermediate: 'ปานกลาง',
      expert: 'ผู้เชี่ยวชาญ',
      dashboard: 'แดชบอร์ด',
      language: 'EN',
    },
    // Home page
    home: {
      hero_title: 'เชี่ยวชาญ React Native',
      hero_subtitle: 'แพลตฟอร์มเรียนรู้ครบวงจร พร้อมหลักสูตรอัพเดตอัตโนมัติ ติดตามความก้าวหน้า และแจ้งเตือน API ที่ถูกยกเลิก',
      hero_cta: 'เริ่มเรียน',
      levels_title: 'เลือกเส้นทางการเรียนรู้',
      latest_sdk: 'SDK ล่าสุด',
      total_lessons: 'บทเรียนทั้งหมด',
      auto_updated: 'อัพเดตอัตโนมัติ',
      updates_title: 'อัพเดต SDK ล่าสุด',
      features_title: 'ฟีเจอร์ของแพลตฟอร์ม',
      feature_auto_update: 'ระบบอัพเดตอัตโนมัติ',
      feature_auto_update_desc: 'หลักสูตร sync กับ React Native SDK เวอร์ชันล่าสุดโดยอัตโนมัติ',
      feature_progress: 'ติดตามความก้าวหน้า',
      feature_progress_desc: 'ติดตามเส้นทางการเรียนรู้พร้อมสถิติโดยละเอียด',
      feature_deprecation: 'แจ้งเตือนการยกเลิก',
      feature_deprecation_desc: 'รับแจ้งเตือนเมื่อ API ถูกยกเลิก พร้อมโค้ดทดแทน',
      feature_bilingual: 'รองรับ 2 ภาษา',
      feature_bilingual_desc: 'สลับระหว่างภาษาไทยและอังกฤษได้ตลอดเวลา',
    },
    // Level descriptions
    levels: {
      beginner: {
        title: 'เริ่มต้น',
        description: 'เริ่มต้นเส้นทาง React Native เรียนรู้การตั้งค่าโปรเจ็กต์ รูปแบบ MVVM/MVC คอมโพเนนต์หลัก และการนำทางเบื้องต้น',
        modules_count: 'โมดูล',
        lessons_count: 'บทเรียน',
      },
      intermediate: {
        title: 'ปานกลาง',
        description: 'เจาะลึกการจัดการ State, Routing ขั้นสูง, การจัดเก็บข้อมูล และกลยุทธ์การทดสอบ',
        modules_count: 'โมดูล',
        lessons_count: 'บทเรียน',
      },
      expert: {
        title: 'ผู้เชี่ยวชาญ',
        description: 'เชี่ยวชาญ CI/CD Pipeline, การเพิ่มประสิทธิภาพ Bundle, Native Modules และการ Deploy สู่ Production',
        modules_count: 'โมดูล',
        lessons_count: 'บทเรียน',
      },
    },
    // Dashboard
    dashboard: {
      title: 'แดชบอร์ดการเรียนรู้',
      overall_progress: 'ความก้าวหน้าโดยรวม',
      completed: 'เรียนจบแล้ว',
      in_progress: 'กำลังเรียน',
      not_started: 'ยังไม่เริ่ม',
      deprecation_alerts: 'การแจ้งเตือนการยกเลิก',
      recently_updated: 'บทเรียนที่อัพเดตล่าสุด',
      no_alerts: 'ไม่มีการแจ้งเตือนสำหรับบทเรียนที่เรียนจบแล้ว!',
      no_progress: 'เริ่มเรียนเพื่อติดตามความก้าวหน้า!',
      replacement: 'โค้ดทดแทน',
      affected_lesson: 'บทเรียนที่ได้รับผลกระทบ',
      severity: 'ระดับความรุนแรง',
      since_version: 'ตั้งแต่เวอร์ชัน',
    },
    // Lesson
    lesson: {
      mark_complete: 'ทำเครื่องหมายว่าเรียนจบ',
      mark_incomplete: 'ยกเลิกเครื่องหมาย',
      completed: 'เรียนจบแล้ว',
      next_lesson: 'บทเรียนถัดไป',
      prev_lesson: 'บทเรียนก่อนหน้า',
      back_to_module: 'กลับไปที่โมดูล',
      deprecation_warning: 'คำเตือนการยกเลิก',
      deprecated_code: 'โค้ดที่ถูกยกเลิก',
      replacement_code: 'โค้ดทดแทน',
      sdk_version: 'เวอร์ชัน SDK',
      progress: 'ความก้าวหน้า',
    },
    // Common
    common: {
      lessons: 'บทเรียน',
      modules: 'โมดูล',
      loading: 'กำลังโหลด...',
      error: 'เกิดข้อผิดพลาด',
      version: 'เวอร์ชัน',
    },
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends object ? DeepStringify<T[K]> : string;
};

export type TranslationKeys = DeepStringify<typeof translations.en>;
