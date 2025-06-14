import { Provider as ChakraProvider } from "@/components/ui/provider";
import { LanguageProvider } from "@/context/language-context";
import { TasksProvider } from "@/context/tasks-context.tsx";
import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { client } from "./apollo-client.ts";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import App from "./App.tsx";
import "./i18n/i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TonConnectUIProvider
      manifestUrl={
        import.meta.env.DEV
          ? "http://localhost:5173/tonconnect.json"
          : "https://telegram-mini-app-c3cg.onrender.com/tonconnect.json"
      }
    >
      <ApolloProvider client={client}>
        <ChakraProvider>
          <LanguageProvider>
            <TasksProvider>
              <App />
            </TasksProvider>
          </LanguageProvider>
        </ChakraProvider>
      </ApolloProvider>
    </TonConnectUIProvider>
  </StrictMode>
);
