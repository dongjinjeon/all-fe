import { createContext } from "react";
import { useUser } from "@hooks/useUser";

export const UserContext = createContext<ReturnType<typeof useUser>>(
  {} as ReturnType<typeof useUser>
);
