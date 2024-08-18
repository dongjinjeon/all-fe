import {useContext, useEffect, useState} from "react";
import {
  usePrepareMutation,
  usePaymentsConfirmMutation,
  useGetChargeListMutation,
} from "@services/payments";
import {useAppDispatch, useAppSelector} from "@store";
import {setUser} from "@features/common/globalUserSlice";

export const usePayments = () => {
  const dispatch = useAppDispatch();

  const {userId, name, token, email, login, session_token} = useAppSelector(
    (state) => {
      return state.storage.session.globalUserSlice;
    }
  );
  const {
    userId: userIdLocal,
    name: nameLocal,
    token: tokenLocal,
    email: emailLocal,
    login: loginLocal,
    session_token: session_token_local,
  } = useAppSelector((state) => {
    return state.storage.local.globalUserSlice;
  });

  const [preparePayment, {data: preparePaymentData}] = usePrepareMutation();
  const [confirmPayment, {data: confirmPaymentData}] = usePaymentsConfirmMutation();
  const [getChargeList, {data: getChargeListData}] = useGetChargeListMutation();

  const executeGetChargeList = async () => {
    if (userId && userId > -1) {
      let data = (await getChargeList({
        page: 1,
        count: 6,
        language: "ko",
        os: "ios",
      })) as any;
      return data
    } else {
      return -1
    }
  };

  const executePreparePayment = async (
    props_session_token: any,
    productId: number
  ) => {
    if (userId && userId > -1) {
      let data = (await preparePayment({
        token: props_session_token,
        productId: productId,
      })) as any;
      return data;
    } else {
      return -1
    }
  };

  const executeConfirmPayment = async (
    props_session_token: any,
    paymentKey: string,
    orderId: string,
    amount: number,
  ) => {
    if (userId && userId > -1) {
      let data = (await confirmPayment({
        token: props_session_token,
        paymentKey: paymentKey,
        orderId: orderId,
        amount: amount,
      })) as any;
      return data;
    } else {
      return -1
    }
  };

  return {
    executeGetChargeList,
    executePreparePayment,
    executeConfirmPayment,
  };
};
