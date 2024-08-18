import { LanguageContext } from "@context/LanguageContext";
import { UserContext } from "@context/UserContext";
import { useLanguage } from "@hooks/useLanguage";
import { usePayments } from "@hooks/usePayments";
import { useUser } from "@hooks/useUser";
import { Apple } from "@pages/common/Apple";
import { Charged } from "@pages/common/Charged";
import { Complete } from "@pages/common/Complete";
import { CS } from "@pages/common/CS";
import { Download } from "@pages/common/Download";
import { Fail } from "@pages/common/Fail";
import { Favorite } from "@pages/common/Favorite";
import { KaKao } from "@pages/common/KaKao";
import { Login } from "@pages/common/Login";
import { MyPage } from "@pages/common/MyPage";
import { Payments } from "@pages/common/Payments";
import { Used } from "@pages/common/Used";
import { OfferWall } from "@pages/etc/OfferWall";
import { Webnovel } from "@pages/webnovel";
import { Webtoon } from "@pages/webtoon";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { PaymentContext } from "@context/PaymentContext";
import { Landing } from "@pages/etc/Landing";


function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <LanguageContext.Provider value={useLanguage()}>
          <UserContext.Provider value={useUser()}>
            <PaymentContext.Provider value={usePayments()}>
              <GoogleOAuthProvider
                clientId={
                  "521458942937-52nf2mm3pos7pckgut4179dk63p1e1lg.apps.googleusercontent.com"
                }
              >
                <Routes>
                  {/* 기본 redirection 웹툰 */}
                  <Route path="/*" element={<Navigate to="webtoon"/>}/>
                  {/* 카카오로그인 리디렉션 */}
                  <Route path="/login/kakao" element={<KaKao/>}/>
                  <Route path="/apple-login" element={<Apple/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/payments" element={<Payments/>}/>
                  <Route path="/payments/complete" element={<Complete/>}/>
                  <Route path="/payments/fail" element={<Fail/>}/>
                  {/* QR코드 리다이렉션 */}
                  <Route path="/download" element={<Download/>}/>
                  {/* 내 정보 */}
                  <Route path="/me">
                    <Route path="" element={<MyPage/>}/>
                    <Route path="used/*" element={<Used/>}/>
                    <Route path="charged/*" element={<Charged/>}/>
                    {/* 고객센터 */}
                    <Route path="cs/*" element={<CS/>}/>
                  </Route>
                  <Route path="/favorite/*" element={<Favorite/>}/>
                  <Route path="/recent/*" element={<Favorite/>}/>
                  <Route path="/buylog/*" element={<Favorite/>}/>
                  <Route path="/webtoon/*" element={<Webtoon/>}/>
                  <Route path="/webnovel/*" element={<Webnovel/>}/>
                  <Route
                    path="/app-ads.txt"
                    element={
                      <div>
                        google.com, pub-4367792049321894, DIRECT, f08c47fec0942fa0
                      </div>
                    }
                  />
                  <Route path="/offerwall" element={<OfferWall/>}/>
                  <Route path="/landing" element={<Landing/>}/>
                </Routes>
              </GoogleOAuthProvider>
            </PaymentContext.Provider>
          </UserContext.Provider>
        </LanguageContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
