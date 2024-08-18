import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { RootState } from "@store";
// import { logout } from "@features/user/userSlice";
// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL + "/",
  prepareHeaders: (headers, { getState }) => {
    const token = "";
    if (token != null) {
    }
    return headers;
  },
  mode: "cors",
});

const customBaseQuery: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    //api.dispatch(clearAuth());
  }
  return result;
};

export default customBaseQuery;
