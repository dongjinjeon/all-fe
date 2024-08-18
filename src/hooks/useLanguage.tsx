import { useState } from "react";

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<
    "ko" | "en" | "id" | "es"
  >("ko");

  return { currentLanguage, setCurrentLanguage };
};
