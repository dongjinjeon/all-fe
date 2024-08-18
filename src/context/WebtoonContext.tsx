import { createContext } from "react";
import { useWebtoon } from "@hooks/useWebtoon";

export const WebtoonContext = createContext<ReturnType<typeof useWebtoon>>(
  {} as ReturnType<typeof useWebtoon>
);
