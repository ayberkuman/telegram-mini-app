import { Provider as ChakraProvider } from "@/components/ui/provider";
import { LanguageProvider } from "@/context/language-context";
import { TasksProvider } from "@/context/tasks-context.tsx";
import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { client } from "./apollo-client.ts";
import App from "./App.tsx";
import "./i18n/i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <LanguageProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </LanguageProvider>
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>
);
