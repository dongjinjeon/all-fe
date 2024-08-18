import api from "./api";

export const webnovelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 오늘만 무료
    getTodayFreeWebnovel: builder.mutation<any, TReqWebnovel>({
      query: (body) => ({
        url: `/v1/client/novel/today-free/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data?.list;
      },
    }),

    // 인기 추천
    getPopularWebnovel: builder.mutation<any, TReqWebtoon>({
      query: (body) => ({
        url: `/v1/client/novel/popular/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data?.list;
      },
    }),

    // 도전 밀리언
    getMillionWebnovel: builder.mutation<any, TReqWebtoon>({
      query: (body) => ({
        url: `/v1/client/novel/challenge/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data?.list;
      },
    }),

    // 신규 웹툰
    getNewWebnovel: builder.mutation<any, TReqWebtoon>({
      query: (body) => ({
        url: `/v1/client/novel/new/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        let data = rawResult.data?.list.map((item: any) => {
          return { ...item, thumbnails: { thumbnail: item.thumbnail } };
        });
        return data;
      },
    }),

    searchWebnovel: builder.mutation<any, TReqSearchWebtoon>({
      query: (body) => ({
        url: `/v1/client/webnovel/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        let data = rawResult.data?.data?.list.map((item: any) => {
          return {
            ...item,
            thumbnails: { thumbnail: item.thumbnail.hl },
            webtoon_id: item.id!,
          };
        });
        return data;
      },
    }),

    getWebnovelDetail: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/webnovel/detail`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data?.data;
      },
    }),

    getWebnovelCuts: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/webnovel/episode/cuts/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),

    getWebnovelEpisodes: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/webnovel/episode/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
  }),
});

export const {
  useGetTodayFreeWebnovelMutation,
  useGetMillionWebnovelMutation,
  useGetNewWebnovelMutation,
  useGetPopularWebnovelMutation,
  useSearchWebnovelMutation,
  useGetWebnovelCutsMutation,
  useGetWebnovelDetailMutation,
  useGetWebnovelEpisodesMutation,
} = webnovelApi;
