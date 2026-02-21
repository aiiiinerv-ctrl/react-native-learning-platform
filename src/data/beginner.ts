import { Module } from './types';

export const beginnerModules: Module[] = [
  {
    id: 'b-foundations',
    titleEn: 'Foundations',
    titleTh: 'พื้นฐาน',
    descriptionEn: 'Getting started with React Native development',
    descriptionTh: 'เริ่มต้นพัฒนาด้วย React Native',
    lessons: [
      {
        id: 'b01-intro',
        titleEn: 'Introduction to React Native & Expo',
        titleTh: 'แนะนำ React Native และ Expo',
        descriptionEn: 'Learn what React Native is and how Expo simplifies development',
        descriptionTh: 'เรียนรู้ว่า React Native คืออะไร และ Expo ช่วยให้พัฒนาง่ายขึ้นอย่างไร',
        sdkVersion: '0.76',
        lastUpdated: '2026-01-15',
        contentEn: `# Introduction to React Native & Expo

React Native is a framework by Meta that lets you build native mobile apps using JavaScript and React. With React Native, you write components in JSX that map to native platform views.

## What is React Native?
- **Cross-platform**: Write once, run on iOS and Android
- **Native performance**: Components compile to native views
- **Hot reloading**: See changes instantly during development
- **Large ecosystem**: Thousands of libraries available

## What is Expo?
Expo is a platform built on top of React Native that provides:
- **Expo CLI**: Quick project scaffolding
- **Expo Go**: Test on device without native builds
- **EAS (Expo Application Services)**: Cloud builds and submissions
- **Managed workflow**: No need to touch native code initially

## Getting Started
\`\`\`bash
# Install Expo CLI globally
npm install -g expo-cli

# Create a new project
npx create-expo-app@latest MyApp
cd MyApp

# Start development server
npx expo start
\`\`\`

## Project Structure (Expo)
\`\`\`
MyApp/
├── app/              # File-based routing (Expo Router)
│   ├── _layout.tsx   # Root layout
│   ├── index.tsx     # Home screen
│   └── about.tsx     # About screen
├── assets/           # Images, fonts, etc.
├── components/       # Reusable components
├── constants/        # App constants
├── package.json
├── tsconfig.json
└── app.json          # Expo configuration
\`\`\``,
        contentTh: `# แนะนำ React Native และ Expo

React Native เป็นเฟรมเวิร์กโดย Meta ที่ช่วยให้สร้างแอปมือถือแบบ native ด้วย JavaScript และ React โดยเขียน component ใน JSX ที่จะถูกแปลงเป็น native views

## React Native คืออะไร?
- **Cross-platform**: เขียนครั้งเดียว รันได้ทั้ง iOS และ Android
- **ประสิทธิภาพระดับ Native**: Component ถูก compile เป็น native views
- **Hot reloading**: เห็นการเปลี่ยนแปลงทันทีขณะพัฒนา
- **Ecosystem ขนาดใหญ่**: มีไลบรารีนับพันให้ใช้

## Expo คืออะไร?
Expo เป็นแพลตฟอร์มที่สร้างบน React Native ประกอบด้วย:
- **Expo CLI**: สร้างโปรเจ็กต์อย่างรวดเร็ว
- **Expo Go**: ทดสอบบนอุปกรณ์จริงโดยไม่ต้อง build native
- **EAS**: บริการ build และ submit บน cloud
- **Managed workflow**: ไม่ต้องแตะ native code ในตอนแรก

## เริ่มต้น
\`\`\`bash
npm install -g expo-cli
npx create-expo-app@latest MyApp
cd MyApp
npx expo start
\`\`\``,
        codeExamples: [
          {
            title: 'Basic App.tsx',
            language: 'tsx',
            code: `import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});`
          }
        ]
      },
      {
        id: 'b02-dev-env',
        titleEn: 'Development Environment Setup',
        titleTh: 'ตั้งค่าสภาพแวดล้อมการพัฒนา',
        descriptionEn: 'Set up your development environment for React Native',
        descriptionTh: 'ตั้งค่าสภาพแวดล้อมสำหรับพัฒนา React Native',
        sdkVersion: '0.76',
        lastUpdated: '2026-01-15',
        contentEn: `# Development Environment Setup

## Prerequisites
- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **Watchman** (macOS only)
- **VS Code** with extensions

## IDE Setup (VS Code)
Recommended extensions:
1. React Native Tools
2. ESLint
3. Prettier
4. TypeScript Importer
5. Color Highlight

## iOS Setup (macOS only)
\`\`\`bash
# Install Xcode from App Store
# Install CocoaPods
sudo gem install cocoapods

# Install iOS simulator
xcode-select --install
\`\`\`

## React Native CLI Installation Guide
For the most up-to-date and detailed instructions on how to install all dependencies for both iOS and Android (including Java, Android Studio, Watchman, etc.), please follow the official guide:
🔗 [**React Native Environment Setup Guide**](https://reactnative.dev/docs/environment-setup)

## Android Setup
\`\`\`bash
# Install Android Studio
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
\`\`\`

## Verify Setup
\`\`\`bash
npx react-native doctor
\`\`\``,
        contentTh: `# ตั้งค่าสภาพแวดล้อมการพัฒนา

## สิ่งที่ต้องมี
- **Node.js** (แนะนำเวอร์ชัน LTS)
- **npm** หรือ **yarn**
- **Watchman** (macOS เท่านั้น)
- **VS Code** พร้อม extensions

## ตั้งค่า IDE (VS Code)
Extensions ที่แนะนำ:
1. React Native Tools
2. ESLint
3. Prettier
4. TypeScript Importer
5. Color Highlight

## ตั้งค่า iOS (macOS เท่านั้น)
\`\`\`bash
sudo gem install cocoapods
xcode-select --install
\`\`\`

## คู่มือติดตั้ง React Native (Official Guide)
สำหรับวิธีติดตั้ง dependencies ทั้งหมดอย่างละเอียด (เช่น Java, Android Studio, Watchman) แนะนำให้อ้างอิงจากคู่มือหลักของ React Native เพราะมีการอัปเดตตลอดเวลาครับ:
🔗 [**React Native Environment Setup Guide**](https://reactnative.dev/docs/environment-setup)

## ตั้งค่า Android
\`\`\`bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
\`\`\``,
        codeExamples: [
          {
            title: '.env Setup',
            language: 'bash',
            code: `# .env file
API_URL=https://api.example.com
APP_ENV=development`
          }
        ]
      },
      {
        id: 'b03-project-structure',
        titleEn: 'Project Structure Overview',
        titleTh: 'ภาพรวมโครงสร้างโปรเจ็กต์',
        descriptionEn: 'Learn different project structure approaches',
        descriptionTh: 'เรียนรู้แนวทางโครงสร้างโปรเจ็กต์แบบต่างๆ',
        sdkVersion: '0.76',
        lastUpdated: '2026-01-20',
        contentEn: `# Project Structure Overview

## Feature-Based Structure (Recommended)
\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   ├── home/
│   └── profile/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── constants/
├── navigation/
├── services/
└── App.tsx
\`\`\`

## Layer-Based Structure
\`\`\`
src/
├── components/
├── screens/
├── services/
├── hooks/
├── utils/
├── types/
├── navigation/
└── App.tsx
\`\`\`

Choose based on project size — feature-based scales better for large apps.`,
        contentTh: `# ภาพรวมโครงสร้างโปรเจ็กต์

## โครงสร้างแบบ Feature-Based (แนะนำ)
จัดกลุ่มตาม feature/ฟีเจอร์ ทำให้หาไฟล์ง่ายเมื่อโปรเจ็กต์ใหญ่ขึ้น

## โครงสร้างแบบ Layer-Based
จัดกลุ่มตามประเภทไฟล์ เหมาะกับโปรเจ็กต์ขนาดเล็ก

เลือกตามขนาดโปรเจ็กต์ — Feature-based เหมาะกับแอปขนาดใหญ่มากกว่า`,
        codeExamples: [
          {
            title: 'Feature Index Export',
            language: 'typescript',
            code: `// features/auth/index.ts
export { LoginScreen } from './screens/LoginScreen';
export { useAuth } from './hooks/useAuth';
export { authService } from './services/authService';
export type { User, AuthState } from './types';`
          }
        ]
      }
    ]
  },
  {
    id: 'b-patterns',
    titleEn: 'Architecture Patterns',
    titleTh: 'รูปแบบสถาปัตยกรรม',
    descriptionEn: 'MVVM and MVC patterns in React Native',
    descriptionTh: 'รูปแบบ MVVM และ MVC ใน React Native',
    lessons: [
      {
        id: 'b04-mvvm',
        titleEn: 'MVVM Pattern in React Native',
        titleTh: 'รูปแบบ MVVM ใน React Native',
        descriptionEn: 'Implement Model-View-ViewModel pattern',
        descriptionTh: 'ใช้งานรูปแบบ Model-View-ViewModel',
        sdkVersion: '0.76',
        lastUpdated: '2026-01-20',
        contentEn: `# MVVM Pattern in React Native

## What is MVVM?
**Model-View-ViewModel** separates concerns into three layers:
- **Model**: Data and business logic
- **View**: UI components (React components)  
- **ViewModel**: Bridge between Model and View (custom hooks)

## Structure
\`\`\`
feature/
├── models/        # Data types and API calls
├── viewmodels/    # Custom hooks with business logic
├── views/         # React Native components
└── index.ts
\`\`\`

## Implementation
In React Native, MVVM maps naturally:
- **Model** → TypeScript interfaces + API service classes
- **ViewModel** → Custom hooks (useState, useEffect, useReducer)
- **View** → Functional components

This pattern creates testable, maintainable code with clear separation of concerns.`,
        contentTh: `# รูปแบบ MVVM ใน React Native

## MVVM คืออะไร?
**Model-View-ViewModel** แยก concern ออกเป็น 3 ชั้น:
- **Model**: ข้อมูลและ business logic
- **View**: UI components (React components)
- **ViewModel**: สะพานเชื่อม Model กับ View (custom hooks)

ใน React Native, MVVM แมปได้อย่างเป็นธรรมชาติ:
- **Model** → TypeScript interfaces + API service classes
- **ViewModel** → Custom hooks
- **View** → Functional components`,
        codeExamples: [
          {
            title: 'MVVM Example - Model',
            language: 'typescript',
            code: `// models/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// models/userService.ts
export const userService = {
  async fetchUser(id: string): Promise<User> {
    const res = await fetch(\`/api/users/\${id}\`);
    return res.json();
  }
};`
          },
          {
            title: 'MVVM Example - ViewModel',
            language: 'typescript',
            code: `// viewmodels/useUserViewModel.ts
import { useState, useEffect } from 'react';
import { User } from '../models/User';
import { userService } from '../models/userService';

export function useUserViewModel(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await userService.fetchUser(userId);
      setUser(data);
    } catch (err) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, refresh: loadUser };
}`
          },
          {
            title: 'MVVM Example - View',
            language: 'tsx',
            code: `// views/UserScreen.tsx
import { View, Text, ActivityIndicator } from 'react-native';
import { useUserViewModel } from '../viewmodels/useUserViewModel';

export function UserScreen({ userId }: { userId: string }) {
  const { user, loading, error } = useUserViewModel(userId);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  
  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}`
          }
        ]
      },
      {
        id: 'b05-mvc',
        titleEn: 'MVC Pattern in React Native',
        titleTh: 'รูปแบบ MVC ใน React Native',
        descriptionEn: 'Implement Model-View-Controller pattern',
        descriptionTh: 'ใช้งานรูปแบบ Model-View-Controller',
        sdkVersion: '0.76',
        lastUpdated: '2026-01-20',
        contentEn: `# MVC Pattern in React Native

## What is MVC?
**Model-View-Controller** is a classic pattern:
- **Model**: Data layer
- **View**: UI layer (components)
- **Controller**: Handles user actions, updates model

## MVVM vs MVC in React Native
| Aspect | MVC | MVVM |
|--------|-----|------|
| Data flow | Controller → Model → View | View ↔ ViewModel ↔ Model |
| Testing | Controller testing | Hook testing |
| React fit | Moderate | Natural |
| Complexity | Simpler | More structured |

MVVM is generally preferred in React Native because custom hooks naturally serve as ViewModels.`,
        contentTh: `# รูปแบบ MVC ใน React Native

## MVC คืออะไร?
**Model-View-Controller** เป็นรูปแบบคลาสสิก:
- **Model**: ชั้นข้อมูล
- **View**: ชั้น UI (components)
- **Controller**: จัดการ user actions อัพเดต model

MVVM เหมาะกับ React Native มากกว่าเพราะ custom hooks ทำหน้าที่เป็น ViewModel ได้อย่างเป็นธรรมชาติ`,
        codeExamples: [
          {
            title: 'MVC Controller',
            language: 'typescript',
            code: `// controllers/userController.ts
import { User } from '../models/User';

class UserController {
  private listeners: ((user: User) => void)[] = [];

  subscribe(fn: (user: User) => void) {
    this.listeners.push(fn);
  }

  async loadUser(id: string) {
    const res = await fetch(\`/api/users/\${id}\`);
    const user = await res.json();
    this.listeners.forEach(fn => fn(user));
  }
}

export const userController = new UserController();`
          }
        ]
      }
    ]
  },
  {
    id: 'b-core',
    titleEn: 'Core Concepts',
    titleTh: 'แนวคิดหลัก',
    descriptionEn: 'Core React Native components and styling',
    descriptionTh: 'Component หลักและ Styling ใน React Native',
    lessons: [
      {
        id: 'b06-components',
        titleEn: 'Core Components',
        titleTh: 'Component หลัก',
        descriptionEn: 'View, Text, Image, ScrollView and more',
        descriptionTh: 'View, Text, Image, ScrollView และอื่นๆ',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# Core Components

React Native provides a set of built-in components that map to native views.

## Essential Components
- **View** — Container component (like div)
- **Text** — Display text
- **Image** — Display images
- **ScrollView** — Scrollable container
- **TextInput** — Text input field
- **TouchableOpacity** — Pressable with opacity feedback
- **Pressable** — Modern pressable (recommended)`,
        contentTh: `# Component หลัก

React Native มี component ในตัวที่แมปกับ native views

## Component สำคัญ
- **View** — Container (เหมือน div)
- **Text** — แสดงข้อความ
- **Image** — แสดงรูปภาพ
- **ScrollView** — Container ที่เลื่อนได้
- **TextInput** — ช่องกรอกข้อความ
- **Pressable** — component ที่กดได้ (แนะนำ)`,
        codeExamples: [
          {
            title: 'Core Components Example',
            language: 'tsx',
            code: `import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export function ProfileCard() {
  return (
    <View style={styles.card}>
      <Image source={{ uri: 'https://example.com/avatar.jpg' }} style={styles.avatar} />
      <Text style={styles.name}>John Doe</Text>
      <Pressable style={styles.button} onPress={() => console.log('Pressed')}>
        <Text style={styles.buttonText}>Follow</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#1a1a2e' },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 18, color: '#fff', marginTop: 8 },
  button: { backgroundColor: '#6c63ff', padding: 12, borderRadius: 8, marginTop: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});`
          }
        ],
        deprecations: [
          {
            feature: 'TouchableOpacity',
            deprecatedInVersion: '0.76',
            severity: 'warning',
            oldCode: `import { TouchableOpacity } from 'react-native';\n<TouchableOpacity onPress={handlePress}>\n  <Text>Click me</Text>\n</TouchableOpacity>`,
            newCode: `import { Pressable } from 'react-native';\n<Pressable onPress={handlePress}>\n  <Text>Click me</Text>\n</Pressable>`,
            descriptionEn: 'TouchableOpacity is being replaced by Pressable which provides more control over press interactions.',
            descriptionTh: 'TouchableOpacity กำลังถูกแทนที่ด้วย Pressable ซึ่งควบคุม press interactions ได้มากกว่า'
          }
        ]
      },
      {
        id: 'b07-styling',
        titleEn: 'Styling & Flexbox',
        titleTh: 'Styling และ Flexbox',
        descriptionEn: 'Master styling and layout in React Native',
        descriptionTh: 'เชี่ยวชาญ styling และ layout ใน React Native',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# Styling & Flexbox

React Native uses a subset of CSS with Flexbox as the default layout system.

## Key Differences from Web CSS
- No CSS files — use StyleSheet.create()
- Properties are camelCase
- Flexbox is column-direction by default
- No inheritance (except Text)
- Units are density-independent pixels`,
        contentTh: `# Styling และ Flexbox

React Native ใช้ CSS บางส่วน โดย Flexbox เป็นระบบ layout หลัก

## ความแตกต่างจาก Web CSS
- ไม่มี CSS file — ใช้ StyleSheet.create()
- Property เป็น camelCase
- Flexbox เป็น column direction โดยค่าเริ่มต้น
- ไม่มี inheritance (ยกเว้น Text)`,
        codeExamples: [
          {
            title: 'Flexbox Layout',
            language: 'tsx',
            code: `const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#6c63ff',
    borderRadius: 8,
  },
});`
          }
        ]
      },
      {
        id: 'b08-navigation',
        titleEn: 'Basic Navigation Setup',
        titleTh: 'ตั้งค่า Navigation เบื้องต้น',
        descriptionEn: 'Set up React Navigation for multi-screen apps',
        descriptionTh: 'ตั้งค่า React Navigation สำหรับแอปหลายหน้า',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# Basic Navigation Setup

## React Navigation vs Expo Router
- **React Navigation**: Imperative, more control
- **Expo Router**: File-based, simpler (recommended for Expo)

## Install React Navigation
\`\`\`bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
\`\`\``,
        contentTh: `# ตั้งค่า Navigation เบื้องต้น

## React Navigation vs Expo Router
- **React Navigation**: Imperative ควบคุมได้มากกว่า
- **Expo Router**: File-based ง่ายกว่า (แนะนำสำหรับ Expo)`,
        codeExamples: [
          {
            title: 'Stack Navigator',
            language: 'tsx',
            code: `import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`
          }
        ]
      },
      {
        id: 'b09-input',
        titleEn: 'Handling User Input',
        titleTh: 'จัดการ User Input',
        descriptionEn: 'TextInput, forms, and keyboard handling',
        descriptionTh: 'TextInput, ฟอร์ม และการจัดการคีย์บอร์ด',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# Handling User Input

## TextInput Basics
TextInput is the core component for text input in React Native.

## Keyboard Handling
- KeyboardAvoidingView for iOS
- android:windowSoftInputMode for Android`,
        contentTh: `# จัดการ User Input

## พื้นฐาน TextInput
TextInput เป็น component หลักสำหรับรับข้อความ

## จัดการ Keyboard
- ใช้ KeyboardAvoidingView สำหรับ iOS
- android:windowSoftInputMode สำหรับ Android`,
        codeExamples: [
          {
            title: 'Controlled TextInput',
            language: 'tsx',
            code: `import { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.form}>
      <TextInput style={styles.input} placeholder="Email"
        value={email} onChangeText={setEmail}
        keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password"
        value={password} onChangeText={setPassword}
        secureTextEntry />
    </View>
  );
}`
          }
        ]
      },
      {
        id: 'b10-lists',
        titleEn: 'Lists & FlatList',
        titleTh: 'Lists และ FlatList',
        descriptionEn: 'Efficient list rendering with FlatList',
        descriptionTh: 'แสดง list อย่างมีประสิทธิภาพด้วย FlatList',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# Lists & FlatList

FlatList is the go-to component for rendering scrollable lists efficiently using virtualization.`,
        contentTh: `# Lists และ FlatList

FlatList เป็น component หลักสำหรับแสดง list แบบ scroll ได้อย่างมีประสิทธิภาพด้วย virtualization`,
        codeExamples: [
          {
            title: 'FlatList Example',
            language: 'tsx',
            code: `import { FlatList, Text, View } from 'react-native';

const data = Array.from({ length: 100 }, (_, i) => ({ id: String(i), title: \`Item \${i + 1}\` }));

export function ItemList() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#333' }}>
          <Text style={{ color: '#fff' }}>{item.title}</Text>
        </View>
      )}
    />
  );
}`
          }
        ]
      },
      {
        id: 'b11-state',
        titleEn: 'Basic State with useState & useReducer',
        titleTh: 'State เบื้องต้นด้วย useState และ useReducer',
        descriptionEn: 'Learn React state management fundamentals',
        descriptionTh: 'เรียนรู้พื้นฐานการจัดการ State ใน React',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# Basic State Management

## useState — Simple state
For simple values: strings, numbers, booleans, simple objects.

## useReducer — Complex state
For complex state logic with multiple sub-values or when next state depends on previous.`,
        contentTh: `# การจัดการ State เบื้องต้น

## useState — State อย่างง่าย
สำหรับค่าง่ายๆ: string, number, boolean, object อย่างง่าย

## useReducer — State ที่ซับซ้อน
สำหรับ state logic ที่ซับซ้อน มีหลาย sub-values`,
        codeExamples: [
          {
            title: 'useReducer Example',
            language: 'tsx',
            code: `import { useReducer } from 'react';

type State = { count: number; step: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'setStep'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'setStep': return { ...state, step: action.payload };
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  // Use dispatch({ type: 'increment' }) etc.
}`
          }
        ]
      },
      {
        id: 'b12-debugging',
        titleEn: 'Debugging Tools & Tips',
        titleTh: 'เครื่องมือ Debug และเคล็ดลับ',
        descriptionEn: 'Essential debugging tools for React Native',
        descriptionTh: 'เครื่องมือ debug ที่จำเป็นสำหรับ React Native',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# Debugging Tools & Tips

## Tools
- **React DevTools**: Component tree inspection
- **Flipper**: Network, layout, database inspection  
- **Chrome DevTools**: JavaScript debugging
- **React Native Debugger**: All-in-one tool
- **LogBox**: Built-in error/warning display`,
        contentTh: `# เครื่องมือ Debug และเคล็ดลับ

## เครื่องมือ
- **React DevTools**: ตรวจสอบ component tree
- **Flipper**: ตรวจสอบ network, layout, database
- **Chrome DevTools**: debug JavaScript
- **React Native Debugger**: เครื่องมือรวม
- **LogBox**: แสดง error/warning ในตัว`,
        codeExamples: [
          {
            title: 'LogBox Configuration',
            language: 'tsx',
            code: `import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all logs (don't do this in production!)
// LogBox.ignoreAllLogs();`
          }
        ]
      }
    ]
  }
];
