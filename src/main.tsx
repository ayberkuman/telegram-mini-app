import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { client } from "./apollo-client.ts";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { LanguageProvider } from "@/context/language-context";
import { TasksProvider } from "@/context/tasks-context.tsx";

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
