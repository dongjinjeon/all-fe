import { createContext } from "react";

interface UserContextType {
  userId: number | undefined;
  userName: string | undefined;
  session_token: string | undefined;
  favoriteWebtoonData: any;
  favoriteWebnovelData: any;
  recentViewWebtoonData: any;
  login: string | undefined;
  buylog: any;
  chargeHistory: (page: number, count: number, sort: string, session_token: string) => Promise<any>;
  userHistory: (page: number, count: number, sort: string, props_session_token: any) => Promise<any>;
  logout: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buyAllRemainContent: any;
  userBuyDetail: any;
  buyWebtoon: any;
  buyWebnovel: any;
  questionListData: any;
  registerQuestion: any;
  getFavorite: any;
  getFavoriteWebnovel: any;
  getRecentView: any;
  currentLanguage: string;
  recentViewCnt: number;
  favoriteCnt: number;
  getBought: any;
  boughtCnt: number;
  getUserSessionProfile: any;
  userSessionData: any;
}

export const UserContext = createContext<UserContextType>({
  userId: undefined,
  userName: undefined,
  session_token: undefined,
  favoriteWebtoonData: null,
  favoriteWebnovelData: null,
  recentViewWebtoonData: null,
  login: undefined,
  buylog: null,
  chargeHistory: async () => {},
  userHistory: async () => {},
  logout: () => {},
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
  buyAllRemainContent: null,
  userBuyDetail: null,
  buyWebtoon: null,
  buyWebnovel: null,
  questionListData: null,
  registerQuestion: null,
  getFavorite: null,
  getFavoriteWebnovel: null,
  getRecentView: null,
  currentLanguage: '',
  recentViewCnt: 0,
  favoriteCnt: 0,
  getBought: null,
  boughtCnt: 0,
  getUserSessionProfile: null,
  userSessionData: null,
});
