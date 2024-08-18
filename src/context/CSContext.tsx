import { createContext } from "react";
import { useCS } from "@hooks/useCS";

export const CSContext = createContext<ReturnType<typeof useCS>>(
  {} as ReturnType<typeof useCS>
);
