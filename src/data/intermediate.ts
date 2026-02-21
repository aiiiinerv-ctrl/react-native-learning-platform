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
        titleEn: 'State Management with Context API',
        titleTh: 'จัดการ State ด้วย Context API',
        descriptionEn: 'Built-in React state sharing across components',
        descriptionTh: 'แชร์ State ข้ามComponent ด้วย Context API ที่มีในตัว',
        sdkVersion: '0.76', lastUpdated: '2026-01-20',
        contentEn: `# Context API\n\nContext provides a way to pass data through the component tree without manually passing props at every level.\n\n## When to Use\n- Theme data\n- User authentication state\n- Locale/language preferences\n- Small to medium-sized apps`,
        contentTh: `# Context API\n\nContext ช่วยส่งข้อมูลผ่าน component tree โดยไม่ต้องส่ง props ทุกระดับ\n\n## ใช้เมื่อไหร่\n- ข้อมูล Theme\n- สถานะ Authentication\n- การตั้งค่าภาษา\n- แอปขนาดเล็กถึงกลาง`,
        codeExamples: [{
          title: 'Context Provider',
          language: 'tsx',
          code: `import { createContext, useContext, useState, ReactNode } from 'react';\n\ninterface AuthContextType {\n  user: string | null;\n  login: (name: string) => void;\n  logout: () => void;\n}\n\nconst AuthContext = createContext<AuthContextType | undefined>(undefined);\n\nexport function AuthProvider({ children }: { children: ReactNode }) {\n  const [user, setUser] = useState<string | null>(null);\n  return (\n    <AuthContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport const useAuth = () => {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error('useAuth must be used within AuthProvider');\n  return ctx;\n};`
        }]
      },
      {
        id: 'i02-redux',
        titleEn: 'State Management with Redux Toolkit',
        titleTh: 'จัดการ State ด้วย Redux Toolkit',
        descriptionEn: 'Scalable state management with Redux Toolkit',
        descriptionTh: 'จัดการ State แบบ scalable ด้วย Redux Toolkit',
        sdkVersion: '0.76', lastUpdated: '2026-01-25',
        contentEn: `# Redux Toolkit\n\nRedux Toolkit (RTK) is the official, recommended way to write Redux logic.\n\n## Key Concepts\n- **Store**: Single source of truth\n- **Slice**: Reducer + actions in one\n- **createAsyncThunk**: Handle async operations\n- **RTK Query**: Data fetching and caching`,
        contentTh: `# Redux Toolkit\n\nRedux Toolkit (RTK) เป็นวิธีที่แนะนำอย่างเป็นทางการในการเขียน Redux\n\n## แนวคิดหลัก\n- **Store**: แหล่งข้อมูลเดียว\n- **Slice**: Reducer + actions ในที่เดียว\n- **createAsyncThunk**: จัดการ async operations\n- **RTK Query**: ดึงข้อมูลและ caching`,
        codeExamples: [{
          title: 'Redux Slice',
          language: 'typescript',
          code: `import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';\n\nexport const fetchTodos = createAsyncThunk('todos/fetch', async () => {\n  const res = await fetch('/api/todos');\n  return res.json();\n});\n\nconst todosSlice = createSlice({\n  name: 'todos',\n  initialState: { items: [], loading: false },\n  reducers: {\n    addTodo: (state, action) => { state.items.push(action.payload); },\n  },\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchTodos.pending, (state) => { state.loading = true; })\n      .addCase(fetchTodos.fulfilled, (state, action) => {\n        state.loading = false;\n        state.items = action.payload;\n      });\n  },\n});\n\nexport const { addTodo } = todosSlice.actions;\nexport default todosSlice.reducer;`
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
        id: 'i06-asyncstorage',
        titleEn: 'Data Persistence with AsyncStorage',
        titleTh: 'จัดเก็บข้อมูลด้วย AsyncStorage',
        descriptionEn: 'Local data storage with AsyncStorage',
        descriptionTh: 'จัดเก็บข้อมูลในเครื่องด้วย AsyncStorage',
        sdkVersion: '0.76', lastUpdated: '2026-02-01',
        contentEn: `# AsyncStorage\n\nAsyncStorage is a simple, unencrypted, asynchronous key-value storage.\n\n## Alternatives\n- **MMKV**: Faster, synchronous, encrypted\n- **WatermelonDB**: For complex relational data\n- **SQLite**: SQL database`,
        contentTh: `# AsyncStorage\n\nAsyncStorage เป็น key-value storage แบบ async ที่เรียบง่าย\n\n## ทางเลือก\n- **MMKV**: เร็วกว่า sync encrypted\n- **WatermelonDB**: สำหรับข้อมูล relational ซับซ้อน\n- **SQLite**: SQL database`,
        codeExamples: [{
          title: 'AsyncStorage Usage',
          language: 'typescript',
          code: `import AsyncStorage from '@react-native-async-storage/async-storage';\n\n// Save data\nawait AsyncStorage.setItem('user', JSON.stringify({ name: 'John' }));\n\n// Read data\nconst raw = await AsyncStorage.getItem('user');\nconst user = raw ? JSON.parse(raw) : null;\n\n// Remove data\nawait AsyncStorage.removeItem('user');`
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
