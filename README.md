Project Description
The goal is to create a Telegram Mini App — a simple To-Do Board — that runs within a WebView in Telegram. The application should:

Fetch a list of tasks via a GraphQL API.
Subscribe to real-time changes (task creation/update/deletion).
Allow the user to:
View the current status of tasks (PENDING / IN_PROGRESS / DONE).
Add a new task.
Change a task's status.
Delete a task.
Support dark and light themes.
Look correct on mobile devices.
Stack:

React + TypeScript
Apollo Client (HTTP + WebSocket) + GraphQL
Chakra UI + Emotion
React Router
Telegram Mini App SDK
GraphQL Code Generator
React Context Provider
Assignment Requirements

1. Environment and Build
   Initialize the project using Create React App (or Vite) with TypeScript support.
   Use Yarn for dependency and script management.
   Quick start: yarn install && yarn start.
   Specify the following dependencies in package.json:
   "react": "^18.0.0"
   "@apollo/client": "^3.6.9"
   "i18next" and "react-i18next" for localization.
   "framer-motion" for animations.
   "@lottiefiles/lottie-player" for Lottie animations.
2. Working with GraphQL and Cache
   Configure Apollo Client with HTTP-link and WebSocket-link for subscriptions.
   Maintain a single source of truth in the application using Apollo Cache:
   Configure and manage the normalized cache (typePolicies, field policies).
   Ensure data consistency when performing operations and subscriptions.
   Add support for dynamic loading of the task list on scroll using fetchMore (Apollo Client) and correct Apollo Cache updates.
   Use Apollo Reactive Variables (reactive vars) for local state (e.g., theme, filters) and their integration with Apollo Cache.
   Implement operations:
   Query for a list of tasks with the ability to pass filtering and sorting parameters (status, sortBy).
   Mutation for creating/updating/deleting a task.
   Subscription for creation/update/deletion events.
   GraphQL Codegen Setup:
   Add and configure graphql-codegen (e.g., via codegen.yml) to generate typed hooks (useTasksQuery, useAddTaskMutation, etc.) based on the schema and operations.
   Provide an example of using generated hooks in components.
   Mandatory use of generated GraphQL types (types, interfaces, and hooks) throughout the entire codebase to ensure full type safety.
   Example GraphQL Schema (can be emulated locally or use a public server):

GraphQL

type Task {
id: ID!
title: String!
status: String! # "PENDING" | "IN_PROGRESS" | "DONE"
}

type Query {
tasks(status: String, sortBy: String): [Task!]!
}

type Mutation {
addTask(title: String!): Task!
updateTask(id: ID!, status: String!): Task!
deleteTask(id: ID!): ID!
}

type Subscription {
taskAdded: Task!
taskUpdated: Task!
taskDeleted: ID!
} 3. Routing and State
React Router:
Configure routes:
/ — task list.
/tasks/:taskId — task details page.
For the task list, ensure passing GET parameters:
?status=IN_PROGRESS&sortBy=title
When changing sorting or filtering, update the URL.
When reloading the page, read parameters and display the filtered/sorted list.
React Context Provider:
Create a context (e.g., TasksContext or ThemeContext) for storing and passing global state.
Show an example of useContext usage in the application. 4. UI and Styling
Use Chakra UI and @emotion/react for components:
Basic elements: Box, Flex, Button, Input, Select, etc.
Responsive grid or list of task cards.
Color highlighting for statuses.
Theme switcher (save to localStorage).
Use framer-motion for element animations (smooth transitions when adding/deleting tasks, opening modals, etc.).
Display a Lottie animation in the interface (e.g., upon successful task addition) using react-lottie or lottie-react.
Use Alert and AlertIcon components from Chakra UI to display API errors (request, subscription, mutation errors). 5. Integration with Telegram Mini App SDK and TON Connect
Use the @telegram-apps/sdk package for initialization and interaction with the WebApp API instead of directly calling window.Telegram.WebApp.

Initialize the SDK:

TypeScript

import { WebApp, HapticFeedback } from '@telegram-apps/sdk';
WebApp.init();
Use WebApp.themeParams for header styling.

When pressing the "Add Task" button, use WebApp.MainButton or WebApp.openLink().

Handle the WebApp.onClose() event for correct WebView closure.

Haptic feedback: call HapticFeedback.impactOccurred('light') or other HapticFeedback methods upon interface interaction.

TON Connect Integration
Connect @tonconnect/sdk and @tonconnect/ui-react.
Implement a "Log in with Wallet" button.
Display the user's current address after connection.
Save the address via Apollo Reactive Variable or context.
If necessary, use the address in GraphQL queries or authorization logic.
This section was duplicated in the original prompt. Keep the first part. 6. Code Organization and Documentation
Folder structure: by features or atomic design.
Reusable components and hooks.
README.md:
Launch instructions.
Architecture description.
Examples of GraphQL queries and using generated hooks. 7. Localization
Configure i18next with namespace support for different parts of the application.
Configure i18next and react-i18next, ensure language switching and loading translations by namespace.
Use the useTranslation hook to access translations in components. 8. Performance and SPA
Implement the application as an SPA (Single Page Application) without full page reloads on navigation.
Optimize React renders: use React.memo, useCallback, useMemo, and other techniques to eliminate unnecessary re-renders.
Evaluate performance: measure initial load time, FPS when scrolling the task list, response time to user actions, and provide a brief report with recommendations.
Evaluation Criteria
| Criterion | Description ```
type Task {
id: ID!
title: String!
status: String! # "PENDING" | "IN_PROGRESS" | "DONE"
}

type Query {
tasks(status: String, sortBy: String): [Task!]!
}

type Mutation {
addTask(title: String!): Task!
updateTask(id: ID!, status: String!): Task!
deleteTask(id: ID!): ID!
}

type Subscription {
taskAdded: Task!
taskUpdated: Task!
taskDeleted: ID!
}
# telegram-mini-app
