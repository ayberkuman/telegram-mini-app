import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n";
import { client } from "./apollo.ts";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { LanguageProvider } from "@/context/language-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>
);
