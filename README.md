# Telegram Tasks Mini App

A Telegram Mini App To-Do Board built with React, TypeScript, Apollo Client, Chakra UI, and the Telegram Mini App SDK.
It supports real-time updates, infinite scroll, localization, and seamless integration with Telegram and TON Connect.

---

## 🚀 Launch Instructions

### 1. **Clone the repository**

```bash
git clone <your-repo-url>
cd telegram-tasks
```

### 2. **Install dependencies**

```bash
yarn install
```

### 3. **Set up environment variables**

Create a `.env` file in the root with:

```
VITE_GRAPHQL_HTTP=https://your-backend-url/graphql
VITE_GRAPHQL_WS=wss://your-backend-url/graphql
```

Replace with your actual backend endpoints.

### 4. **Generate GraphQL types and hooks**

```bash
yarn generate
```

### 5. **Start the development server**

```bash
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 6. **Build for production**

```bash
yarn build
```

### 7. **Preview production build**

```bash
yarn start
```

---

## 🏗️ Architecture Description

### **Frontend**

- **React + TypeScript**: SPA with atomic/reusable components.
- **Apollo Client**: Handles GraphQL queries, mutations, subscriptions, and cache.
- **Chakra UI + Emotion**: For accessible, themeable UI components.
- **Framer Motion**: For smooth UI animations.
- **i18next + react-i18next**: For localization and language switching.
- **@telegram-apps/sdk-react**: For Telegram Mini App integration (theme, main button, haptics, etc.).
- **TON Connect**: For wallet connection and address display.

### **Backend**

- **GraphQL API**: Provides tasks CRUD and real-time subscriptions.
- **Prisma ORM + PostgreSQL**: For persistent task storage.
- **PubSub**: For real-time task updates via GraphQL subscriptions.

---

## 📁 Folder Structure

```
telegram-tasks/
├── public/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/           # Atomic UI components (Button, Switch, Checkbox, etc.)
│   │   │   ├── task-list.tsx # Task list page/component
│   │   │   ├── task-item.tsx # Single task card
│   │   │   ├── task-details.tsx # Task details page
│   │   │   └── ...           # Other feature components
│   │   ├── context/          # React context providers (tasks, language, etc.)
│   │   ├── graphql/          # GraphQL queries, mutations, subscriptions, generated types/hooks
│   │   ├── i18n/             # Localization files (en, ru, tr, etc.)
│   │   ├── apollo-client.ts  # Apollo Client setup
│   │   └── App.tsx           # Main app component
│   ├── package.json
│   ├── vite.config.ts
│   ├── README.md
│   └── ...
```

---

## 🧩 Reusable Components & Hooks

- **UI Components**: All atomic UI elements (Button, Switch, Checkbox, etc.) are in `src/components/ui/`.
- **Task Components**: `TaskList`, `TaskItem`, `TaskDetails` for displaying and interacting with tasks.
- **Context Providers**: `TasksProvider`, `LanguageProvider` for global state.
- **Custom Hooks**: `useTasks`, `useLanguage`, and hooks from `@telegram-apps/sdk-react` (e.g., `useLaunchParams`).

---

## 🧬 Example GraphQL Queries & Using Generated Hooks

### **Example Query (Tasks with Pagination)**

```graphql
query TasksQuery($status: String, $sortBy: String, $limit: Int, $offset: Int) {
  tasks(status: $status, sortBy: $sortBy, limit: $limit, offset: $offset) {
    tasks {
      id
      title
      status
    }
    totalCount
    hasMore
  }
}
```

### **Using a Generated Hook in a Component**

```tsx
import { useTasksQueryQuery } from "@/graphql/generated/graphql";

const { data, loading, error, fetchMore } = useTasksQueryQuery({
  variables: { status: "PENDING", sortBy: "title", limit: 10, offset: 0 },
});
```

### **Adding a Task (Mutation)**

```tsx
import { useAddTaskMutation } from "@/graphql/generated/graphql";

const [addTask, { loading }] = useAddTaskMutation();
const handleAdd = async (title: string) => {
  await addTask({ variables: { title } });
};
```

### **Subscribing to Task Updates**

```tsx
import { useTaskAddedSubscription } from "@/graphql/generated/graphql";

const { data } = useTaskAddedSubscription();
```

---

## 🛠️ Telegram Mini App SDK Integration

- **Initialization**: Done in `main.tsx` or via hooks from `@telegram-apps/sdk-react`.
- **Theme**: Uses Telegram's `themeParams` for seamless look.
- **MainButton**: Controlled via `mainButton` from the SDK for main actions.
- **Haptic Feedback**: Triggered on important user interactions.
- **TON Connect**: Wallet connection and address display.

---

## 🌐 Localization

- **i18next** is configured for English, Russian, and Turkish.
- Use the language switcher in the UI to change languages.

---

## ♻️ Infinite Scroll & Apollo Cache

- The task list supports infinite scroll using Apollo Client's `fetchMore`.
- The cache is updated to merge new tasks and prevent duplicates.

---

## 🧪 Testing & Development

- All components are modular and reusable.
- Use the provided context hooks for state management.
- The app is optimized for mobile and Telegram WebView.

---

## 📝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -am 'Add foo'`)
4. Push to the branch (`git push origin feature/foo`)
5. Create a new Pull Request

---

## 📄 License

MIT
