import { CodeExample } from './types';

export interface Workshop {
  id: string;
  titleEn: string;
  titleTh: string;
  descriptionEn: string;
  descriptionTh: string;
  afterLessonId: string; // lesson this workshop follows
  level: 'beginner' | 'intermediate' | 'expert';
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  instructionsEn: string;
  instructionsTh: string;
  starterCode: string;
  solutionCode: string;
  language: string;
  tests: WorkshopTest[];
}

export interface WorkshopTest {
  name: string;
  description: string;
  pattern: string; // regex pattern to match in user code
}

export const workshops: Workshop[] = [
  {
    id: 'w1-first-screen',
    titleEn: 'Build Your First Screen',
    titleTh: 'สร้างหน้าจอแรกของคุณ',
    descriptionEn: 'Create a profile card UI using View, Text, Image, and StyleSheet',
    descriptionTh: 'สร้าง UI profile card โดยใช้ View, Text, Image และ StyleSheet',
    afterLessonId: 'b03-structure',
    level: 'beginner',
    difficulty: 1,
    estimatedMinutes: 15,
    instructionsEn: `# Build Your First Screen 🎨

## Objective
Create a **Profile Card** component that displays:
1. A profile image (use any URL)
2. User name (bold, large text)
3. A short bio
4. A "Follow" button

## Requirements
- Use \`View\` as the main container with padding and rounded corners
- Use \`Text\` with different styles for name and bio
- Use \`Image\` with a source URI
- Use \`TouchableOpacity\` for the button
- Apply \`StyleSheet.create()\` for all styles
- Center everything on screen`,
    instructionsTh: `# สร้างหน้าจอแรกของคุณ 🎨

## วัตถุประสงค์
สร้างคอมโพเนนต์ **Profile Card** ที่แสดง:
1. รูปโปรไฟล์ (ใช้ URL ใดก็ได้)
2. ชื่อผู้ใช้ (ตัวหนา, ขนาดใหญ่)
3. คำอธิบายสั้นๆ
4. ปุ่ม "Follow"

## ข้อกำหนด
- ใช้ \`View\` เป็น container หลักพร้อม padding และมุมโค้ง
- ใช้ \`Text\` พร้อม styles ที่แตกต่างกันสำหรับชื่อและ bio
- ใช้ \`Image\` พร้อม source URI
- ใช้ \`TouchableOpacity\` สำหรับปุ่ม
- ใช้ \`StyleSheet.create()\` สำหรับ styles ทั้งหมด`,
    starterCode: `import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      {/* TODO: Add Image component */}

      {/* TODO: Add name Text */}

      {/* TODO: Add bio Text */}

      {/* TODO: Add Follow button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // TODO: Add container styles
  },
});`,
    solutionCode: `import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>React Native Developer | Coffee Lover</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  bio: { fontSize: 14, color: '#666', marginBottom: 16, textAlign: 'center' },
  button: { backgroundColor: '#6c63ff', paddingHorizontal: 32, paddingVertical: 10, borderRadius: 25 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});`,
    language: 'tsx',
    tests: [
      { name: 'Has Image', description: 'Uses Image component', pattern: '<Image' },
      { name: 'Has Text', description: 'Uses Text component for content', pattern: '<Text' },
      { name: 'Has Button', description: 'Uses TouchableOpacity for interaction', pattern: 'TouchableOpacity' },
      { name: 'Has StyleSheet', description: 'Uses StyleSheet.create', pattern: 'StyleSheet\\.create' },
    ]
  },
  {
    id: 'w2-layout-challenge',
    titleEn: 'Responsive Layout Challenge',
    titleTh: 'ความท้าทาย Layout แบบ Responsive',
    descriptionEn: 'Build a responsive card grid using Flexbox',
    descriptionTh: 'สร้าง card grid แบบ responsive ด้วย Flexbox',
    afterLessonId: 'b06-styling',
    level: 'beginner',
    difficulty: 2,
    estimatedMinutes: 20,
    instructionsEn: `# Responsive Layout Challenge 📐

## Objective
Create a **responsive dashboard layout** with:
1. A header bar with title and icon
2. A 2-column grid of stat cards
3. A full-width list section below

## Requirements
- Use \`flexDirection: 'row'\` with \`flexWrap: 'wrap'\` for the grid
- Each card should take 48% width
- Cards should have shadow and rounded corners
- Use \`gap\` or margin for spacing`,
    instructionsTh: `# ความท้าทาย Layout แบบ Responsive 📐

## วัตถุประสงค์
สร้าง **responsive dashboard layout** ที่มี:
1. Header bar พร้อมชื่อและไอคอน
2. Grid ของ stat cards 2 คอลัมน์
3. ส่วน list แบบเต็มความกว้างด้านล่าง

## ข้อกำหนด
- ใช้ \`flexDirection: 'row'\` กับ \`flexWrap: 'wrap'\` สำหรับ grid
- แต่ละ card ควรกว้าง 48%
- Cards ควรมี shadow และมุมโค้ง`,
    starterCode: `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Dashboard() {
  const stats = [
    { label: 'Users', value: '1,234' },
    { label: 'Revenue', value: '$5,678' },
    { label: 'Orders', value: '890' },
    { label: 'Growth', value: '+12%' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* TODO: Header */}

      {/* TODO: Stats Grid (2 columns) */}

      {/* TODO: Recent Activity List */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});`,
    solutionCode: `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Dashboard() {
  const stats = [
    { label: 'Users', value: '1,234', color: '#6c63ff' },
    { label: 'Revenue', value: '$5,678', color: '#10b981' },
    { label: 'Orders', value: '890', color: '#f59e0b' },
    { label: 'Growth', value: '+12%', color: '#ec4899' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Dashboard</Text>
      </View>

      <View style={styles.grid}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.card, { borderLeftColor: stat.color }]}>
            <Text style={styles.cardValue}>{stat.value}</Text>
            <Text style={styles.cardLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {[1,2,3].map(i => (
        <View key={i} style={styles.listItem}>
          <Text>Activity item {i}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardValue: { fontSize: 24, fontWeight: 'bold' },
  cardLabel: { fontSize: 14, color: '#888', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  listItem: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 8 },
});`,
    language: 'tsx',
    tests: [
      { name: 'Has Flexbox Row', description: 'Uses flexDirection row', pattern: "flexDirection.*row" },
      { name: 'Has Wrap', description: 'Uses flexWrap', pattern: 'flexWrap' },
      { name: 'Has Cards', description: 'Renders multiple cards', pattern: '\\.map' },
      { name: 'Has Width', description: 'Sets card width', pattern: "width.*48" },
    ]
  },
  {
    id: 'w3-todo-app',
    titleEn: 'Todo List App',
    titleTh: 'แอป Todo List',
    descriptionEn: 'Build a functional todo app with FlatList, TextInput, and state',
    descriptionTh: 'สร้างแอป todo ที่ใช้งานจริงด้วย FlatList, TextInput และ state',
    afterLessonId: 'b09-lists',
    level: 'beginner',
    difficulty: 3,
    estimatedMinutes: 25,
    instructionsEn: `# Todo List App ✅

## Objective
Build a fully functional **Todo List** with:
1. TextInput to add new todos
2. FlatList to display todos
3. Toggle complete/incomplete
4. Delete todos
5. Show count of remaining items

## Requirements
- Use \`useState\` for managing todo list
- Use \`FlatList\` with proper \`keyExtractor\`
- Each item has: text, completed status, delete button
- Use \`TextInput\` with \`onSubmitEditing\``,
    instructionsTh: `# แอป Todo List ✅

## วัตถุประสงค์
สร้าง **Todo List** ที่ใช้งานได้จริง:
1. TextInput สำหรับเพิ่ม todo ใหม่
2. FlatList สำหรับแสดง todos
3. สลับ complete/incomplete
4. ลบ todos
5. แสดงจำนวนรายการที่เหลือ

## ข้อกำหนด
- ใช้ \`useState\` จัดการ todo list
- ใช้ \`FlatList\` พร้อม \`keyExtractor\`
- แต่ละ item มี: text, completed status, ปุ่มลบ
- ใช้ \`TextInput\` พร้อม \`onSubmitEditing\``,
    starterCode: `import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    // TODO: Add new todo
  };

  const toggleTodo = (id: string) => {
    // TODO: Toggle completed
  };

  const deleteTodo = (id: string) => {
    // TODO: Delete todo
  };

  return (
    <View style={styles.container}>
      {/* TODO: TextInput + Add button */}

      {/* TODO: FlatList */}

      {/* TODO: Remaining count */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});`,
    solutionCode: `import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Todo { id: string; text: string; completed: boolean; }

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 My Todos</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={input} onChangeText={setInput}
          placeholder="Add a todo..." onSubmitEditing={addTodo} />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={todos} keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.todoContent}>
              <Text style={styles.check}>{item.completed ? '✅' : '⬜'}</Text>
              <Text style={[styles.todoText, item.completed && styles.completed]}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
          </View>
        )} />
      <Text style={styles.count}>{remaining} items remaining</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  inputRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' },
  addBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#6c63ff', justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  todoItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  todoContent: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  check: { fontSize: 20 },
  todoText: { fontSize: 16, flex: 1 },
  completed: { textDecorationLine: 'line-through', color: '#aaa' },
  delete: { fontSize: 18 },
  count: { textAlign: 'center', color: '#888', marginTop: 16 },
});`,
    language: 'tsx',
    tests: [
      { name: 'Has useState', description: 'Uses state management', pattern: 'useState' },
      { name: 'Has FlatList', description: 'Uses FlatList component', pattern: 'FlatList' },
      { name: 'Has TextInput', description: 'Uses TextInput', pattern: 'TextInput' },
      { name: 'Has Add Logic', description: 'Implements add todo', pattern: 'setTodos' },
      { name: 'Has Delete', description: 'Implements delete', pattern: 'filter' },
    ]
  },
  {
    id: 'w4-theme-switcher',
    titleEn: 'Theme Switcher',
    titleTh: 'ตัวสลับธีม',
    descriptionEn: 'Build a dark/light mode toggle using Context API',
    descriptionTh: 'สร้าง dark/light mode toggle ด้วย Context API',
    afterLessonId: 'i01-context',
    level: 'intermediate',
    difficulty: 3,
    estimatedMinutes: 25,
    instructionsEn: `# Theme Switcher 🌓

## Objective
Create a **Dark/Light mode** toggle using Context API:
1. ThemeContext with dark/light themes
2. ThemeProvider wrapping the app
3. Toggle button to switch themes
4. All components consume theme from context

## Requirements
- Create \`ThemeContext\` with \`createContext\`
- Define color palettes for dark and light
- Use \`useContext\` in child components
- Smooth transition between themes`,
    instructionsTh: `# ตัวสลับธีม 🌓

## วัตถุประสงค์
สร้าง **Dark/Light mode** toggle ด้วย Context API:
1. ThemeContext พร้อมธีม dark/light
2. ThemeProvider ครอบ app
3. ปุ่ม toggle สำหรับสลับธีม
4. ทุก components ดึงธีมจาก context

## ข้อกำหนด
- สร้าง \`ThemeContext\` ด้วย \`createContext\`
- กำหนดชุดสีสำหรับ dark และ light
- ใช้ \`useContext\` ใน child components`,
    starterCode: `import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// TODO: Create ThemeContext

// TODO: Create ThemeProvider

// TODO: Create themed components

export default function App() {
  return (
    // TODO: Wrap with ThemeProvider
    <View>
      <Text>Theme Switcher</Text>
    </View>
  );
}`,
    solutionCode: `import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const themes = {
  light: { bg: '#ffffff', text: '#1a1a2e', card: '#f0f0f0', accent: '#6c63ff' },
  dark: { bg: '#1a1a2e', text: '#f0f0ff', card: '#2a2a4e', accent: '#a855f7' },
};

const ThemeContext = createContext({ theme: themes.light, isDark: false, toggle: () => {} });

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggle = () => setIsDark(prev => !prev);
  const theme = isDark ? themes.dark : themes.light;
  return <ThemeContext.Provider value={{ theme, isDark, toggle }}>{children}</ThemeContext.Provider>;
}

const useTheme = () => useContext(ThemeContext);

function Header() {
  const { theme, isDark, toggle } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.card }]}>
      <Text style={[styles.title, { color: theme.text }]}>🎨 Theme Demo</Text>
      <TouchableOpacity onPress={toggle} style={[styles.toggleBtn, { backgroundColor: theme.accent }]}>
        <Text style={styles.toggleText}>{isDark ? '☀️ Light' : '🌙 Dark'}</Text>
      </TouchableOpacity>
    </View>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
      <Text style={{ color: theme.text, opacity: 0.7 }}>{body}</Text>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Header />
      <Card title="Context API" body="Sharing state without prop drilling" />
      <Card title="Theme System" body="Switch between dark and light modes" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  toggleBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  toggleText: { color: '#fff', fontWeight: '600' },
  card: { padding: 20, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
});`,
    language: 'tsx',
    tests: [
      { name: 'Has createContext', description: 'Creates theme context', pattern: 'createContext' },
      { name: 'Has Provider', description: 'Creates ThemeProvider', pattern: 'Provider' },
      { name: 'Has useContext', description: 'Consumes context', pattern: 'useContext' },
      { name: 'Has Toggle', description: 'Implements theme toggle', pattern: 'toggle' },
    ]
  },
  {
    id: 'w5-multi-screen',
    titleEn: 'Multi-Screen Navigation App',
    titleTh: 'แอป Navigation หลายหน้าจอ',
    descriptionEn: 'Build a multi-screen app with Tab and Stack navigation',
    descriptionTh: 'สร้างแอปหลายหน้าจอด้วย Tab และ Stack navigation',
    afterLessonId: 'i05-deeplink',
    level: 'intermediate',
    difficulty: 3,
    estimatedMinutes: 30,
    instructionsEn: `# Multi-Screen Navigation App 🧭

## Objective
Create an app with **Tab Navigation** containing 3 tabs:
1. Home (with Stack navigator for detail screens)
2. Search
3. Profile

## Requirements
- Bottom tab navigator with 3 tabs
- Home tab has a stack with List → Detail screens
- Use \`navigation.navigate()\` and \`route.params\`
- Tab icons using emoji or text`,
    instructionsTh: `# แอป Navigation หลายหน้าจอ 🧭

## วัตถุประสงค์
สร้างแอปที่มี **Tab Navigation** 3 tabs:
1. Home (มี Stack navigator สำหรับหน้า detail)
2. Search
3. Profile

## ข้อกำหนด
- Bottom tab navigator 3 tabs
- Home tab มี stack: List → Detail
- ใช้ \`navigation.navigate()\` และ \`route.params\``,
    starterCode: `import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TODO: Create Tab Navigator
// TODO: Create Stack Navigator for Home
// TODO: Create HomeList screen
// TODO: Create HomeDetail screen
// TODO: Create Search screen
// TODO: Create Profile screen

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Multi-Screen App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});`,
    solutionCode: `import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const items = Array.from({ length: 10 }, (_, i) => ({ id: String(i), title: 'Item ' + (i + 1) }));

function HomeList({ navigation }) {
  return (
    <FlatList data={items} keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listItem}
          onPress={() => navigation.navigate('Detail', { id: item.id, title: item.title })}>
          <Text style={styles.listText}>{item.title}</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      )} />
  );
}

function HomeDetail({ route }) {
  return (
    <View style={styles.center}>
      <Text style={styles.detailTitle}>{route.params.title}</Text>
      <Text style={styles.detailId}>ID: {route.params.id}</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={HomeList} options={{ title: '🏠 Home' }} />
      <Stack.Screen name="Detail" component={HomeDetail} />
    </Stack.Navigator>
  );
}

function SearchScreen() {
  return <View style={styles.center}><Text style={styles.emoji}>🔍</Text><Text>Search</Text></View>;
}

function ProfileScreen() {
  return <View style={styles.center}><Text style={styles.emoji}>👤</Text><Text>Profile</Text></View>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#6c63ff' }}>
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false, tabBarIcon: () => <Text>🏠</Text> }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: () => <Text>🔍</Text> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Text>👤</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  listText: { fontSize: 16 },
  arrow: { fontSize: 18, color: '#6c63ff' },
  detailTitle: { fontSize: 28, fontWeight: 'bold' },
  detailId: { fontSize: 16, color: '#888', marginTop: 8 },
  emoji: { fontSize: 48, marginBottom: 12 },
});`,
    language: 'tsx',
    tests: [
      { name: 'Has Tab Navigator', description: 'Uses bottom tabs', pattern: 'Tab\\.Navigator|createBottomTabNavigator' },
      { name: 'Has Stack', description: 'Uses stack navigation', pattern: 'Stack|createNativeStackNavigator' },
      { name: 'Has Navigate', description: 'Uses navigation', pattern: 'navigation\\.navigate|navigate\\(' },
      { name: 'Has Params', description: 'Passes route params', pattern: 'route\\.params|params' },
    ]
  },
  {
    id: 'w6-login-form',
    titleEn: 'Login Form with Validation',
    titleTh: 'ฟอร์ม Login พร้อม Validation',
    descriptionEn: 'Build a login form with field validation and simulated API call',
    descriptionTh: 'สร้างฟอร์ม login พร้อม validation และจำลอง API call',
    afterLessonId: 'i09-forms',
    level: 'intermediate',
    difficulty: 4,
    estimatedMinutes: 30,
    instructionsEn: `# Login Form with Validation 🔐

## Objective
Build a **login form** with:
1. Email input with validation (must be valid email)
2. Password input with validation (min 6 characters)
3. Error messages shown below invalid fields
4. Loading state during "API call"
5. Success/error alert after submission

## Requirements
- \`useState\` for form state and errors
- Email regex validation
- Password length check
- Simulated API call with \`setTimeout\`
- Disabled submit button when loading`,
    instructionsTh: `# ฟอร์ม Login พร้อม Validation 🔐

## วัตถุประสงค์
สร้าง **login form** ที่มี:
1. Input อีเมลพร้อม validation (ต้องเป็นอีเมลที่ถูกต้อง)
2. Input รหัสผ่านพร้อม validation (ขั้นต่ำ 6 ตัวอักษร)
3. แสดงข้อความ error ใต้ฟิลด์ที่ไม่ถูกต้อง
4. Loading state ระหว่าง "API call"
5. Alert สำเร็จ/ล้มเหลวหลัง submit

## ข้อกำหนด
- \`useState\` สำหรับ form state และ errors
- Email regex validation
- ตรวจ password length
- จำลอง API call ด้วย \`setTimeout\``,
    starterCode: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    // TODO: Validate email and password
    return true;
  };

  const handleSubmit = async () => {
    // TODO: Validate, show loading, simulate API call
  };

  return (
    <View style={styles.container}>
      {/* TODO: Email input with error */}

      {/* TODO: Password input with error */}

      {/* TODO: Submit button with loading state */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
});`,
    solutionCode: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!email.match(/^[\\w.-]+@[\\w.-]+\\.\\w+$/)) newErrors.email = 'Please enter a valid email';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email === 'test@test.com' && password === 'password') {
        Alert.alert('Success', 'Welcome back!');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={[styles.input, errors.email && styles.inputError]}
          value={email} onChangeText={setEmail} placeholder="email@example.com"
          keyboardType="email-address" autoCapitalize="none" />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={[styles.input, errors.password && styles.inputError]}
          value={password} onChangeText={setPassword} placeholder="••••••••"
          secureTextEntry />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]}
        onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Sign In</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f8f9fa' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, fontSize: 16, backgroundColor: '#fff' },
  inputError: { borderColor: '#ef4444' },
  error: { color: '#ef4444', fontSize: 13, marginTop: 4 },
  btn: { backgroundColor: '#6c63ff', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});`,
    language: 'tsx',
    tests: [
      { name: 'Has Validation', description: 'Validates email format', pattern: 'match|test|regex|@.*\\.' },
      { name: 'Has Loading', description: 'Shows loading state', pattern: 'loading|ActivityIndicator' },
      { name: 'Has Error Display', description: 'Shows error messages', pattern: 'errors\\.' },
      { name: 'Has Secure Input', description: 'Password is hidden', pattern: 'secureTextEntry' },
    ]
  },
  {
    id: 'w7-performance-audit',
    titleEn: 'Performance Audit',
    titleTh: 'ตรวจสอบประสิทธิภาพ',
    descriptionEn: 'Analyze and optimize a poorly performing component',
    descriptionTh: 'วิเคราะห์และเพิ่มประสิทธิภาพ component ที่ทำงานช้า',
    afterLessonId: 'e04-bundle',
    level: 'expert',
    difficulty: 5,
    estimatedMinutes: 35,
    instructionsEn: `# Performance Audit 🔍

## Objective
You're given a **poorly performing** component. Find and fix the issues:

## Problems to Find
1. Unnecessary re-renders (missing memoization)
2. Expensive computation in render (no useMemo)
3. Inline function recreation (no useCallback)
4. Missing list optimization (no keyExtractor, no getItemLayout)
5. Heavy images without caching

## Your Task
Optimize the starter code to eliminate performance issues.`,
    instructionsTh: `# ตรวจสอบประสิทธิภาพ 🔍

## วัตถุประสงค์
คุณได้รับ component ที่ **ทำงานช้า** จงค้นหาและแก้ไขปัญหา:

## ปัญหาที่ต้องค้นหา
1. Re-renders ที่ไม่จำเป็น (ขาด memoization)
2. การคำนวณหนักใน render (ไม่ใช้ useMemo)
3. สร้าง function ใหม่ทุก render (ไม่ใช้ useCallback)
4. List ไม่ optimize (ไม่มี keyExtractor, ไม่มี getItemLayout)

## งานของคุณ
Optimize starter code เพื่อกำจัดปัญหาประสิทธิภาพ`,
    starterCode: `import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// ❌ Problem 1: This component re-renders every time parent re-renders
function ExpensiveItem({ item, onPress }) {
  console.log('Rendering item:', item.id); // This logs too often!
  return (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>\${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

export default function ProductList() {
  const [items] = useState(
    Array.from({ length: 1000 }, (_, i) => ({
      id: String(i),
      title: 'Product ' + (i + 1),
      price: Math.random() * 100,
    }))
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ❌ Problem 2: Expensive calculation runs every render
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // ❌ Problem 3: New function created every render
  const handlePress = (id: string) => {
    setSelectedId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total: \${totalPrice.toFixed(2)}</Text>
      <Text style={styles.selected}>Selected: {selectedId || 'None'}</Text>
      {/* ❌ Problem 4: Missing optimization props */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ExpensiveItem item={item} onPress={handlePress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  selected: { fontSize: 14, color: '#888', marginBottom: 16 },
  item: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
  itemTitle: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: '600', color: '#6c63ff' },
});`,
    solutionCode: `import React, { useState, useMemo, useCallback, memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// ✅ Fix 1: Wrap with React.memo to prevent unnecessary re-renders
const ExpensiveItem = memo(function ExpensiveItem({ item, onPress }: { item: any; onPress: (id: string) => void }) {
  return (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>\${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
});

const ITEM_HEIGHT = 64;

export default function ProductList() {
  const [items] = useState(
    Array.from({ length: 1000 }, (_, i) => ({
      id: String(i),
      title: 'Product ' + (i + 1),
      price: Math.random() * 100,
    }))
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ✅ Fix 2: Memoize expensive calculation
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  // ✅ Fix 3: Memoize callback to prevent child re-renders
  const handlePress = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // ✅ Fix 4: Optimize FlatList with keyExtractor and getItemLayout
  const keyExtractor = useCallback((item: any) => item.id, []);
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index,
  }), []);
  const renderItem = useCallback(({ item }: any) => (
    <ExpensiveItem item={item} onPress={handlePress} />
  ), [handlePress]);

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total: \${totalPrice.toFixed(2)}</Text>
      <Text style={styles.selected}>Selected: {selectedId || 'None'}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews
        initialNumToRender={15}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  selected: { fontSize: 14, color: '#888', marginBottom: 16 },
  item: { padding: 16, height: ITEM_HEIGHT, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: '600', color: '#6c63ff' },
});`,
    language: 'tsx',
    tests: [
      { name: 'Has memo', description: 'Uses React.memo', pattern: 'memo' },
      { name: 'Has useMemo', description: 'Memoizes computation', pattern: 'useMemo' },
      { name: 'Has useCallback', description: 'Memoizes callbacks', pattern: 'useCallback' },
      { name: 'Has keyExtractor', description: 'Optimizes FlatList', pattern: 'keyExtractor' },
    ]
  },
];

export function getWorkshop(id: string): Workshop | undefined {
  return workshops.find(w => w.id === id);
}

export function getWorkshopsForLesson(lessonId: string): Workshop[] {
  return workshops.filter(w => w.afterLessonId === lessonId);
}
