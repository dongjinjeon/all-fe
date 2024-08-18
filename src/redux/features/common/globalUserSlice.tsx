import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGlobalUserState {
  name?: string;
  userId?: number;
  email?: string;
  token?: string;
  session_token?: string;
  balance?: number;
  login?: string;
  keeplogin?: boolean;
}

const initialState: IGlobalUserState = {
  userId: -1,
  name: "",
  email: "",
  token: "",
  session_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjotMSwidXNlcl9pcCI6IjIwMDE6MmQ4OmU3MjA6ZDk3ZjplY2I5OjYwNmQ6YmMzNzoyOGI4IiwidmFsaWRGcm9tIjoiMjAyNC0wNC0yMiAxNDowMzo0MSBLU1QiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTIyIDE0OjAzOjQxIEtTVCIsImV4cGlyZWRBdCI6IjIwMjQtMDQtMjIgMTQ6MTM6NDEgS1NUIiwidGltZXpvbmUiOiJBc2lhL1Nlb3VsIn0.GobIvGdgv-48yxbPvfJu9kaOaMKqkxhYZbMg4LwSUPA",
  balance: 0,
  login: "",
  keeplogin: false,
};

const globalUserSlice = createSlice({
  name: "globalUxctrl",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IGlobalUserState>) {
      // replace, but if null, keep the old value
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setUser } = globalUserSlice.actions;

export default globalUserSlice.reducer;
