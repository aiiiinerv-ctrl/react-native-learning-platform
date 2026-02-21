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

## What is React Native?
Imagine building a house. Instead of learning two completely different ways to build a house for Android and iOS, React Native lets you use **JavaScript and React** to build both at the same time!
React Native takes your JavaScript code and translates it into real, native mobile elements (like a real iOS Button or an Android Text field).

- **Cross-platform**: Write once, run everywhere (iOS and Android).
- **Native performance**: It doesn't just look like an app; it *is* a real app.
- **Hot reloading**: When you hit save, the app updates instantly on your screen—no waiting!

## What is Expo?
If React Native is the engine of a car, **Expo** is the entire factory that helps you build, test, and ship the car faster. It provides tools so you don't have to touch complex native code (like Java or Swift) right away.
- **Expo Go**: An app on your phone that lets you test your code instantly by scanning a QR code.
- **Expo Router**: Makes navigating between screens as easy as organizing folders on your computer.

## Getting Started
\`\`\`bash
# Create a new project (the easiest way!)
npx create-expo-app@latest MyApp
cd MyApp

# Start the development server
npx expo start
\`\`\`

## Popular Libraries You Will Learn
Unlike traditional courses that only teach the difficult "built-in" tools, we will teach you what real companies use:
1. **NativeWind**: Styling your app easily (like Tailwind CSS).
2. **React Hook Form**: Making forms simple without messy state variables.
3. **Zustand**: Remembering data across the app easily.
4. **React Query**: Fetching data from the internet the smart way.`,
        contentTh: `# แนะนำ React Native และ Expo

## React Native คืออะไร?
ลองนึกภาพการสร้างบ้าน แทนที่จะต้องเรียนรู้วิธีสร้างบ้านแยกกันระหว่าง Android (ใช้ Java/Kotlin) และ iOS (ใช้ Swift) React Native ช่วยให้เราใช้ **JavaScript และ React** ในการสร้างแอปทั้งสองระบบได้พร้อมกัน!

React Native จะทำหน้าที่แปล (Translate) โค้ด JavaScript ของเราให้กลายเป็นหน้าตาแอปของแท้ๆ ของทั้ง iOS และ Android

- **Cross-platform**: เขียนครั้งเดียว สั่งรันได้ทุกระบบ
- **ประสิทธิภาพระดับ Native**: ไม่ใช่แค่แอปจำลอง แต่เป็นแอปของจริง
- **Hot reloading**: พอเรากด Save โค้ด หน้าตาแอปในมือถือจะเปลี่ยนตามทันที ไม่ต้องรอนาน!

## Expo คืออะไร?
ถ้า React Native คือเครื่องยนต์ของรถ **Expo** ก็คือโรงงานประกอบรถยนต์ ที่มีเครื่องมือช่วยให้เราสร้าง, ทดสอบ, และปล่อยแอปได้ไวขึ้น โดยที่เราไม่ต้องไปแตะโค้ดภาษา Native ยากๆ เลยในตอนเริ่มต้น
- **Expo Go**: แอปบนมือถือที่ให้เราสแกน QR Code แล้วเห็นแอปที่เรากำลังเขียนได้ทันที
- **Expo Router**: ช่วยให้การเปลี่ยนหน้าไปมา (Navigation) ง่ายเหมือนแค่การจัดโฟลเดอร์ในคอมพิวเตอร์

## เครื่องมือยอดนิยม (Libraries) ที่เราจะเน้นสอน
ในหลักสูตรนี้ เราจะไม่สอนแค่ของพื้นฐานที่เขียนยากๆ แต่เราจะสอนเครื่องมือที่ **บริษัทจริงๆ เค้าใช้กัน** เพื่อให้ชีวิตง่ายขึ้น:
1. **NativeWind**: ตกแต่งความสวยงามให้แอปอย่างง่ายดาย (คล้าย Tailwind CSS)
2. **React Hook Form**: จัดการแบบฟอร์ม (Form) ให้ง่าย ไม่ต้องเขียนโค้ดเยอะ
3. **Zustand**: ระบบความจำของแอป (State Management) ที่เข้าใจง่ายสุดๆ
4. **React Query**: ดึงข้อมูลจากอินเทอร์เน็ตแบบมืออาชีพ`,
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

## Project Installation & Setup
Once your environment is ready, follow these steps to set up the project:

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-repo/project-name.git
cd project-name
\`\`\`

### 2. Install Dependencies
Make sure you are in the project root directory, then run:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Variables (.env) Setup
Most projects use a \`.env\` file for API keys and configuration.
1. Copy the example environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
2. Open the newly created \`.env\` file and fill in your specific variables (e.g., \`API_URL\`, \`FIREBASE_API_KEY\`).

### 4. iOS Pod Installation (macOS only)
If you are developing for iOS, you must install the CocoaPods dependencies:
\`\`\`bash
cd ios
pod install
cd ..
\`\`\`

## Run the Application
\`\`\`bash
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
\`\`\`

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

## ขั้นตอนการติดตั้งโปรเจ็กต์ (Project Setup)
เมื่อเตรียมสภาพแวดล้อมพร้อมแล้ว ให้ทำตามขั้นตอนต่อไปนี้เพื่อเปิดโปรเจ็กต์:

### 1. Clone โปรเจ็กต์
\`\`\`bash
git clone https://github.com/your-repo/project-name.git
cd project-name
\`\`\`

### 2. ติดตั้ง Dependencies
ตรวจสอบว่าอยู่ในโฟลเดอร์หลักของโปรเจ็กต์ แล้วรันคำสั่ง:
\`\`\`bash
npm install
# หรือ
yarn install
\`\`\`

### 3. การตั้งค่า Environment Variables (.env)
โปรเจ็กต์ส่วนใหญ่มักจะใช้ไฟล์ \`.env\` เพื่อเก็บค่า config หรือ API Keys
1. คัดลอกไฟล์ตัวอย่าง:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
2. เปิดไฟล์ \`.env\` ที่เพิ่งสร้างขึ้นมา และกรอกข้อมูลที่จำเป็นลงไป (เช่น \`API_URL\`, \`FIREBASE_API_KEY\`)

### 4. ติดตั้ง iOS Pods (เฉพาะ macOS)
หากคุณต้องการรันบน iOS จะต้องติดตั้ง CocoaPods dependencies ด้วย:
\`\`\`bash
cd ios
pod install
cd ..
\`\`\`

## ทดสอบรันแอปพลิเคชัน
\`\`\`bash
# สำหรับ iOS
npx react-native run-ios

# สำหรับ Android
npx react-native run-android
\`\`\`

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
        contentEn: `# MVVM Architecture Pattern
*(Wait, don't let the big words scare you!)*

In programming, we need a way to organize our messy code. If we put everything in one file, it becomes a nightmare to read.

## What is MVVM?
Think of a Restaurant:
1. **Model (The Kitchen/Ingredients)**: This is your data. Where does the data come from? (e.g., fetching a User profile from the internet).
2. **View (The Dining Area)**: What the user sees. Buttons, Text, Images. In React Native, this is your \`return ( <View>... </View> )\`.
3. **ViewModel (The Waiter)**: The bridge! The waiter takes your order (button click) from the View, goes to the Kitchen (Model), grabs the food (Data), and brings it back to your table (View).

## How we do this in React Native
React Native handles MVVM perfectly using **Custom Hooks**.

- **Model**: Regular TypeScript functions that fetch data (e.g., \`fetchUser()\`)
- **ViewModel**: A custom Hook (e.g., \`useUser()\`) that calls the API and holds the loading state.
- **View**: Your clean React Component that just displays whatever the Hook gives it!

By using this, your View (UI) is purely focused on looking pretty, and your ViewModel handles all the complex logic.`,
        contentTh: `# รูปแบบสถาปัตยกรรม MVVM
*(เดี๋ยวก่อน! อย่าเพิ่งกลัวชื่อแปลกๆ นี้เลยครับ)*

ในการเขียนโปรแกรม เราต้องมีวิธีจัดระเบียบโค้ดที่รกรุงรัง ถ้าเรายัดทุกอย่างไว้ในไฟล์เดียว เวลาจะกลับมาแก้บอกเลยว่านรกแตก!

## MVVM คืออะไร?
ให้ลองจินตนาการถึง **ร้านอาหาร**:
1. **Model (ห้องครัว/วัตถุดิบ)**: นี่คือ "ข้อมูล" ของเรา ข้อมูลนี้มาจากไหน? (เช่น ดึงข้อมูลโปรไฟล์ผู้ใช้มาจากอินเทอร์เน็ต)
2. **View (โซนสำหรับลูกค้านั่งกิน)**: คือสิ่งที่ผู้ใช้งานมองเห็นบนหน้าจอ ปุ่ม, ข้อความ, รูปภาพ ในรหัส React หน้าตาก็คือส่วนที่เป็น \`return ( <View>... </View> )\`
3. **ViewModel (พนักงานเสิร์ฟ)**: เป็นสะพานเชื่อม! พนักงานจะรับออเดอร์ (เมื่อผู้ใช้กดปุ่ม) จากโต๊ะ (View) เดินไปสั่งอาหารที่ครัว (Model) รอรับอาหาร (ข้อมูล) และเดินนำมาเสิร์ฟที่โต๊ะให้ลูกค้า (View)

## การใช้ MVVM ใน React Native
React Native เหมาะกับ MVVM มากๆ โดยเราจะใช้ฟีเจอร์ที่เรียกว่า **Custom Hooks**

- **Model**: ฟังก์ชันปกติที่ไปดึงข้อมูลมา (เช่น \`fetchUser()\`)
- **ViewModel**: Custom Hook ของเรา (เช่น \`useUser()\`) ที่ทำหน้าที่ดึงข้อมูล และจำสถานะกำลังโหลดเอาไว้
- **View**: Component ที่สะอาดตา มีหน้าที่แค่เอาข้อมูลจากพนักงานเสิร์ฟมาแสดงผลให้สวยงาม!

วิธีนี้ทำให้โค้ดที่ดูแลหน้าตาแอป (UI) สะอาดมาก เพราะไม่ต้องมาเขียนลอจิกซับซ้อนปนลงไปครับ`,
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
        contentEn: `# Modern Architecture: Just Hooks!

## Forget old MVC
If you see tutorials talking about Controllers and MVC (Model-View-Controller) in React Native, **they might be outdated**.

## The React Way (Component + Hooks)
Modern React Native focuses on simplicity:
1. **UI Components**: Dumb, visual-only components.
2. **Custom Hooks**: Smart logic handlers (our "ViewModels").
3. **Global State**: For things the whole app needs to know (like "Is the user logged in?"). We use simple tools like \`Zustand\`.

Instead of strict OOP (Object-Oriented) classes, we use **Functional Programming**. It's much less code to read and easier to test!`,
        contentTh: `# สถาปัตยกรรมยุคใหม่: เน้นแค่ Hooks!

## ลืม MVC แบบเก่าไปได้เลย
หากคุณไปเจอคอร์สหรือบทความที่สอนเรื่อง Controller และ MVC (Model-View-Controller) ใน React Native บอกเลยว่า **มันอาจจะเก่าไปแล้วสำหรับยุคนี้**

## วิถีแห่ง React (Component + Hooks)
React Native ยุคใหม่เน้นความเรียบง่าย:
1. **UI Components**: Component โง่ๆ ที่มีหน้าที่แค่โชว์หน้าตาให้สวยอย่างเดียว
2. **Custom Hooks**: ตัวจัดการลอจิกฉลาดๆ (คล้ายๆ ViewModel)
3. **Global State**: สำหรับอะไรที่ทั้งแอปจำเป็นต้องรู้ (เช่น "ผู้ใช้คนนี้ Login หรือยัง?") เราจะใช้เครื่องมือที่เบาและง่ายมากๆ อย่าง \`Zustand\`

แทนที่จะเขียน Class ตามแบบ OOP ที่ซับซ้อน เราเปลี่ยนมาใช้ท่ายอดฮิตอย่าง **Functional Programming** แทน ซึ่งโค้ดสั้นกว่า อ่านง่ายกว่า และทดสอบง่ายกว่าเยอะ!`,
        codeExamples: [
          {
            title: 'Modern Pattern (Zustand + Hooks)',
            language: 'tsx',
            code: `// 1. Global State (Zustand) - Easy memory!
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

// 2. View Component
export function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  
  if (!user) return <Text>Please log in!</Text>;
  return <Text>Welcome, {user.name}!</Text>;
}`
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
- **View** — Container component (like a \`<div>\` in HTML).
- **Text** — Used to display text.
- **Image** — Used to display images.
- **ScrollView** — A container that allows scrolling when content overflows.
- **TextInput** — A box where users can type.
- **Pressable** — Any element you want the user to be able to tap/press.

## The Safe Area Problem (Notches and Home Indicators)
Modern phones have notches, dynamic islands, and home indicators. If you just use a regular \`<View>\`, your app's header might get hidden behind the iPhone notch! 
**Solution:** Always use \`SafeAreaView\` from the library \`react-native-safe-area-context\` for your main screens.`,
        contentTh: `# Component หลัก

React Native มี component พื้นฐานที่เปรียบเสมือนตัวต่อเลโก้ หน้าที่ของเราคือเอามาประกอบกันให้เป็นหน้าจอแอป

## Component สำคัญที่ใช้บ่อยสุดๆ
- **View** — กล่องเปล่าๆ ที่เอาไว้จัด layout (เหมือน \`<div>\` ในการทำเว็บ)
- **Text** — เอาไว้แสดงข้อความ
- **Image** — เอาไว้แสดงรูปภาพ
- **ScrollView** — กล่องที่สามารถเอานิ้วไถเลื่อนขึ้นลงได้
- **TextInput** — ช่องกรอกข้อความ
- **Pressable** — พื้นที่อะไรก็ตามที่เราอยากให้ผู้ใช้แตะหรือกดได้

## ปัญหาเรื่อง "รอยบาก" (Notch)
มือถือสมัยใหม่มีรอยบาก (Notch) หรือหน้าจอแหว่ง ถ้าเราใช้แค่ \`<View>\` ธรรมดา เนื้อหาของเราอาจจะทะลุไปซ่อนอยู่ใต้รอยบากได้!
**คำแนะนำ:** เราควรใช้ \`SafeAreaView\` จากไลบรารี \`react-native-safe-area-context\` เสมอ เพื่อให้เนื้อหาของเราอยู่ในจุดที่ปลอดภัย อ่านได้ชัดเจน`,
        codeExamples: [
          {
            title: 'Core Components + SafeArea',
            language: 'tsx',
            code: `import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProfileCard() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <View style={styles.card}>
        <Image source={{ uri: 'https://example.com/avatar.jpg' }} style={styles.avatar} />
        <Text style={styles.name}>John Doe</Text>
        <Pressable style={styles.button} onPress={() => console.log('Pressed')}>
          <Text style={styles.buttonText}>Follow</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#2a2a4e', margin: 16 },
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
        id: 'b06b-custom-components',
        titleEn: 'Component Extraction (export function)',
        titleTh: 'การแยก Component (export function)',
        descriptionEn: 'How and when to extract UI into reusable functions',
        descriptionTh: 'วิธีและจังหวะเวลาในการแยก UI เป็น Component ย่อย',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-22',
        contentEn: `# Custom Components & Export Function

## What is \`export function\`?
In React Native, any UI piece can be a function that returns JSX. We use \`export function MyComponent()\` so we can import and reuse it in other files.

## When should you extract a new component?
1. **Reusability**: If you use the exact same Button or Card in more than 2 places.
2. **Readability (Clean Code)**: If your screen file goes over 150-200 lines, it's time to break it down. Reading a massive file is exactly like reading a book with no paragraphs.
3. **Performance**: Isolating complex logic into a small component prevents the entire huge screen from re-rendering.

## How to extract?
1. Create a new file (e.g., \`components/CustomButton.tsx\`).
2. Write \`export function CustomButton({ title }) { ... }\`.
3. \`import { CustomButton }\` in your main screen.`,
        contentTh: `# การแยก Component (export function)

## \`export function\` คืออะไร?
ใน React Native หน้าตาแอป (UI) ทุกส่วนคือฟังก์ชันที่คืนค่าเป็นแท็ก JSX การที่เราใช้ \`export function ชื่อคอมโพเนนต์()\` ก็เพื่อให้ไฟล์อื่นสามารถดึง (import) ชิ้นส่วนนี้ไปประกอบร่างใช้งานต่อได้ครับ

## แนวทาง: เมื่อไหร่ที่ควรแยก Component ใหม่?
1. **เมื่อมีการใช้ซ้ำ (Reusability)**: ถ้าคุณต้องสร้างปุ่มหน้าตาเดิมๆ หรือการ์ดแบบเดิมๆ เกิน 2 ที่ขึ้นไป ควรแยกออกมาเลยครับ
2. **เมื่อโค้ดเริ่มยาวเกินไป (Readability)**: ถ้าไฟล์หน้าจอ (Screen) โค้ดยาวทะลุ 150-200 บรรทัด นั่นคือสัญญาณไฟแดง! การอ่านไฟล์ยาวๆ ก็เหมือนอ่านหนังสือที่ไม่มีการเว้นย่อหน้าครับ ควรแตกชิ้นส่วนย่อยๆ เช่น \`Header\`, \`UserProfile\`, \`Footer\` ออกมา
3. **เรื่องประสิทธิภาพ (Performance)**: ถ้ามีจุดขยับยุ๊กยิ๊กหรือโหลดข้อมูลหนักๆ กองรวมกัน การแยก Component จะช่วยให้แอปอัพเดตเฉพาะจุดที่เปลี่ยน ไม่ต้องวาดใหม่ทั้งหน้าจอครับ

## วิธีการดึงออกไปสร้างใหม่
1. สร้างไฟล์ใหม่ในโฟลเดอร์ \`components/\` เช่น \`CustomButton.tsx\`
2. สร้างฟังก์ชัน \`export function CustomButton({ title }) { ... }\`
3. ไปที่หน้าจอหลัก แล้ว \`import { CustomButton }\` มาวางประกอบได้เลยครับ`,
        codeExamples: [
          {
            title: 'Component Extraction Example',
            language: 'tsx',
            code: `// 📁 components/ActionCard.tsx
import { View, Text, Pressable } from 'react-native';

// 1. We EXPORT the function so others can use it
// 2. We use PROPS to make it dynamic
export function ActionCard({ title, onPress }) {
  return (
    <Pressable onPress={onPress} className="p-4 bg-white rounded-lg shadow-sm mb-4">
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
    </Pressable>
  );
}

// -------------------------------------------------- \\\\

// 📁 screens/HomeScreen.tsx
import { View } from 'react-native';
import { ActionCard } from '../components/ActionCard';

export function HomeScreen() {
  return (
    <View className="flex-1 p-6 bg-gray-50">
      {/* 3. Reusing the component makes the screen very clean! */}
      <ActionCard title="Edit Profile" onPress={() => console.log('Edit')} />
      <ActionCard title="Settings" onPress={() => console.log('Settings')} />
      <ActionCard title="Logout" onPress={() => console.log('Logout')} />
    </View>
  );
}`
          }
        ]
      },
      {
        id: 'b06c-props',
        titleEn: 'Understanding Props',
        titleTh: 'ทำความเข้าใจ Props',
        descriptionEn: 'How to pass data into components using Props',
        descriptionTh: 'วิธีการส่งต่อข้อมูลข้าม Component ด้วย Props',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-22',
        contentEn: `# Props (Properties)

## What are Props?
Imagine a Component is a machine. **Props** are the buttons and dials you turn to change how the machine works. In React Native, Props are simply data passed from a Parent component down to a Child component.

## Why do we need Props?
Without Props, every Component would look exactly the same. Props make components **Dynamic** and **Reusable**. 
For example, instead of making three different Button components for "Login", "Logout", and "Confirm", you just make one \`Button\` component and pass the name via a Prop!

## Syntax Rules
- Props are passed like HTML attributes: \`<MyButton title="Click Me!" />\`
- Props are received as an object in the function arguments: \`export function MyButton(props) { ... }\`
- Usually, we destructure them instantly for cleaner code: \`export function MyButton({ title }) { ... }\``,
        contentTh: `# Props (Properties)

## Props คืออะไร?
ลองนึกภาพว่า Component คือตู้กดน้ำ หรือเครื่องจักร **Props ก็คือปุ่มกด** ที่เราเอาไว้สั่งงานว่าอยากให้ตู้กดน้ำนั้นทำงานแบบไหน ในโลกของ React นั้น Props คือข้อมูลที่ถูกส่งจาก Component แม่ (Parent) ลงไปให้ Component ลูก (Child) 

## ทำไมเราถึงต้องใช้ Props?
ถ้าไม่มี Props Component ทุกตัวที่เราสร้างหน้าตาจะเหมือนกันเป๊ะ 100% เลยครับ Props เป็นตัวช่วยให้ Component ของเรายืดหยุ่นและนำไปใช้งานซ้ำได้ (Reusable)
เช่น แทนที่เราจะสร้างปุ่ม 3 ปุ่มแยกกันสำหรับ "เข้าสู่ระบบ", "ออกจากระบบ", และ "ยืนยัน" เราแค่สร้างปุ่ม \`CustomButton\` หน้าตามาตรฐานมาอันเดียว แล้วค่อยส่งข้อความเข้าไปทำงานผ่านตัวแปร Prop แทนครับ!

## กฎการเขียน
- ตอนส่งข้อมูล เราจะส่งไปคล้ายๆ รหัส HTML เช่น \`<CustomButton title="คลิกฉัน!" />\`
- ฝั่งลูกเวลาจะรับข้อมูล จะรับมาเป็น Object ในวงเล็บ เช่น \`export function CustomButton(props) { ... }\`
- แต่นักพัฒนาส่วนใหญ่นิยมใช้วิธีแกะกล่อง (Destructure) ออกมาเลย เพื่อให้โค้ดสั้นและจัดการง่าย เช่น \`export function CustomButton({ title }) { ... }\``,
        codeExamples: [
          {
            title: 'Multiple Props Example',
            language: 'tsx',
            code: `import { View, Text, Pressable } from 'react-native';

// 1. We define what Props this component expects (TypeScript makes this safe!)
type UserProfileProps = {
  name: string;
  age: number;
  isActive: boolean;
};

// 2. We receive the props and map them to the UI
export function UserProfile({ name, age, isActive }: UserProfileProps) {
  return (
    <View className="mb-4 p-4 border border-slate-200 rounded-lg">
      <Text className="text-xl font-bold">{name}</Text>
      <Text className="text-slate-600">Age: {age}</Text>
      
      {/* 3. Conditional rendering based on a boolean Prop! */}
      {isActive ? (
        <Text className="text-green-500 font-bold mt-2">● Online</Text>
      ) : (
        <Text className="text-red-500 font-bold mt-2">○ Offline</Text>
      )}
    </View>
  );
}

// -------------------------------------------------- \\\\

export function HomeScreen() {
  return (
    <View className="flex-1 p-6">
      {/* 4. We pass completely different data to the exact same component! */}
      <UserProfile name="John Doe" age={25} isActive={true} />
      <UserProfile name="Jane Smith" age={30} isActive={false} />
    </View>
  );
}`
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

## The Built-in Way (StyleSheet)
\- No CSS files — you use \`StyleSheet.create()\` inside your JS file.
\- Properties are \`camelCase\` (e.g., \`backgroundColor\` instead of \`background-color\`).
\- Flexbox direction is \`column\` by default (unlike web which is \`row\`).

## The Modern Way (NativeWind) 🔥
Writing \`StyleSheet\` for every component can be slow. Real-world apps often use **NativeWind**, which lets you use **Tailwind CSS** classes directly in React Native!

Instead of writing 10 lines of StyleSheet, you just write:
\`\`\`tsx
<Text className="text-xl font-bold text-blue-500">Hello!</Text>
\`\`\`
It's much faster, cleaner, and uses the exact same class names as web development.`,
        contentTh: `# Styling และ Flexbox

React Native ใช้ CSS ในรูปแบบของตัวเอง โดยใช้ระบบ Flexbox ในการจัดหน้าจอ

## วิธีดั้งเดิม (StyleSheet)
\- ไม่มีไฟล์ .css — เราจะเขียนสไตล์ลงในไฟล์ JS/TS เลยโดยใช้ \`StyleSheet.create()\`
\- ชื่อ Property จะเป็นแบบ \`camelCase\` (เช่น \`backgroundColor\` แทนที่จะเป็น \`background-color\`)
\- ทิศทางของ Flexbox ค่าเริ่มต้นจะเป็นคอลัมน์แนวตั้ง (\`column\`) ไม่ใช่แนวนอน (\`row\`) เหมือนบนเว็บ

## วิถีสมัยใหม่ (NativeWind) 🔥
การเขียน \`StyleSheet\` ทีละอันอาจจะทำให้ช้า แอปจริงๆ หลายที่เลยนิยมใช้ **NativeWind** ซึ่งทำให้เราเขียน **Tailwind CSS** ใน React Native ได้เลย!

แทนที่จะต้องมานั่งเขียนสไตล์ยาวเหยียด เราแค่พิมพ์แบบนี้:
\`\`\`tsx
<Text className="text-xl font-bold text-blue-500">สวัสดีครับ!</Text>
\`\`\`
ทั้งเร็วกว่า โค้ดสั้นกว่า และใช้ชื่อคลาสเหมือนกับการทำเว็บเป๊ะๆ`,
        codeExamples: [
          {
            title: 'NativeWind vs StyleSheet',
            language: 'tsx',
            code: `// ❌ The Old Way (StyleSheet)
import { View, Text, StyleSheet } from 'react-native';

export function OldCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Hello</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: 'white', borderRadius: 8 },
  title: { fontSize: 20, fontWeight: 'bold' }
});

// ✅ The Modern Way (NativeWind)
export function TailwindCard() {
  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-xl font-bold">Hello</Text>
    </View>
  );
}`
          }
        ]
      },
      {
        id: 'b07b-nativewind',
        titleEn: 'NativeWind vs Tailwind CSS',
        titleTh: 'เจาะลึก NativeWind vs Tailwind CSS',
        descriptionEn: 'Pros, cons, and appropriate usage of NativeWind',
        descriptionTh: 'ข้อดี ข้อเสีย และการเลือกใช้ NativeWind',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-22',
        contentEn: `# NativeWind vs Tailwind CSS

## What's the difference?
**Tailwind CSS** is strictly made for the Web (HTML/CSS). You cannot use it directly on native iOS/Android views.
**NativeWind** is the magic bridge. It lets you write Tailwind classes, and under the hood, it converts them into React Native \`StyleSheet\` code!

## Pros of NativeWind
- **Zero Context Switching**: If your team builds websites with Tailwind, they can instantly build Mobile apps without learning a new styling system.
- **Speed**: Type \`flex-1 items-center justify-center\` instead of writing a clunky StyleSheet object at the bottom of the file.
- **Universal Apps**: Perfect if you use Expo Router to build true Cross-Platform apps (iOS, Android, AND Web simultaneously).

## Cons of NativeWind
- **Not 100% Web CSS**: Mobile UI engines aren't browsers. Complex web classes like complex \`grid\`, \`:hover\` on mobile, or advanced CSS interactions might behave weirdly.
- **Setup Overhead**: Requires configuring Babel and Metro, which can sometimes break during package upgrades.

## Recommendation
If your goal is to build fast, or if you already know Tailwind from Next.js/React web, **use NativeWind**. It is the modern standard endorsed by Expo to accelerate development.`,
        contentTh: `# NativeWind vs Tailwind CSS

## มันต่างกันยังไง?
**Tailwind CSS (ต้นตำรับ)** ถูกออกแบบมาสำหรับทำเว็บ (HTML/CSS) เราไม่สามารถเอามันมายัดใส่ \`<View>\` ของมือถือตรงๆ ได้ เพราะเอนจินมือถือไม่รู้จัก CSS ฝั่งเว็บ
**NativeWind** คือ "สะพานเชื่อมเวทมนตร์" ครับ มันยอมให้เราพิมพ์คลาสแบบ Tailwind ลงไปได้เลย แล้วหลังบ้านมันจะแอบแปลงคลาสพวกนั้นให้กลายเป็น \`StyleSheet\` ของ React Native โดยอัตโนมัติ

## ข้อดีของ NativeWind (Pros)
- **เรียนรอบเดียว ใช้ได้ยันมือถือ**: ถ้าคุณทำเว็บด้วย Tailwind เป็นอยู่แล้ว คุณสามารถมาทำแอปมือถือได้เลยโดยแทบไม่ต้องเรียนรู้วิธีแต่ง UI ใหม่
- **โค้ดสั้นและเร็ว**: การพิมพ์ \`className="flex-1 items-center justify-center"\` นั้นเร็วกว่าการต้องเลื่อนลงไปล่างสุดเพื่อเขียน \`StyleSheet.create({...})\` เยอะมากครับ
- **เหมาะกับ Universal Apps**: ถ้าคุณทำโปรเจกต์ที่รันทั้ง Web, iOS, Android ด้วยโค้ดชุดเดียวกัน NativeWind คือพระเอกเลยครับ

## ข้อเสียและการพึงระวัง (Cons)
- **รันคลาสได้ไม่ครบ 100%**: เอนจินมือถือไม่ใช่เบราว์เซอร์ คลาสเว็บซับซ้อนบางตัว (เช่น \`grid\` ขั้นสูง, การทำ \`:hover\` บนมือถือ, หรือ CSS Tricks ประหลาดๆ) อาจจะทำงานไม่ได้ หรือพัง
- **จุกจิกตอน Setup ต้นโปรเจกต์**: ต้องมีการตั้งค่า Babel/Metro บ่อยครั้งเวลามีอัปเดตเวอร์ชันอาจจะเจอบั๊กแปลกๆ ได้

## สรุป: ควรใช้อะไรดี?
ถ้าคุณเน้น **ความเร็วในการสร้างแอป (Velocity)** และคุ้นเคยกับ Tailwind มาก่อน **"แนะนำให้จัด NativeWind ได้เลยครับ!"** ปัจจุบัน Expo (ผู้สร้าง React Native framework) ก็เชียร์ให้ใช้ตัวนี้เป็นมาตรฐานใหม่ในการทำแอปแล้วครับ`,
        codeExamples: [
          {
            title: 'NativeWind Usage',
            language: 'tsx',
            code: `import { View, Text, Pressable } from 'react-native';

export function NativeWindExample() {
  return (
    // 1. "flex-1": Takes up whole screen
    // 2. "bg-slate-900": Dark background
    // 3. "items-center justify-center": Centers children
    <View className="flex-1 bg-slate-900 justify-center items-center px-4">
      
      {/* Text sizing and coloring */}
      <Text className="text-3xl font-extrabold text-white mb-2">
        Welcome to NativeWind
      </Text>
      
      {/* Gray muted text */}
      <Text className="text-base text-slate-400 text-center mb-8">
        Style your app instantly without writing a single line of StyleSheet.
      </Text>

      {/* Button with touch-feedback via active: opacity */}
      <Pressable className="w-full bg-indigo-500 active:bg-indigo-600 p-4 rounded-xl items-center shadow-lg shadow-indigo-500/30">
        <Text className="text-white font-semibold text-lg">Get Started</Text>
      </Pressable>
      
    </View>
  );
}`
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
        contentEn: `# Handling Forms Like a Pro

## The Old Way (Manual State)
If you have a form with 10 inputs, you don't want to create 10 \`useState\` variables. It makes the app slow because every time you type one letter, the *entire screen* re-renders.

## The Modern Way: React Hook Form 🔥
In the real world, we use a library called **React Hook Form**. 
It handles all the messy stuff for us:
- Doesn't slow down your app when you type
- Built-in error handling (e.g., "Email is required")
- Less code to write!`,
        contentTh: `# การจัดการฟอร์มแบบมือโปร

## วิธีดั้งเดิม (คุม State เอง)
ลองคิดดูว่าถ้าหน้าเว็บมี 10 ช่องให้กรอก เราคงไม่อยากสร้าง \`useState\` 10 ตัว เพราะมันจะทำให้แอปช้าลง (ทุกครั้งที่พิมพ์ 1 ตัวอักษร หน้าจอจะถูกโหลดใหม่ทั้งหมด)

## วิถีสมัยใหม่: React Hook Form 🔥
ในการทำงานจริง เราจะใช้ไลบรารีที่ชื่อว่า **React Hook Form** ซึ่งช่วยจัดการเรื่องปวดหัวให้หมด:
- พิมพ์แล้วแอปไม่กระตุก (No unnecessary re-renders)
- มีระบบจัดการ Error ในตัว (เช่น "กรุณากรอกอีเมล")
- เขียนโค้ดน้อยลงมาก!`,
        codeExamples: [
          {
            title: 'Forms with React Hook Form',
            language: 'tsx',
            code: `import { useForm, Controller } from 'react-hook-form';
import { TextInput, View, Text, Pressable } from 'react-native';

export function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <View className="p-4">
      {/* Email Input */}
      <Controller
        control={control}
        rules={{ required: 'Email is required!' }}
        render={({ field: { onChange, value } }) => (
          <TextInput 
            className="border p-2 rounded mb-2" 
            placeholder="Email" 
            onChangeText={onChange} 
            value={value} 
          />
        )}
        name="email"
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

      <Pressable onPress={handleSubmit(onSubmit)} className="bg-blue-500 p-3 rounded mt-4">
        <Text className="text-white text-center">Login</Text>
      </Pressable>
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
        titleEn: 'State Management (Zustand)',
        titleTh: 'การจัดการ State (Zustand)',
        descriptionEn: 'Learn modern global state management with Zustand',
        descriptionTh: 'เรียนรู้การจัดการ State ระดับแอปด้วย Zustand',
        sdkVersion: '0.76',
        lastUpdated: '2026-02-01',
        contentEn: `# State Management

## What is State?
Think of State as the **Memory** of your app. If a user clicks "Dark Mode", the app needs to *remember* that choice across all screens.

## Why not use Context or Redux?
- \`useState\` only works inside one screen.
- \`Context API\` can make your app slow if not used carefully.
- \`Redux\` is powerful but requires a massive amount of confusing code.

## Enter Zustand 🐻
Zustand is a tiny, fast, and extremely popular library for Global State. It lets you create a "Store" (a global memory box) that any screen can access instantly without wrapping your app in providers!`,
        contentTh: `# การจัดการ State (ความจำของแอป)

## State คืออะไร?
ให้คิดว่า State คือ **ความจำ** ของแอป ถ้ายูสเซอร์กดเลือก "โหมดมืด" แอปก็ต้อง *จำ* ให้ได้ว่ายูสเซอร์เลือกโหมดมืดไว้ ไม่ว่าจะเปลี่ยนไปหน้าไหนก็ตาม

## ทำไมไม่ใช้ Context หรือ Redux?
- \`useState\` จำได้แค่ในหน้าจอของตัวเอง ส่งข้ามหน้าจอยาก
- \`Context API\` ถ้าใช้ไม่ระวังอาจทำให้แอปกระตุกได้
- \`Redux\` ทรงพลังมาก แต่เขียนโค้ดยากและยาวเกินจำเป็นสำหรับมือใหม่

## พระเอกของเรา: Zustand 🐻
Zustand (ซูส-ตานท์) เป็นไลบรารีขนาดเล็ก เร็วปรี๊ด และฮิตมากในตอนนี้ มันช่วยให้เราสร้าง "Store" (กล่องความจำส่วนกลาง) ที่หน้าจอไหนก็ดึงข้อมูลไปใช้ได้ทันทีโดยไม่ต้องตั้งค่าวุ่นวาย!`,
        codeExamples: [
          {
            title: 'Zustand Example',
            language: 'tsx',
            code: `import { create } from 'zustand';
import { View, Text, Pressable } from 'react-native';

// 1. Create a Store (The Memory Box)
const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// 2. Use it anywhere!
export function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return (
    <View className="items-center mt-10">
      <Text className="text-2xl">We have {bears} bears! 🐻</Text>
      <Pressable onPress={increasePopulation} className="bg-orange-500 p-3 rounded mt-4">
        <Text className="text-white">+ Add Bear</Text>
      </Pressable>
    </View>
  );
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
