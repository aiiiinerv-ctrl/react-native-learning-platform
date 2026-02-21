import { Module } from './types';

export const intermediateModules: Module[] = [
  {
    id: 'i-state',
    titleEn: 'State Management',
    titleTh: 'การจัดการ State',
    descriptionEn: 'Master state management patterns and libraries',
    descriptionTh: 'เชี่ยวชาญรูปแบบและไลบรารีจัดการ State',
    lessons: [
      {
        id: 'i01-context',
        titleEn: 'Component State vs Global State',
        titleTh: 'State ใน Component vs State ระดับแอป',
        descriptionEn: 'When to use useState versus Zustand/Context',
        descriptionTh: 'เมื่อไหร่ควรใช้ useState และเมื่อไหร่ควรใช้ Zustand',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# State Management Strategy

In React Native, you don't need Global State for everything! 
If you put all your data in Zustand or Redux, your app becomes messy.

## The Rule of Thumb
1. **Local State (\`useState\`)**: Use for UI toggles, form inputs, or things only *one screen* cares about.
2. **Global State (\`Zustand\`)**: Use for user sessions, light/dark mode, or settings that *multiple screens* need to share.
3. **Server State (\`React Query\`)**: Use for data fetched from an API (we will learn this next!).`,
        contentTh: `# กลยุทธ์การจัดการ State

ใน React Native เราไม่จำเป็นต้องใช้ Global State กับทุกเรื่อง!
ถ้าเราเอาข้อมูลทุกอย่างไปยัดไว้ใน Zustand หรือ Redux แอปจะรกและดูแลยากมาก

## หลักการจำง่ายๆ
1. **Local State (\`useState\`)**: ใช้กับสิ่งที่มีผลแค่ในหน้าจอนั้นหน้าเดียว (เช่น กรอกฟอร์ม, เปิด/ปิด Popup)
2. **Global State (\`Zustand\`)**: ใช้กับข้อมูลที่หลายๆ หน้าจอต้องทำงานร่วมกัน (เช่น ข้อมูล User ที่ Login, โหมดมืด/สว่าง)
3. **Server State (\`React Query\`)**: ใช้กับข้อมูลที่ต้องดึงมาจากอินเทอร์เน็ตผ่าน API (เดี๋ยวเราจะได้เรียนในบทถัดไป!)`,
        codeExamples: [{
          title: 'Local vs Global Rules',
          language: 'tsx',
          code: `// ❌ Wrong: Using Global State for a simple popup toggle
const useStore = create(set => ({ isModalOpen: false, toggle: () => set(s => ({ isModalOpen: !s.isModalOpen })) }));

// ✅ Right: Using Local State for UI only
export function Screen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return <Modal visible={isModalOpen} />;
}`
        }]
      },
      {
        id: 'i01b-usereducer',
        titleEn: 'Complex State with useReducer',
        titleTh: 'จัดการ State ที่ซับซ้อนด้วย useReducer',
        descriptionEn: 'Scale up local state management using useReducer',
        descriptionTh: 'ยกระดับการจัดการ Local State ด้วย useReducer',
        sdkVersion: '0.76', lastUpdated: '2026-02-22',
        contentEn: `# useReducer\n\nWhen \`useState\` starts getting chaotic with multiple state variables updating together, it's time to use \`useReducer\`.\n\n## Why useReducer?\nIt centralizes your state logic into a single "reducer" function. This makes it easier to track changes and guarantees that related states (like \`loading\`, \`data\`, and \`error\`) are updated simultaneously.`,
        contentTh: `# useReducer\n\nเมื่อหน้าจอเริ่มมี \`useState\` เยอะเกินไป และต้องอัพเดตหลายๆ ค่าพร้อมกัน การเปลี่ยนมาใช้ \`useReducer\` จะช่วยให้ชีวิตง่ายขึ้น\n\n## ทำไมต้อง useReducer?\nมันช่วยรวบรวมลอจิกการเปลี่ยน state ทั้งหมดไว้ในฟังก์ชันเดียว (reducer) ทำให้เราติดตามการอัพเดตข้อมูลได้ง่ายขึ้น และรับประกันว่า state ที่เกี่ยวข้องกัน (เช่น \`loading\`, \`data\`, \`error\`) จะถูกอัพเดตไปพร้อมๆ กันเสมอ`,
        codeExamples: [{
          title: 'useReducer Example',
          language: 'tsx',
          code: `import { useReducer } from 'react';\nimport { View, Text, Button } from 'react-native';\n\ntype State = { count: number; error: string | null };\ntype Action = { type: 'increment' | 'decrement' } | { type: 'error'; payload: string };\n\nconst initialState: State = { count: 0, error: null };\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1, error: null };\n    case 'decrement':\n      return { count: state.count - 1, error: null };\n    case 'error':\n      return { ...state, error: action.payload };\n    default:\n      return state;\n  }\n}\n\nexport function Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n\n  return (\n    <View>\n      <Text>Count: {state.count}</Text>\n      <Button title="+" onPress={() => dispatch({ type: 'increment' })} />\n      <Button title="-" onPress={() => dispatch({ type: 'decrement' })} />\n    </View>\n  );\n}`
        }]
      },
      {
        id: 'i02-query',
        titleEn: 'Data Fetching (React Query)',
        titleTh: 'การดึงข้อมูล (React Query)',
        descriptionEn: 'Professional data fetching and caching',
        descriptionTh: 'มาตรฐานการดึงข้อมูลและการทำ Caching ระดับโปร',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# TanStack React Query 🔥

## Please Stop using \`useEffect\` for APIs!
Fetching data using \`useEffect\` and \`useState\` causes many bugs (race conditions, memory leaks, no caching). Modern companies use **React Query**.

## Why React Query?
- **Auto Caching**: It remembers data. If you change screens and come back, the data shows instantly!
- **Auto Loading/Error States**: No need to write \`const [loading, setLoading] = useState(false)\` ever again.
- **Auto Refetching**: It can automatically fetch new data when the user focuses the screen again.`,
        contentTh: `# TanStack React Query 🔥

## เลิกใช้ \`useEffect\` ดึงข้อมูลจาก API เถอะครับ!
การใช้ \`useEffect\` คู่กับ \`useState\` เพื่อดึงข้อมูล มักจะทำให้เกิดบั๊กมากมาย (เช่น โหลดข้อมูลซ้ำซ้อน, โหลดช้า, ไม่มีระบบจำข้อมูล) ปัจจุบันบริษัทชั้นนำหันมาใช้ **React Query** กันหมดแล้ว

## ทำไมต้อง React Query?
- **มีระบบ Cache อัตโนมัติ**: มันจะจำข้อมูลเดิมไว้ให้ สมมติเรากดเปลี่ยนหน้าแล้วกลับมา หน้าจอจะโชว์ข้อมูลทันทีโดยไม่ต้องรอโหลดใหม่!
- **จัดการสถานะ Loading/Error ให้เอง**: ลาก่อน \`const [loading, setLoading] = useState(false)\`
- **ดึงข้อมูลใหม่ให้อัตโนมัติ**: เมื่อผู้ใช้สลับแอปไปมา มันสามารถรีเฟรชข้อมูลให้เป็นตัวล่าสุดได้เอง`,
        codeExamples: [{
          title: 'React Query Example',
          language: 'tsx',
          code: `import { useQuery } from '@tanstack/react-query';
import { View, Text, ActivityIndicator } from 'react-native';

const fetchUser = async () => {
  const res = await fetch('https://api.example.com/user');
  return res.json();
};

export function UserProfile() {
  // It gives you data, isLoading, and isError instantly!
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['user'], 
    queryFn: fetchUser 
  });

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Failed to load!</Text>;

  return <Text>Hello, {data.name}!</Text>;
}`
        }]
      },
      {
        id: 'i03-zustand',
        titleEn: 'State Management with Zustand',
        titleTh: 'จัดการ State ด้วย Zustand',
        descriptionEn: 'Lightweight state management with Zustand',
        descriptionTh: 'จัดการ State แบบเบาด้วย Zustand',
        sdkVersion: '0.76', lastUpdated: '2026-01-25',
        contentEn: `# Zustand\n\nZustand is a small, fast, and scalable state management library.\n\n## Why Zustand?\n- No boilerplate\n- No providers needed\n- Works outside React components\n- TypeScript friendly\n- Tiny bundle size (~1KB)`,
        contentTh: `# Zustand\n\nZustand เป็นไลบรารีจัดการ state ที่เล็ก เร็ว และขยายได้\n\n## ทำไมต้อง Zustand?\n- ไม่มี boilerplate\n- ไม่ต้องใช้ provider\n- ใช้นอก React components ได้\n- รองรับ TypeScript\n- ขนาดเล็กมาก (~1KB)`,
        codeExamples: [{
          title: 'Zustand Store',
          language: 'typescript',
          code: `import { create } from 'zustand';\n\ninterface TodoStore {\n  todos: string[];\n  addTodo: (todo: string) => void;\n  removeTodo: (index: number) => void;\n}\n\nexport const useTodoStore = create<TodoStore>((set) => ({\n  todos: [],\n  addTodo: (todo) => set((s) => ({ todos: [...s.todos, todo] })),\n  removeTodo: (i) => set((s) => ({ todos: s.todos.filter((_, idx) => idx !== i) })),\n}));`
        }]
      }
    ]
  },
  {
    id: 'i-routing',
    titleEn: 'Routing & Navigation',
    titleTh: 'Routing และ Navigation',
    descriptionEn: 'Advanced routing patterns and deep linking',
    descriptionTh: 'รูปแบบ routing ขั้นสูงและ deep linking',
    lessons: [
      {
        id: 'i04-advanced-nav',
        titleEn: 'React Navigation Advanced',
        titleTh: 'React Navigation ขั้นสูง',
        descriptionEn: 'Stack, Tab, Drawer navigators and nesting',
        descriptionTh: 'Stack, Tab, Drawer navigators และการซ้อน',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# Advanced Navigation\n\n## Navigator Types\n- **Stack**: Push/pop screens\n- **Tab**: Bottom tabs\n- **Drawer**: Side menu\n- **Material Top Tabs**: Swipeable top tabs\n\n## Nesting Navigators\nYou can nest navigators for complex flows.`,
        contentTh: `# Navigation ขั้นสูง\n\n## ประเภท Navigator\n- **Stack**: Push/pop หน้าจอ\n- **Tab**: แท็บด้านล่าง\n- **Drawer**: เมนูด้านข้าง\n- **Material Top Tabs**: แท็บด้านบนที่ swipe ได้`,
        codeExamples: [{
          title: 'Nested Navigation',
          language: 'tsx',
          code: `import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\nimport { createNativeStackNavigator } from '@react-navigation/native-stack';\n\nconst Tab = createBottomTabNavigator();\nconst HomeStack = createNativeStackNavigator();\n\nfunction HomeStackScreen() {\n  return (\n    <HomeStack.Navigator>\n      <HomeStack.Screen name="Feed" component={FeedScreen} />\n      <HomeStack.Screen name="Details" component={DetailsScreen} />\n    </HomeStack.Navigator>\n  );\n}\n\nexport default function App() {\n  return (\n    <Tab.Navigator>\n      <Tab.Screen name="Home" component={HomeStackScreen} />\n      <Tab.Screen name="Profile" component={ProfileScreen} />\n    </Tab.Navigator>\n  );\n}`
        }]
      },
      {
        id: 'i05-deeplink',
        titleEn: 'Deep Linking & Routing Patterns',
        titleTh: 'Deep Linking และรูปแบบ Routing',
        descriptionEn: 'Handle deep links and URL routing',
        descriptionTh: 'จัดการ deep links และ URL routing',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# Deep Linking\n\nDeep linking allows users to open specific screens from external URLs or push notifications.\n\n## Expo Router (File-Based)\nExpo Router uses file-based routing similar to Next.js.`,
        contentTh: `# Deep Linking\n\nDeep linking ช่วยให้ผู้ใช้เปิดหน้าจอเฉพาะจาก URL ภายนอกหรือ push notifications\n\n## Expo Router (File-Based)\nExpo Router ใช้ file-based routing คล้าย Next.js`,
        codeExamples: [{
          title: 'Deep Link Config',
          language: 'typescript',
          code: `const linking = {\n  prefixes: ['myapp://', 'https://myapp.com'],\n  config: {\n    screens: {\n      Home: '',\n      Profile: 'user/:id',\n      Settings: 'settings',\n    },\n  },\n};`
        }]
      }
    ]
  },
  {
    id: 'i-data',
    titleEn: 'Data Management',
    titleTh: 'การจัดการข้อมูล',
    descriptionEn: 'Data persistence, API integration, and forms',
    descriptionTh: 'การจัดเก็บข้อมูล, API integration และ forms',
    lessons: [
      {
        id: 'i06-reanimated',
        titleEn: 'Advanced Animations (Reanimated & Moti)',
        titleTh: 'แอนิเมชันขั้นสูง (Reanimated และ Moti)',
        descriptionEn: 'Create 60FPS fluid animations without blocking the UI thread',
        descriptionTh: 'สร้างแอนิเมชัน 60FPS ที่ลื่นไหลโดยไม่กระตุก',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# React Native Reanimated

React Native's built-in \`Animated\` library is okay, but for complex, fluid animations, **Reanimated** is the gold standard.
It runs animations entirely on the UI thread, meaning even if your JavaScript is doing heavy calculations, your animations won't skip a frame (60 FPS or 120 FPS!).

## Enter Moti 🚀
Writing pure Reanimated code can be complex. **Moti** is a library built on top of Reanimated that makes it as easy as Framer Motion on the web.`,
        contentTh: `# React Native Reanimated

ไลบรารี \`Animated\` ที่มีมาให้ใน React Native นั้นพอใช้ได้ แต่สำหรับแอนิเมชันที่ซับซ้อนและลื่นไหล **Reanimated** ถือเป็นมาตรฐานทองคำเลยครับ
มันทำงานบน UI thread 100% ซึ่งหมายความว่าต่อให้ฝั่ง JavaScript ของเรากำลังประมวลผลหนักแค่ไหน แอนิเมชันบนจอก็จะไม่ค้างหรือกระตุกเลย (วิ่งเต็ม 60 FPS ขึ้นไป)

## รู้จักกับ Moti 🚀
การเขียน Reanimated เพียวๆ อาจจะเขียนยากไปนิด **Moti** จึงเป็นไลบรารีเสริมตัวยอดฮิตที่ทำให้เราเขียนแอนิเมชันได้ง่ายเหมือนฝั่งเว็บ (Framer Motion)`,
        codeExamples: [{
          title: 'Simple Animation with Moti',
          language: 'tsx',
          code: `import { View } from 'react-native';
import { MotiView } from 'moti';

export function BouncingBox() {
  return (
    <View className="flex-1 items-center justify-center">
      <MotiView
        from={{ opacity: 0, scale: 0.5, translateY: 100 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 100,
        }}
        className="w-32 h-32 bg-purple-500 rounded-xl"
      />
    </View>
  );
}`
        }]
      },
      {
        id: 'i07-api',
        titleEn: 'REST API Integration',
        titleTh: 'การเชื่อมต่อ REST API',
        descriptionEn: 'Fetch data from APIs with Axios and error handling',
        descriptionTh: 'ดึงข้อมูลจาก API ด้วย Axios และจัดการ error',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# REST API Integration\n\n## Axios vs Fetch\n- **Fetch**: Built-in, no extra dependency\n- **Axios**: More features, interceptors, better error handling`,
        contentTh: `# การเชื่อมต่อ REST API\n\n## Axios vs Fetch\n- **Fetch**: มีในตัว ไม่ต้องติดตั้งเพิ่ม\n- **Axios**: ฟีเจอร์มากกว่า มี interceptors จัดการ error ดีกว่า`,
        codeExamples: [{
          title: 'API Service Class',
          language: 'typescript',
          code: `import axios from 'axios';\n\nconst api = axios.create({\n  baseURL: 'https://api.example.com',\n  timeout: 10000,\n  headers: { 'Content-Type': 'application/json' },\n});\n\napi.interceptors.request.use((config) => {\n  const token = getToken();\n  if (token) config.headers.Authorization = \`Bearer \${token}\`;\n  return config;\n});\n\nexport default api;`
        }]
      },
      {
        id: 'i08-forms',
        titleEn: 'Form Management & Validation',
        titleTh: 'จัดการฟอร์มและ Validation',
        descriptionEn: 'Build forms with react-hook-form and validation',
        descriptionTh: 'สร้างฟอร์มด้วย react-hook-form และ validation',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# Form Management\n\n## react-hook-form\nThe most popular form library for React Native.\n\n## Validation with Zod\nType-safe schema validation.`,
        contentTh: `# จัดการฟอร์ม\n\n## react-hook-form\nไลบรารีฟอร์มยอดนิยมสำหรับ React Native\n\n## Validation ด้วย Zod\nSchema validation ที่ type-safe`,
        codeExamples: [{
          title: 'react-hook-form + Zod',
          language: 'tsx',
          code: `import { useForm, Controller } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\n\nconst schema = z.object({\n  email: z.string().email(),\n  password: z.string().min(8),\n});\n\ntype FormData = z.infer<typeof schema>;\n\nexport function LoginForm() {\n  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({\n    resolver: zodResolver(schema),\n  });\n  // ...\n}`
        }]
      }
    ]
  },
  {
    id: 'i-tips',
    titleEn: 'Tips & Testing',
    titleTh: 'เคล็ดลับและการทดสอบ',
    descriptionEn: 'Error handling, custom hooks, performance tips, and testing',
    descriptionTh: 'จัดการ error, custom hooks, เคล็ดลับประสิทธิภาพ และการทดสอบ',
    lessons: [
      {
        id: 'i09-error',
        titleEn: 'Error Handling Patterns',
        titleTh: 'รูปแบบการจัดการ Error',
        descriptionEn: 'Graceful error handling in React Native apps',
        descriptionTh: 'จัดการ error อย่างสง่างามในแอป React Native',
        sdkVersion: '0.76', lastUpdated: '2026-02-05',
        contentEn: `# Error Handling\n\n## Error Boundaries\nCatch rendering errors in component tree.\n\n## Try-Catch for Async\nAlways wrap async operations.`,
        contentTh: `# การจัดการ Error\n\n## Error Boundaries\nจับ error ในการ render component tree\n\n## Try-Catch สำหรับ Async\nครอบ async operations เสมอ`,
        codeExamples: [{
          title: 'Error Boundary',
          language: 'tsx',
          code: `import React, { Component, ErrorInfo, ReactNode } from 'react';\n\ninterface Props { children: ReactNode; fallback?: ReactNode; }\ninterface State { hasError: boolean; }\n\nclass ErrorBoundary extends Component<Props, State> {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info); }\n  render() {\n    if (this.state.hasError) return this.props.fallback || <Text>Something went wrong</Text>;\n    return this.props.children;\n  }\n}`
        }]
      },
      {
        id: 'i10-hooks',
        titleEn: 'Custom Hooks & Utilities',
        titleTh: 'Custom Hooks และ Utilities',
        descriptionEn: 'Build reusable custom hooks',
        descriptionTh: 'สร้าง custom hooks ที่ใช้ซ้ำได้',
        sdkVersion: '0.76', lastUpdated: '2026-02-05',
        contentEn: `# Custom Hooks\n\nCustom hooks let you extract component logic into reusable functions.\n\n## Common Patterns\n- useFetch — data fetching\n- useDebounce — debounced values\n- useAppState — app foreground/background`,
        contentTh: `# Custom Hooks\n\nCustom hooks ช่วยแยก logic ออกจาก component เป็นฟังก์ชันที่ใช้ซ้ำได้`,
        codeExamples: [{
          title: 'useFetch Hook',
          language: 'typescript',
          code: `export function useFetch<T>(url: string) {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<string | null>(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    fetch(url)\n      .then(r => r.json())\n      .then(d => { if (!cancelled) { setData(d); setLoading(false); } })\n      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });\n    return () => { cancelled = true; };\n  }, [url]);\n\n  return { data, loading, error };\n}`
        }]
      },
      {
        id: 'i11-performance',
        titleEn: 'Performance Optimization Tips',
        titleTh: 'เคล็ดลับเพิ่มประสิทธิภาพ',
        descriptionEn: 'Optimize React Native app performance',
        descriptionTh: 'เพิ่มประสิทธิภาพแอป React Native',
        sdkVersion: '0.76', lastUpdated: '2026-02-05',
        contentEn: `# Performance Tips\n\n1. **Use React.memo** for pure components\n2. **useMemo/useCallback** to prevent re-renders\n3. **FlatList** over ScrollView for lists\n4. **Hermes** engine (enabled by default)\n5. **Image optimization** — use WebP, cache images\n6. **Avoid inline styles** in render methods`,
        contentTh: `# เคล็ดลับประสิทธิภาพ\n\n1. ใช้ **React.memo** สำหรับ pure components\n2. ใช้ **useMemo/useCallback** ป้องกัน re-render\n3. ใช้ **FlatList** แทน ScrollView สำหรับ lists\n4. ใช้ **Hermes** engine (เปิดใช้งานโดยค่าเริ่มต้น)\n5. **เพิ่มประสิทธิภาพรูปภาพ** — ใช้ WebP, cache images\n6. **หลีกเลี่ยง inline styles** ใน render methods`,
        codeExamples: [{
          title: 'Memoization',
          language: 'tsx',
          code: `import React, { useMemo, useCallback } from 'react';\n\nconst ExpensiveList = React.memo(({ items, onPress }) => {\n  return items.map(item => (\n    <Pressable key={item.id} onPress={() => onPress(item.id)}>\n      <Text>{item.name}</Text>\n    </Pressable>\n  ));\n});\n\nfunction Parent() {\n  const filtered = useMemo(() => items.filter(i => i.active), [items]);\n  const handlePress = useCallback((id: string) => { /* ... */ }, []);\n  return <ExpensiveList items={filtered} onPress={handlePress} />;\n}`
        }]
      },
      {
        id: 'i12-testing',
        titleEn: 'Testing with Jest & RNTL',
        titleTh: 'การทดสอบด้วย Jest และ RNTL',
        descriptionEn: 'Unit and component testing strategies',
        descriptionTh: 'กลยุทธ์การทดสอบ Unit และ Component',
        sdkVersion: '0.76', lastUpdated: '2026-02-05',
        contentEn: `# Testing\n\n## Jest — Unit Tests\nTest pure functions, hooks, and utilities.\n\n## React Native Testing Library (RNTL)\nTest components as users interact with them.`,
        contentTh: `# การทดสอบ\n\n## Jest — Unit Tests\nทดสอบ pure functions, hooks และ utilities\n\n## React Native Testing Library (RNTL)\nทดสอบ components แบบที่ผู้ใช้โต้ตอบ`,
        codeExamples: [{
          title: 'Component Test',
          language: 'tsx',
          code: `import { render, fireEvent } from '@testing-library/react-native';\nimport { Counter } from './Counter';\n\ntest('increments counter', () => {\n  const { getByText } = render(<Counter />);\n  fireEvent.press(getByText('Increment'));\n  expect(getByText('Count: 1')).toBeTruthy();\n});`
        }]
      }
    ]
  }
];
