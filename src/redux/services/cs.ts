import api from "./api";

export const csApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 오늘만 무료
    getNotices: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/notice/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.asks;
      },
    }),
    getFAQ: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/qna/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.list;
      },
    }),
  }),
});

export const { useGetNoticesMutation, useGetFAQMutation } = csApi;
