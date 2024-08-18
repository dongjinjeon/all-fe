import api from "./api";

export const paymentsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    prepare: builder.mutation<any, { token: string, productId: number }>({
      query: ({token, productId}) => ({
        url: `/v1/client/web-site/payment/prepare`,
        method: "POST",
        body: {
          productId: productId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    paymentsConfirm: builder.mutation<any, { token: string, paymentKey: string, orderId: string, amount: number }>({
      query: ({token, paymentKey, orderId, amount}) => ({
        url: `/v1/client/web-site/payment/confirm`,
        method: "POST",
        body: {
          paymentKey: paymentKey,
          orderId: orderId,
          amount: amount,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }),
      transformResponse: (rawResult: any, meta) => {
        return rawResult;
      },
    }),
    getChargeList: builder.mutation<any, any>({
      query: (body) => ({
        url: `/v1/client/charge/search`,
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
  usePrepareMutation,
  usePaymentsConfirmMutation,
  useGetChargeListMutation,
} = paymentsAPI;
