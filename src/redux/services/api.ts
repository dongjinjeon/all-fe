import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./base";

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
const api = createApi({
  reducerPath: "splitApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Favorites"],
  endpoints: (build) => ({}),
});

export default api;
