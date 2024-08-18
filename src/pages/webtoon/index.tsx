import { Home } from "./pages/Home";
import { Listed } from "./pages/Listed";
import { Ranking } from "./pages/Ranking";
import { Detail } from "./pages/view/Detail";
import { Episode } from "./pages/view/Episode";
import { Detailed } from "./pages/Detailed";
import { Search } from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import { Footer } from "@components/Footer";
import { useWebtoon } from "@hooks/useWebtoon";
import { WebtoonContext } from "@context/WebtoonContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Webtoon = () => {
  const location = useLocation();

  const webtoonControls = useWebtoon();

  useEffect(() => {
    const loginFailed = sessionStorage.getItem('allcomicsAppleloginFailed');
    if(loginFailed) {
      alert('로그인에 실패 했습니다.')
      sessionStorage.removeItem('allcomicsAppleloginFailed')
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <WebtoonContext.Provider value={webtoonControls}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<Listed />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/detailed/:type" element={<Detailed />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/episodes/:id" element={<Detail />} />
          <Route path="/episodes/view/:id/:episode" element={<Episode />} />
        </Routes>
      </WebtoonContext.Provider>
      <div className="h-24" />
      {!location.pathname.startsWith("/webtoon/episodes/view") && <Footer />}
    </div>
  );
};
