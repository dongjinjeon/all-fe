import { createContext } from "react";
import { useLanguage } from "@hooks/useLanguage";

export const LanguageContext = createContext<ReturnType<typeof useLanguage>>(
  {} as ReturnType<typeof useLanguage>
);
