import { Module } from './types';

export const expertModules: Module[] = [
  {
    id: 'e-cicd',
    titleEn: 'CI/CD Pipelines',
    titleTh: 'CI/CD Pipelines',
    descriptionEn: 'Automate build, test, and deployment workflows',
    descriptionTh: 'ทำให้กระบวนการ build, test และ deploy เป็นอัตโนมัติ',
    lessons: [
      {
        id: 'e01-eas',
        titleEn: 'CI/CD with EAS Build',
        titleTh: 'CI/CD ด้วย EAS Build',
        descriptionEn: 'Cloud builds and submissions with Expo Application Services',
        descriptionTh: 'Build และ submit บน cloud ด้วย Expo Application Services',
        sdkVersion: '0.76', lastUpdated: '2026-02-10',
        contentEn: `# EAS Build\n\nEAS (Expo Application Services) provides cloud-based build infrastructure.\n\n## Setup\n\`\`\`bash\nnpm install -g eas-cli\neas login\neas build:configure\n\`\`\`\n\n## Build Profiles (eas.json)\n- **development**: Internal testing builds\n- **preview**: Staging/QA builds\n- **production**: App Store/Play Store builds\n\n## Automated Submissions\n\`\`\`bash\neas submit --platform ios\neas submit --platform android\n\`\`\``,
        contentTh: `# EAS Build\n\nEAS ให้บริการ build infrastructure บน cloud\n\n## ตั้งค่า\n\`\`\`bash\nnpm install -g eas-cli\neas login\neas build:configure\n\`\`\`\n\n## Build Profiles (eas.json)\n- **development**: Build สำหรับทดสอบภายใน\n- **preview**: Build สำหรับ Staging/QA\n- **production**: Build สำหรับ App Store/Play Store`,
        codeExamples: [{
          title: 'eas.json Configuration',
          language: 'json',
          code: `{\n  "cli": { "version": ">= 3.0.0" },\n  "build": {\n    "development": {\n      "developmentClient": true,\n      "distribution": "internal"\n    },\n    "preview": {\n      "distribution": "internal",\n      "ios": { "simulator": true }\n    },\n    "production": {\n      "autoIncrement": true\n    }\n  },\n  "submit": {\n    "production": {\n      "ios": { "appleId": "your@email.com", "ascAppId": "123456789" },\n      "android": { "serviceAccountKeyPath": "./google-services.json" }\n    }\n  }\n}`
        }]
      },
      {
        id: 'e02-github-actions',
        titleEn: 'CI/CD with GitHub Actions',
        titleTh: 'CI/CD ด้วย GitHub Actions',
        descriptionEn: 'Automate builds and tests with GitHub Actions',
        descriptionTh: 'ทำ build และ test อัตโนมัติด้วย GitHub Actions',
        sdkVersion: '0.76', lastUpdated: '2026-02-10',
        contentEn: `# GitHub Actions for React Native\n\n## Workflow Triggers\n- Push to main/develop\n- Pull request\n- Manual dispatch\n- Scheduled (cron)\n\n## Key Steps\n1. Checkout code\n2. Setup Node.js\n3. Install dependencies\n4. Run linting\n5. Run tests\n6. Build (EAS or native)`,
        contentTh: `# GitHub Actions สำหรับ React Native\n\n## สิ่งที่ trigger Workflow\n- Push ไป main/develop\n- Pull request\n- สั่งรันเอง\n- ตามเวลา (cron)`,
        codeExamples: [{
          title: 'GitHub Actions Workflow',
          language: 'yaml',
          code: 'name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test -- --coverage\n\n  build:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: expo/expo-github-action@v8\n        with:\n          eas-version: latest\n          token: ${{ secrets.EXPO_TOKEN }}\n      - run: npm ci\n      - run: eas build --platform all --non-interactive'
        }]
      },
      {
        id: 'e03-fastlane',
        titleEn: 'CI/CD with Fastlane',
        titleTh: 'CI/CD ด้วย Fastlane',
        descriptionEn: 'Automate deployment with Fastlane',
        descriptionTh: 'Deploy อัตโนมัติด้วย Fastlane',
        sdkVersion: '0.76', lastUpdated: '2026-02-10',
        contentEn: `# Fastlane\n\nFastlane is a tool for automating iOS and Android deployments.\n\n## Setup\n\`\`\`bash\nbrew install fastlane\nfastlane init\n\`\`\`\n\n## Key Features\n- **match**: Code signing management\n- **gym**: Build iOS apps\n- **pilot**: TestFlight uploads\n- **supply**: Google Play uploads`,
        contentTh: `# Fastlane\n\nFastlane เป็นเครื่องมือสำหรับทำ deploy iOS และ Android อัตโนมัติ\n\n## ฟีเจอร์หลัก\n- **match**: จัดการ code signing\n- **gym**: Build แอป iOS\n- **pilot**: อัพโหลดไป TestFlight\n- **supply**: อัพโหลดไป Google Play`,
        codeExamples: [{
          title: 'Fastfile',
          language: 'ruby',
          code: `default_platform(:ios)\n\nplatform :ios do\n  desc "Push a new beta build to TestFlight"\n  lane :beta do\n    increment_build_number\n    build_app(scheme: "MyApp")\n    upload_to_testflight\n  end\n\n  desc "Push to App Store"\n  lane :release do\n    build_app(scheme: "MyApp")\n    upload_to_app_store(skip_metadata: true)\n  end\nend`
        }]
      }
    ]
  },
  {
    id: 'e-optimize',
    titleEn: 'Optimization & Advanced',
    titleTh: 'การเพิ่มประสิทธิภาพและขั้นสูง',
    descriptionEn: 'Bundle optimization, native modules, and advanced patterns',
    descriptionTh: 'เพิ่มประสิทธิภาพ bundle, native modules และรูปแบบขั้นสูง',
    lessons: [
      {
        id: 'e04-mmkv',
        titleEn: 'Ultra-Fast Storage with MMKV',
        titleTh: 'เก็บข้อมูลโคตรเร็วด้วย MMKV',
        descriptionEn: 'Replace slow AsyncStorage with high-performance MMKV',
        descriptionTh: 'เปลี่ยน AsyncStorage ที่อืดอาดเป็น MMKV ที่เร็วปรื๊ด',
        sdkVersion: '0.76', lastUpdated: '2026-02-10',
        contentEn: `# React Native MMKV ⚡️

If you are building a professional app, you should **stop using AsyncStorage**. It is asynchronous, slow, and can cause UI blockages.

## Meet MMKV
MMKV is a mobile key-value storage framework developed by WeChat. It is **30x faster than AsyncStorage**!
- It is fully **synchronous** (no more \`await\`).
- It encrypts data easily.
- It is perfect for storing user sessions, theme preferences, or caching simple API responses.`,
        contentTh: `# React Native MMKV ⚡️

ถ้าคุณกำลังทำแอประดับโปรเฟสชันนัล **เลิกใช้ AsyncStorage ได้แล้วครับ** เนื่อกจากมันทำงานแบบ Asynchronous ซึ่งช้า และบางครั้งก็ทำให้หน้าจอกระตุกได้

## รู้จักกับ MMKV
MMKV เป็นระบบเก็บข้อมูลที่พัฒนาโดยทีม WeChat ซึ่งทำงานเร็วกว่า AsyncStorage ถึง **30 เท่า!** 
- มันทำงานแบบ **Synchronous** (ไม่ต้องเขียน \`await\` ให้เมื่อยมือ)
- รองรับการเข้ารหัสข้อมูล (Encryption) ได้ง่ายๆ
- เหมาะมากสำหรับเก็บ Token ล็อกอิน, การตั้งค่าแอป, หรือ Cache ข้อมูลเล็กๆ น้อยๆ`,
        codeExamples: [{
          title: 'MMKV Usage',
          language: 'typescript',
          code: `import { MMKV } from 'react-native-mmkv';

// 1. Create a storage instance
export const storage = new MMKV();

// 2. Write data (Synchronous - NO AWAIT!)
storage.set('user.name', 'John Doe');
storage.set('user.age', 25);
storage.set('isDarkMode', true);

// 3. Read data
const userName = storage.getString('user.name');
const age = storage.getNumber('user.age');
const isDark = storage.getBoolean('isDarkMode');

// 4. Delete data
storage.delete('user.name');`
        }]
      },
      {
        id: 'e05-watermelon',
        titleEn: 'Offline-First Apps (WatermelonDB)',
        titleTh: 'แอปแบบ Offline-First (WatermelonDB)',
        descriptionEn: 'Build reactive, offline-first apps that scale to 10,000s of records',
        descriptionTh: 'สร้างแอปที่ใช้งานตอนออฟไลน์ได้สบายๆ แม้มีข้อมูลนับหมื่น',
        sdkVersion: '0.76', lastUpdated: '2026-02-10',
        contentEn: `# WatermelonDB 🍉

If your app needs to work without the internet (Offline-First) and has thousands of records (like a chat app, or complex note-taking app), MMKV isn't enough. You need a real database.

## Why WatermelonDB?
- **Lazy Loading**: It only loads data when the screen actually needs it. You can have 10,000 records, and the app will still open instantly.
- **Reactive**: If data changes in the database, the UI updates automatically (just like React State).
- **Sync**: It has a built-in engine to safely sync offline changes back to your remote server when the internet comes back.`,
        contentTh: `# WatermelonDB 🍉

ถ้าแอปของคุณจำเป็นต้องใช้งานตอนไม่มีเน็ต (Offline-First) และมีข้อมูลเป็นหมื่นๆ ชิ้น (เช่น แอปแชท, แอปจดโน้ตซับซ้อน) ลำพังแค่ MMKV คงไม่พอ คุณต้องใช้ Database แบบเต็มตัว

## ทำไมต้องเป็น WatermelonDB?
- **Lazy Loading**: มันจะดึงข้อมูลมาเฉพาะตอนที่หน้าจอนั้นจำเป็นต้องใช้จริงๆ สมมติมีข้อมูล 10,000 รายการ แอปก็ยังเปิดติดทันที
- **Responsive & Reactive**: ถ้าฐานข้อมูลเปลี่ยน หน้าจอจะอัปเดตตามอัตโนมัติ (เหมือน State ของ React เลย)
- **ระบบ Sync ในตัว**: มีเครื่องมือช่วยซิงก์ข้อมูลออฟไลน์กลับไปที่เซิร์ฟเวอร์หลักอย่างปลอดภัย เมื่อเน็ตกลับมาต่อติด`,
        codeExamples: [{
          title: 'Reactive Database Component',
          language: 'tsx',
          code: `import { withObservables } from '@nozbe/watermelondb/react';
import { View, Text } from 'react-native';

const PostList = ({ posts }) => (
  <View>
    {posts.map(post => (
      <Text key={post.id}>{post.title}</Text>
    ))}
  </View>
);

// This "magically" connects the component to the database. 
// Whenever posts are added or deleted, this component updates instantly!
export default withObservables(['posts'], ({ database }) => ({
  posts: database.collections.get('posts').query().observe(),
}))(PostList);`
        }]
      },
      {
        id: 'e06-native',
        titleEn: 'Native Modules & Bridging',
        titleTh: 'Native Modules และ Bridging',
        descriptionEn: 'Write native code and bridge to JavaScript',
        descriptionTh: 'เขียน native code และ bridge ไปยัง JavaScript',
        sdkVersion: '0.76', lastUpdated: '2026-02-15',
        contentEn: `# Native Modules\n\n## New Architecture (TurboModules)\nReact Native 0.76+ uses the New Architecture by default:\n- **TurboModules**: Lazy-loaded native modules\n- **Fabric**: New rendering system\n- **JSI**: Direct C++ communication`,
        contentTh: `# Native Modules\n\n## New Architecture (TurboModules)\nReact Native 0.76+ ใช้ New Architecture โดยค่าเริ่มต้น:\n- **TurboModules**: Native modules ที่โหลดตามต้องการ\n- **Fabric**: ระบบ rendering ใหม่\n- **JSI**: สื่อสารตรงผ่าน C++`,
        codeExamples: [{
          title: 'TurboModule Spec',
          language: 'typescript',
          code: `// NativeCalendar.ts\nimport type { TurboModule } from 'react-native';\nimport { TurboModuleRegistry } from 'react-native';\n\nexport interface Spec extends TurboModule {\n  getEvents(date: string): Promise<string[]>;\n  createEvent(title: string, date: string): Promise<boolean>;\n}\n\nexport default TurboModuleRegistry.getEnforcing<Spec>('NativeCalendar');`
        }],
        deprecations: [{
          feature: 'Legacy Native Modules (NativeModules)',
          deprecatedInVersion: '0.76',
          severity: 'critical',
          oldCode: `import { NativeModules } from 'react-native';\nconst { MyModule } = NativeModules;\nMyModule.doSomething();`,
          newCode: `import NativeMyModule from './NativeMyModule';\n// TurboModule with codegen\nNativeMyModule.doSomething();`,
          descriptionEn: 'Legacy NativeModules bridge is replaced by TurboModules for better performance and type safety.',
          descriptionTh: 'Legacy NativeModules bridge ถูกแทนที่ด้วย TurboModules เพื่อประสิทธิภาพและ type safety ที่ดีกว่า'
        }]
      },
      {
        id: 'e07-animations',
        titleEn: 'Advanced Animations (Reanimated)',
        titleTh: 'Animation ขั้นสูง (Reanimated)',
        descriptionEn: 'High-performance animations with Reanimated',
        descriptionTh: 'Animation ประสิทธิภาพสูงด้วย Reanimated',
        sdkVersion: '0.76', lastUpdated: '2026-02-15',
        contentEn: `# Reanimated\n\nReact Native Reanimated runs animations on the UI thread for 60fps performance.\n\n## Key Concepts\n- **Shared Values**: Animated values on UI thread\n- **useAnimatedStyle**: Animated style hook\n- **withTiming/withSpring**: Animation functions\n- **Gesture Handler**: Touch-driven animations`,
        contentTh: `# Reanimated\n\nReact Native Reanimated รัน animation บน UI thread เพื่อประสิทธิภาพ 60fps\n\n## แนวคิดหลัก\n- **Shared Values**: ค่า animated บน UI thread\n- **useAnimatedStyle**: Animated style hook\n- **withTiming/withSpring**: ฟังก์ชัน animation\n- **Gesture Handler**: Animation ที่ขับเคลื่อนด้วย touch`,
        codeExamples: [{
          title: 'Reanimated Example',
          language: 'tsx',
          code: `import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';\n\nexport function BouncyBox() {\n  const scale = useSharedValue(1);\n  const animatedStyle = useAnimatedStyle(() => ({\n    transform: [{ scale: scale.value }],\n  }));\n\n  const handlePress = () => {\n    scale.value = withSpring(scale.value === 1 ? 1.5 : 1);\n  };\n\n  return (\n    <Pressable onPress={handlePress}>\n      <Animated.View style={[styles.box, animatedStyle]} />\n    </Pressable>\n  );\n}`
        }]
      },
      {
        id: 'e08-security',
        titleEn: 'Security Best Practices',
        titleTh: 'แนวปฏิบัติด้านความปลอดภัย',
        descriptionEn: 'Secure your React Native application',
        descriptionTh: 'รักษาความปลอดภัยแอป React Native',
        sdkVersion: '0.76', lastUpdated: '2026-02-15',
        contentEn: `# Security Best Practices\n\n1. **Never store secrets in code** — use environment variables\n2. **Use HTTPS** for all API calls\n3. **Encrypt sensitive data** with react-native-keychain\n4. **Certificate pinning** for API connections\n5. **Obfuscate code** with ProGuard/R8\n6. **Disable debugging** in production builds`,
        contentTh: `# แนวปฏิบัติด้านความปลอดภัย\n\n1. **อย่าเก็บ secrets ในโค้ด** — ใช้ environment variables\n2. **ใช้ HTTPS** สำหรับ API calls ทั้งหมด\n3. **เข้ารหัสข้อมูลสำคัญ** ด้วย react-native-keychain\n4. **Certificate pinning** สำหรับ API connections\n5. **Obfuscate โค้ด** ด้วย ProGuard/R8\n6. **ปิด debugging** ใน production builds`,
        codeExamples: [{
          title: 'Secure Storage',
          language: 'typescript',
          code: `import * as Keychain from 'react-native-keychain';\n\n// Store credentials\nawait Keychain.setGenericPassword('username', 'password', {\n  service: 'myapp',\n  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,\n});\n\n// Retrieve credentials\nconst credentials = await Keychain.getGenericPassword({ service: 'myapp' });\nif (credentials) {\n  console.log(credentials.username, credentials.password);\n}`
        }]
      },
      {
        id: 'e09-monorepo',
        titleEn: 'Monorepo & Multi-platform Setup',
        titleTh: 'Monorepo และ Multi-platform Setup',
        descriptionEn: 'Share code across platforms with monorepo',
        descriptionTh: 'แชร์โค้ดข้ามแพลตฟอร์มด้วย monorepo',
        sdkVersion: '0.76', lastUpdated: '2026-02-15',
        contentEn: `# Monorepo Setup\n\nShare code between React Native, web, and backend.\n\n## Tools\n- **Turborepo**: Fast monorepo build system\n- **npm workspaces**: Built-in package management\n- **Expo**: Universal app support`,
        contentTh: `# Monorepo Setup\n\nแชร์โค้ดระหว่าง React Native, web และ backend\n\n## เครื่องมือ\n- **Turborepo**: ระบบ build monorepo ที่เร็ว\n- **npm workspaces**: จัดการ package ในตัว\n- **Expo**: รองรับ universal app`,
        codeExamples: [{
          title: 'Monorepo Structure',
          language: 'bash',
          code: `# Project structure\nmy-monorepo/\n├── apps/\n│   ├── mobile/          # React Native app\n│   ├── web/             # Next.js web app\n│   └── api/             # Backend API\n├── packages/\n│   ├── shared/          # Shared utilities\n│   ├── ui/              # Shared UI components\n│   └── config/          # Shared configs\n├── package.json         # Workspace root\n└── turbo.json           # Turborepo config`
        }]
      },
      {
        id: 'e10-deploy',
        titleEn: 'Production Deployment Checklist',
        titleTh: 'Checklist การ Deploy สู่ Production',
        descriptionEn: 'Complete checklist for production release',
        descriptionTh: 'Checklist ครบถ้วนสำหรับ release สู่ production',
        sdkVersion: '0.76', lastUpdated: '2026-02-15',
        contentEn: `# Production Deployment Checklist\n\n## Pre-Release\n- [ ] All tests passing\n- [ ] No console.log statements\n- [ ] Error tracking configured (Sentry/Crashlytics)\n- [ ] Analytics integrated\n- [ ] Performance profiled\n- [ ] Security audit completed\n\n## Build\n- [ ] Version and build number updated\n- [ ] Release signing configured\n- [ ] ProGuard/R8 enabled (Android)\n- [ ] Bitcode enabled (iOS)\n\n## Submission\n- [ ] App Store screenshots prepared\n- [ ] Privacy policy URL\n- [ ] App description and keywords\n- [ ] Beta testing completed`,
        contentTh: `# Checklist การ Deploy สู่ Production\n\n## ก่อน Release\n- [ ] Tests ผ่านทั้งหมด\n- [ ] ไม่มี console.log\n- [ ] ตั้งค่า error tracking (Sentry/Crashlytics)\n- [ ] ติดตั้ง analytics\n- [ ] ทำ performance profiling\n- [ ] ตรวจสอบความปลอดภัยเรียบร้อย\n\n## Build\n- [ ] อัพเดต version และ build number\n- [ ] ตั้งค่า release signing\n- [ ] เปิด ProGuard/R8 (Android)\n\n## Submission\n- [ ] เตรียม screenshots สำหรับ App Store\n- [ ] มี URL นโยบายความเป็นส่วนตัว\n- [ ] คำอธิบายแอปและ keywords`,
        codeExamples: [{
          title: 'Release Version Script',
          language: 'bash',
          code: `#!/bin/bash\n# bump-version.sh\nVERSION=$1\necho "Bumping to version $VERSION"\n\n# Update package.json\nnpm version $VERSION --no-git-tag-version\n\n# Update iOS\n/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $VERSION" ios/MyApp/Info.plist\n\n# Update Android\nsed -i '' "s/versionName .*/versionName \\"$VERSION\\"/" android/app/build.gradle\n\necho "Version bumped to $VERSION"`
        }]
      }
    ]
  }
];
