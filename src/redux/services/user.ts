import api from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 오늘만 무료
    login: builder.mutation<any, TReqLogin>({
      query: (body) => ({
        url: `/v1/client/web-site/signin`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    setFavorite: builder.mutation<any, { WebtoonID: number, token: any }>({ // 관심 웹툰 등록 및 해제
      query: ({ WebtoonID, token }) => ({
        url: `/v1/client/web-site/webtoon/recommended/register`,
        method: "POST",
        body: {
          WebtoonID: Number(WebtoonID),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getFavorite: builder.mutation<any, { page: number, count: number, sort?: string, token: any }>({ // 유저 관심 웹툰 목록 조회
      query: ({ page, count, sort = 'desc', token }) => ({
        url: `/v1/client/web-site/webtoon/recommended/search`,
        method: "POST",
        body: {
          page: page,
          count: count,
          sort: sort,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.lists;
      },
    }),
    setFavoriteWebnovel: builder.mutation<any, { NovelID: number, token: any }>({ // 관심 웹소설 등록 및 해제
      query: ({ NovelID, token }) => ({
        url: `/v1/client/web-site/novel/recommended/register`,
        method: "POST",
        body: {
          NovelID: Number(NovelID),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getFavoriteWebnovel: builder.mutation<any, { page: number, count: number, sort?: string, token: any }>({ // 유저 관심 웹소설 목록 조회
      query: ({ page, count, sort = 'desc', token }) => ({
        url: `/v1/client/web-site/novel/recommended/search`,
        method: "POST",
        body: {
          page: page,
          count: count,
          sort: sort,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.lists;
      },
    }),
    getRecentView: builder.mutation<any, { page: number, count: number, sort: string, ContentType?: number, IsValid: number, token: any, }>({ //유저 최근 본 작품 목록 조회
      query: ({ page, count, sort = 'desc', ContentType, IsValid, token }) => {
        const body = ContentType !== undefined ? {
          page,
          count,
          sort,
          IsValid,
          ContentType
        } : {
          page,
          count,
          sort,
          IsValid
        };

        return {
          url: `/v1/client/web-site/account/recent-view/search`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.list;
      },
    }),
    getUserProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/profile`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    getUserSession: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/session`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    validateUserSession: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/validate`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    getUserSessionProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/auth/profile`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data;
      },
    }),
    buyContent: builder.mutation<any, { ID: number, EpisodeID: string, ContentType: number, PurchaseType: number, token: any }>({ // 웹툰 소장 및 대여
      query: ({ ID, EpisodeID, ContentType, PurchaseType, token }) => ({
        url: `/v1/client/web-site/buy/register`,
        method: "POST",
        body: {
          ID: ID,
          EpisodeID: EpisodeID,
          ContentType: ContentType,
          PurchaseType: PurchaseType,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getBought: builder.mutation<any, { page: number, count: number, sort: string, ContentType?: number, token: any }>({ // 유저 웹툰 및 웹소설 구매/대여 목록 조회
      query: ({ page, count, sort, ContentType, token }) => {
        const body = ContentType !== undefined ? {
          page,
          count,
          sort,
          ContentType
        } : {
          page,
          count,
          sort,
        };

        return {
          url: `/v1/client/web-site/buy/all-search`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.data;
      },
    }),
    registerQuestion: builder.mutation<any, { Title: string, Content: string, Category: string, token: any }>({ // 질문 등록
      query: ({ Title, Content, Category, token }) => {
        return {
          url: `/v1/client/web-site/ask/register`,
          method: "POST",
          body: {
            Title: Title,
            Content: Content,
            Category: Category,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getQuestion: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/web-site/ask/detail`,
        method: "POST",
        body: {
          ...body,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getQuestionList: builder.mutation<any, { page: number, count: number, token: any }>({ // 질문 목록 조회
      query: ({ page, count, token }) => {
        return {
          url: `/v1/client/web-site/ask/search`,
          method: "POST",
          body: {
            page: page,
            count: count,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.asks;
      },
    }),
    getChargeLog: builder.mutation<any, { page: number, count: number, token: any }>({ // 유저 결제내역 조회
      query: ({ page, count, token }) => {
        return {
          url: `/v1/client/web-site/payment/detail`,
          method: "POST",
          body: {
            page: page,
            count: count,
            sort: "desc",
            country: "ko"
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      transformResponse: (rawResult: any, meta) => {
        return rawResult.data.data.list;
      },
    }),
    buyAllContent: builder.mutation<any, { contentId: number, ContentType: number, token: any }>({ // 전체 구매
      query: ({ contentId, ContentType, token }) => ({
        url: `/v1/client/buy-all/register`,
        method: "POST",
        body: {
          ID: contentId,
          ContentType: ContentType,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getUserBuyDetail: builder.mutation<any, { contentId: number, ContentType: number, token: any }>({ // 웹툰 전체 구매 정보 조회
      query: ({ contentId, ContentType, token }) => ({
        url: `/v1/client/web-site/buy/user/detail`,
        method: "POST",
        body: {
          ID: contentId,
          ContentType: ContentType,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getUserHistory: builder.mutation<any, { page: number, count: number, sort: string, token: any }>({ // 웹툰/웹소설 사용내역 목록 조회
      query: ({ page, count, sort, token }) => ({
        url: `/v1/client/web-site/buy/search`,
        method: "POST",
        body: {
          page: page,
          count: count,
          sort: sort,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSetFavoriteMutation, // 관심 웹툰 등록 및 해제
  useGetFavoriteMutation,// 유저 관심 웹툰 목록 조회
  useSetFavoriteWebnovelMutation,// 관심 웹소설 등록 및 해제
  useGetFavoriteWebnovelMutation,  // 유저 관심 웹소설 목록 조회
  useGetRecentViewMutation, //유저 최근 본 작품 목록 조회
  useGetUserProfileMutation,
  useGetUserSessionMutation,
  useValidateUserSessionMutation,
  useGetUserSessionProfileMutation,
  useBuyContentMutation, // 웹툰 소장 및 대여
  useGetBoughtMutation, // 유저 웹툰 및 웹소설 구매/대여 목록 조회
  useRegisterQuestionMutation, // 질문 등록
  useGetQuestionMutation,
  useGetQuestionListMutation, // 질문 목록 조회
  useGetChargeLogMutation, // 유저 결제내역 조회
  useBuyAllContentMutation, // 전체 구매
  useGetUserBuyDetailMutation, // 웹툰 전체 구매 정보 조회
  useGetUserHistoryMutation, // 웹툰/웹소설 사용내역 목록 조회
} = userApi;
