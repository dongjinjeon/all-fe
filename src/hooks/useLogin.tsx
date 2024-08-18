import { useEffect, useState } from "react";
import { useLoginMutation } from "@services/user";
import { useAppDispatch, useAppSelector } from "@store";
import { setUser } from "@features/common/globalUserSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  useGetUserSessionMutation,
} from "@services/user";

interface MyTokenPayload {
  email?: string;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const KaKaoKey = process.env.REACT_APP_KAKAO_KEY;
  const KaKaoRedirectURL = `${window.location.origin}${process.env.REACT_APP_KAKAO_REDIRECT}`;

  const [ip, setIp] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<string>("");

  const { userId } = useAppSelector(
    (state) => state.storage.session.globalUserSlice
  );

  const navigate = useNavigate();

  const [login, { data, isError }] = useLoginMutation();

  const [getUserSession, { data: userSessionData }] =
    useGetUserSessionMutation();

  useEffect(() => {
    // get my ip using fetch to api.ipify.org
    fetch("https://geolocation-db.com/json/")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setIp(res.IPv4);
      });
  }, []);

  useEffect(() => {
    if (!data) return;
    getSession(data).then((returnedData) => {
      dispatch(
        setUser({
          name: data.user_name,
          userId: data.user_id,
          email: data.user_email,
          token: data.user_token,
          session_token: returnedData.data.session_token,
          login: loginMethod,
        })
      );
      if (loginMethod !== 'apple') {
        window.location.href = "/";
      }
    });
  }, [data, loginMethod]);

  const getSession = async (data: any) => {
    let temp = (await getUserSession({
      user_id: data.user_id,
      ip_addr: ip
    })) as any;
    return temp;
  };

  const getKakaoUserToken = async (code: string) => {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KaKaoKey!,
        redirect_uri: KaKaoRedirectURL!,
        code: code,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        getKakaoUserInfo(res.access_token);
      });
  };

  const getKakaoUserInfo = async (token: string) => {
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('getKakaoUserInfo res: ', res);
        login({
          user_email: res.kakao_account.email ? res.kakao_account.email : "",
          user_name: res.kakao_account.profile.nickname
            ? res.kakao_account.profile.nickname
            : "",
          account_id: res.id + "",
          provider: "kakao",
          user_country: "ko",
          ip_addr: "0"
        });
        setLoginMethod("kakao");
      });
  };

  const googleLoginAlco = (dat: any) => {
    login({
      user_email: dat.email!,
      user_name: dat.name!,
      account_id: dat.sub!,
      provider: "google",
      user_country: "ko",
      ip_addr: "0"
    });
    setLoginMethod("google");
  };

  const doLoginEmail = (dat: any) => {
    login({
      user_email: dat.email!,
      password: dat.password!,
      user_name: dat.name!,
      account_id: dat.sub!,
      provider: "google",
      user_country: "ko",
      ip_addr: "0"
    });
    setLoginMethod("google");
  };

  const getAppleUser = async (code: string, id_token: string) => {
    setLoginMethod("apple");
    const decodedToken: MyTokenPayload = jwtDecode(id_token);
    console.log(' decodedToken.email :',  decodedToken.email, undefined);
    console.log('decodedToken; ', decodedToken);
    if( decodedToken.email !== undefined) {
      const username = decodedToken.email?.split('@')[0] + '@privaterelay.appleid.com';
      login({
        user_email: decodedToken.email ? decodedToken.email : "",
        user_name: decodedToken.email ? username! : "",
        account_id: decodedToken.email ? username! : "",
        provider: "apple",
        user_country: "ko",
        ip_addr: "0"
      });
    } else {
      sessionStorage.setItem('allcomicsAppleloginFailed', 'true')
    }
  };

  return {
    kakaoRequestUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${KaKaoKey}&redirect_uri=${KaKaoRedirectURL}&response_type=code`,
    getKakaoUserToken,
    googleLoginAlco,
    getAppleUser,
    doLoginEmail
  };
};
