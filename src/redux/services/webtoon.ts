import api from "./api";

export const webtoonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 오늘만 무료
    getTodayFreeWebtoon: builder.mutation<any, TReqWebtoon>({
      query: (body) => ({
        url: `/v1/client/webtoon/today-free/search`,
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
    getPopularWebtoon: builder.mutation<any, TReqWebtoon>({
      query: (body) => ({
        url: `/v1/client/webtoon/popular/search`,
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
    getMillionWebtoon: builder.mutation<any, TReqWebtoon>({
      query: (body) => ({
        url: `/v1/client/webtoon/challenge/search`,
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
    getNewWebtoon: builder.mutation<any, TReqWebtoon>({
      query: (body) => ({
        url: `/v1/client/webtoon/new/search`,
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

    // 웹툰 검색
    searchWebtoon: builder.mutation<any, TReqSearchWebtoon>({
      query: (body) => ({
        url: `/v1/client/webtoon/search`,
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

    getBanner: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/banner/search`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data?.data?.banner;
      },
    }),

    getWebtoonDetail: builder.mutation<any, { id: String, token: any }>({ // 웹툰 상세조회
      query: ({ id, token }) => ({
        url: `v1/client/web-site/webtoon/detail`,
        method: "POST",
        body: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data?.data;
      },
    }),

    getWebtoonCuts: builder.mutation<any, { episode_id: String, UserID: number, token: any }>({ // 웹툰 에피소드 컷 조회
      query: ({ episode_id, UserID, token }) => ({
        url: `/v1/client/web-site/webtoon/episode/cuts/search`,
        method: "POST",
        body: {
          episode_id: episode_id,
          UserID: UserID,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),

    getWebtoonEpisodes: builder.mutation<any, { id: String, page: Number, limit: Number, sort: String, token: any }>({ //웹툰 에피소드 조회
      query: ({ id, page, limit, sort = 'asc', token }) => ({
        url: `/v1/client/web-site/webtoon/episode/search`,
        method: "POST",
        body: {
          id: id,
          page: page,
          limit: limit,
          sort: sort,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
  }),
});

export const {
  useGetTodayFreeWebtoonMutation,
  useGetPopularWebtoonMutation,
  useGetMillionWebtoonMutation,
  useGetNewWebtoonMutation,
  useGetBannerMutation,
  useSearchWebtoonMutation,
  useGetWebtoonDetailMutation,
  useGetWebtoonCutsMutation, // 웹툰 에피소드 컷 조회
  useGetWebtoonEpisodesMutation, //웹툰 에피소드 조회
} = webtoonApi;
