import { createContext } from "react";
import { usePayments } from "@hooks/usePayments";

export const PaymentContext = createContext<ReturnType<typeof usePayments>>(
  {} as ReturnType<typeof usePayments>
);
