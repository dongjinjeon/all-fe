import { createContext } from "react";
import { useWebnovel } from "@hooks/useWebnovel";

export const WebnovelContext = createContext<ReturnType<typeof useWebnovel>>(
  {} as ReturnType<typeof useWebnovel>
);
