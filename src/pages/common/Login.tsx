import {ReactComponent as Logo} from "@svg/LogoColor.svg";
import {ReactComponent as AppleLogo} from "@svg/AppleLogo.svg";
import {useLogin} from "@hooks/useLogin";
import {Header} from "@components/Header";
import {Footer} from "@components/Footer";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useGoogleLogin} from "@react-oauth/google";
import {useState, useEffect, FormEvent} from "react";


import {GoogleLogin} from "@react-oauth/google";

import {useAppDispatch, useAppSelector} from "@store";
import {setUser} from "@features/common/globalUserSlice";
import * as jose from 'jose'

export const Login = () => {
  const dispatch = useAppDispatch();
  const {kakaoRequestUrl, googleLoginAlco, doLoginEmail} = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      let token = tokenResponse.access_token;
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          googleLoginAlco(data);
          // console.log('googleLoginAlco: ', data)
        });
    },
  });

  const {keeplogin} = useAppSelector(
    (state) => state.storage.local.globalUserSlice
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
        (email === 'webtoontv00@gmail.com' && password === 'webtoonTV6^')
        || (email === 'webtoonTv001@gmail.com' && password === 'remaindays!100')
    ) {
      doLoginEmail({ email, password: btoa(password).replace("==", ""), name: email, sub: email })
    } else {
      doLoginEmail({ email, password: btoa(password).replace("==", "") })
      setTimeout(() => alert("아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n" +
          "입력하신 내용을 다시 확인해주세요."), 500);
    }
  };

  return (
    <div>
      <div className="">
        <Header/>
      </div>
      <div className="mx-auto w-full flex justify-center py-32 font-notokr max-md:py-16">
        <div className="hidden max-md:flex flex-col gap-5 py-10 w-full px-4">
          {/*<img src="/logocolor.png" className="mx-auto my-10 max-md:my-0" />*/}
          {/**/}
          <form onSubmit={handleSubmit} className="bg-transparent">
            <div className="flex flex-col items-start justify-center mb-6">
              <label htmlFor="email" className="block text-base font-medium mb-2">이메일</label>
              <input
                type="email"
                name="email"
                placeholder={'이메일'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-alco-mint focus:ring-alco-mint"
              />
            </div>
            <div className="flex flex-col items-start justify-center mb-6">
              <label htmlFor="password" className="block text-base font-medium mb-2">패스워드</label>
              <input
                type="password"
                name="password"
                placeholder={'비밀번호'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-alco-mint focus:ring-alco-mint"
              />
            </div>
            <button
              type="submit"
              className="relative px-6 py-2 flex gap-2 hover:text-[#fff] hover:shadow transition duration-150 w-full flex justify-center items-center rounded-[100px] bg-alco-mint"
            >
              <span className="font-bold text-lg">로그인</span>
            </button>
          </form>
          {/**/}
          <div className="flex flex-row justify-center items-center text-2xl font-bold mx-auto">
            <p
              className="w-12 mr-auto"
              style={{border: "1px solid #D0D0D0"}}
            />
            <div className="flex flex-col">
              <div className="flex text-alco-mint flex-row justify-center">원클릭<span className="text-black">으로</span>
              </div>
              <div className="text-alco-mint"><span className="text-black">SNS</span>간편가입</div>
            </div>
            <p
              className="w-12 ml-auto"
              style={{border: "1px solid #D0D0D0"}}
            />
          </div>
          <div className="flex flex-col gap-5 px-8">
            <a
              className="relative px-6 py-2 flex gap-2 rounded-lg text-slate-700 hover:border-slate-400 hover:text-[#FEE500] hover:shadow transition duration-150 w-full flex justify-center items-center"
              style={{backgroundColor: "#FEE500", borderRadius: "100px"}}
              href={kakaoRequestUrl}
            >
              <img
                className="absolute w-6 h-6 left-6"
                src="/kakao.png"
                loading="lazy"
                alt="google logo"
              />
              <span className="font-bold text-lg">카카오로 로그인</span>
            </a>

            <button
              className="relative px-6 py-2 flex gap-2 rounded-lg text-slate-700 hover:border-slate-400 hover:text-[#F4F4F4] hover:shadow transition duration-150 w-full flex justify-center items-center"
              style={{background: "#F4F4F4", borderRadius: "100px"}}
              onClick={() => googleLogin()}
            >
              <img
                className="absolute w-6 h-6 left-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span className="font-bold text-lg">구글로 로그인</span>
            </button>

            {/*<button*/}
            {/*  className="relative px-6 py-2 bg-black text-white flex gap-2 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 w-full flex justify-center items-center rounded-[100px]"*/}
            {/*  onClick={(e) => {*/}
            {/*    const config = {*/}
            {/*      client_id: "org.allcomics.app", // This is the service ID we created.*/}
            {/*      redirect_uri: "https://app.allcomics.org/apple-login",*/}
            {/*      response_type: "code id_token",*/}
            {/*      state: "origin:web",*/}
            {/*      response_mode: "fragment",*/}
            {/*      use_popup: true,*/}
            {/*    };*/}
            {/*    const queryString = Object.entries(config)*/}
            {/*      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)*/}
            {/*      .join("&");*/}
            {/*    window.location.href = `https://appleid.apple.com/auth/authorize?${queryString}`;*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <AppleLogo className="absolute w-6 h-6 left-6 fill-white" />*/}
            {/*  <span className="font-bold text-lg">Apple로 로그인</span>*/}
            {/*</button>*/}
          </div>
          <div className="px-10">
            <div className="flex justify-start items-center flex-row gap-2 mb-3"
                 onClick={() => {
                   dispatch(setUser({keeplogin: !keeplogin}));
                 }}>
              <input
                type="checkbox"
                className="mr-1 w-5 h-5"
                checked={keeplogin}
                onChange={(event) => {
                  event.stopPropagation()
                }}
              />
              로그인 상태 유지
            </div>
            <div
              className="text-left text-sm"
              style={{fontWeight: "400", fontSize: "12px", color: "#757575"}}
            >
              <p>-회원 가입함으로서 이용약관에 동의합니다. </p>
              <p>-이용 중 도움이 필요하시면 [고객 지원] 페이지로, </p>
              <div className="flex flex-row">
                <p className="invisible">-</p>로그인에 문제가 있다면
                webtoontv@naver.com으로 문의해 주세요.
              </div>
            </div>
          </div>
        </div>
        {/**/}
        <div
          className="text-center gap-5 flex flex-col px-24 py-10 w-[38rem] max-md:hidden"
          style={{
            boxShadow: "0px 4px 10px 10px rgba(0, 0, 0, 0.05)",
            borderRadius: "20px",
          }}
        >
          {/**/}
          {/*<form onSubmit={handleSubmit} className="bg-transparent">*/}
          {/*  <div className="flex flex-col items-start justify-center mb-6">*/}
          {/*    <label htmlFor="email" className="block text-base font-medium mb-2">이메일</label>*/}
          {/*    <input*/}
          {/*      type="email"*/}
          {/*      id="email"*/}
          {/*      placeholder={'이메일'}*/}
          {/*      value={email}*/}
          {/*      onChange={(e) => setEmail(e.target.value)}*/}
          {/*      required*/}
          {/*      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-alco-mint focus:ring-alco-mint"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div className="flex flex-col items-start justify-center mb-6">*/}
          {/*    <label htmlFor="password" className="block text-base font-medium mb-2">패스워드</label>*/}
          {/*    <input*/}
          {/*      type="password"*/}
          {/*      id="password"*/}
          {/*      placeholder={'비밀번호'}*/}
          {/*      value={password}*/}
          {/*      onChange={(e) => setPassword(e.target.value)}*/}
          {/*      required*/}
          {/*      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-alco-mint focus:ring-alco-mint"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <button*/}
          {/*    type="submit"*/}
          {/*    className="relative px-6 py-2 flex gap-2 hover:text-[#fff] hover:shadow transition duration-150 w-full flex justify-center items-center rounded-[100px] bg-alco-mint"*/}
          {/*  >*/}
          {/*    <span className="font-bold text-lg">로그인</span>*/}
          {/*  </button>*/}
          {/*</form>*/}
          {/**/}
          {/*<img src="/logocolor.png" className="mx-auto my-10" />*/}
          <div className="flex flex-row justify-center items-center text-2xl font-bold">
            <p
              className="w-12 mr-auto"
              style={{border: "1px solid #D0D0D0"}}
            />
            <p className="text-alco-mint">원클릭</p>으로 SNS
            <p className="text-alco-mint">간편가입</p>
            <p
              className="w-12 ml-auto"
              style={{border: "1px solid #D0D0D0"}}
            />
          </div>
          <a
            className="relative px-6 py-2 flex gap-2 rounded-lg text-slate-700 hover:border-slate-400 hover:text-[#FEE500] hover:shadow transition duration-150 w-full flex justify-center items-center"
            style={{backgroundColor: "#FEE500", borderRadius: "100px"}}
            href={kakaoRequestUrl}
          >
            <img
              className="absolute w-6 h-6 left-6"
              src="/kakao.png"
              loading="lazy"
              alt="google logo"
            />
            <span className="font-bold text-lg">카카오로 로그인</span>
          </a>

          <button
            className="relative px-6 py-2 flex gap-2 rounded-lg text-slate-700 hover:border-slate-400 hover:text-[#F4F4F4] hover:shadow transition duration-150 w-full flex justify-center items-center"
            style={{background: "#F4F4F4", borderRadius: "100px"}}
            onClick={() => googleLogin()}
          >
            <img
              className="absolute w-6 h-6 left-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="font-bold text-lg">구글로 로그인</span>
          </button>

          {/*<button*/}
          {/*  className="relative px-6 py-2 bg-black text-white flex gap-2 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 w-full flex justify-center items-center"*/}
          {/*  style={{ borderRadius: "100px" }}*/}
          {/*  onClick={() => {*/}
          {/*    const config = {*/}
          {/*      client_id: "org.allcomics.app", // This is the service ID we created.*/}
          {/*      // redirect_uri: "https://app.allcomics.org/apple-login",*/}
          {/*      redirect_uri: "https://c866-39-115-94-135.ngrok-free.app/apple-login",*/}
          {/*      response_type: "code id_token",*/}
          {/*      state: "origin:web",*/}
          {/*      response_mode: "fragment",*/}
          {/*      m: 11,*/}
          {/*      v: "1.5.4",*/}
          {/*    };*/}
          {/*    const queryString = Object.entries(config)*/}
          {/*      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)*/}
          {/*      .join("&");*/}

          {/*    window.location.href = `https://appleid.apple.com/auth/authorize?${queryString}`;*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <AppleLogo className="absolute w-6 h-6 left-6 fill-white" />*/}
          {/*  <span className="font-bold text-lg">Apple로 로그인</span>*/}
          {/*</button>*/}
          <div className="px-2">
            <div className="flex justify-start items-center flex-row gap-2 mb-3"
                 onClick={() => {
                   dispatch(setUser({keeplogin: !keeplogin}));
                 }}>
              <input
                type="checkbox"
                className="mr-1 w-5 h-5"
                checked={keeplogin}
                onChange={(event) => {
                  event.stopPropagation()
                }}
              />
              로그인 상태 유지
            </div>
            <div
              className="text-left text-sm"
              style={{fontWeight: "400", fontSize: "12px", color: "#757575"}}
            >
              <p>-회원 가입함으로서 이용약관에 동의합니다. </p>
              <p>-이용 중 도움이 필요하시면 [고객 지원] 페이지로, </p>
              <div className="flex flex-row">
                <p className="invisible">-</p>로그인에 문제가 있다면
                webtoontv@naver.com으로 문의해 주세요.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
