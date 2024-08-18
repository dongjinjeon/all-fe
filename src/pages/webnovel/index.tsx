import { Home } from "./pages/Home";
import { Listed } from "./pages/Listed";
import { Ranking } from "./pages/Ranking";
import { Detail } from "./pages/view/Detail";
import { Episode } from "./pages/view/Episode";
import { Search } from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import { Footer } from "@components/Footer";
import { useWebnovel } from "@hooks/useWebnovel";
import { WebnovelContext } from "@context/WebnovelContext";
import { useLocation } from "react-router-dom";
import { Detailed } from "./pages/Detailed";
import { useEffect } from "react";

export const Webnovel = () => {
  const location = useLocation();

  const webnovelControls = useWebnovel();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <WebnovelContext.Provider value={webnovelControls}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<Listed />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/detailed/:type" element={<Detailed />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/episodes/:id" element={<Detail />} />
          <Route path="/episodes/view/:id/:episode" element={<Episode />} />
        </Routes>
      </WebnovelContext.Provider>
      {!location.pathname.startsWith("/webtoon/episodes/view") && <Footer />}
    </div>
  );
};
