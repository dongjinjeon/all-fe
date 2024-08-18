import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import CarouselList from "@components/CarouselList";
import { useContext, useEffect, useState } from "react";
import { WebtoonContext } from "@context/WebtoonContext";
import { UserContext } from "@context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StarBlack } from "@svg/StarBlack.svg";
import { ReactComponent as Card } from "@svg/Card.svg";
import { ReactComponent as QuestionCircle } from "@svg/QuestionCircle.svg";
import { ReactComponent as Bell } from "@svg/Bell.svg";
import { ReactComponent as CoinStack } from "@svg/CoinStack.svg";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@store";
import { Loading } from "@components/Loading";
import NotificationPopup from "@components/Popup/NotificationPopup";
import {ReactComponent as AppleLogo} from "@svg/AppleLogo.svg";

export const MyPage = () => {
  const { balance } = useAppSelector(
    (state) => state.storage.session.globalUserSlice
  );

  const { searchResultWebtoons, searchWebtoonByKeyword } =
    useContext(WebtoonContext);
  const {
    recentViewWebtoonData,
    favoriteWebtoonData,
    getRecentView,
    getBought,
    buylog,
    userId,
    userName,
    currentLanguage,
    login,
    logout,
    getUserSessionProfile,
    userSessionData,
    session_token,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const { keyword } = useParams();
  const { t } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const [buyLogLoading, setBuyLogLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);
  const [expiredPopup, setExpiredPopup] = useState(false);

  useEffect(() => {
    if (keyword) searchWebtoonByKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(()=>{
    fetchRecentView();
    fetchBought();
    if (session_token) {
      getUserSessionProfile({ session_token: session_token });
    }
  },[]);

  const fetchBought = async () => {
    try {
      await getBought({
        page: 1,
        count: 10,
        sort: "desc",
        token: session_token,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setBuyLogLoading(false);
    }
  };

  const fetchRecentView = async () => {
    try {
      await getRecentView({
        page: 1,
        count: 10,
        token: session_token,
        IsValid: 0,
        sort: "desc",
      })
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRecentLoading(false);
    }
  };

  useEffect(() => {
    if (userId && userId <= -1) navigate("/login");
  }, []);

  return (
    <div className="h-full">
      {expiredPopup ? <NotificationPopup isOpen={expiredPopup} setIsOpen={setExpiredPopup} text={'대여기간이 만료되었습니다.'} /> : null}
      <div className="h-[12rem] max-header:h-[7.5rem]">
        <Header />
      </div>
      <div className="mx-auto max-w-[1200px] w-full mb-8 max-header:px-4">
        <div className="flex flex-row w-full gap-5 max-header:flex-col">
          <div className="w-72 border-2 border-alco-mint px-5 py-5 rounded-xl h-48 flex flex-col max-header:flex-row max-header:w-full max-header:h-full gap-4">
            <div className="font-bold flex items-center flex-row gap-3 mr-auto flex-wrap">
              {login! === "kakao" && (
                <a
                  className="relative w-8 h-8 border flex gap-2 border-slate-500 rounded-lg text-slate-700 flex justify-center items-center"
                  style={{ backgroundColor: "#FEE500", borderRadius: "100px" }}
                >
                  <img
                    className="absolute w-4 h-4"
                    src="/kakao.png"
                    loading="lazy"
                    alt="google logo"
                  />
                </a>
              )}
              {login! === "google" && (
                <a
                  className="relative w-8 h-8 border flex gap-2 border-slate-500 rounded-lg text-slate-700 flex justify-center items-center"
                  style={{ backgroundColor: "white", borderRadius: "100px" }}
                >
                  <img
                    className="absolute w-4 h-4"
                    src="/google.png"
                    loading="lazy"
                    alt="google logo"
                  />
                </a>
              )}
              {login! === "apple" && (
                <a
                  className="relative w-8 h-8 border flex gap-2 border-slate-500 rounded-lg text-slate-700 flex justify-center items-center"
                  style={{ backgroundColor: "white", borderRadius: "100px" }}
                >
                  <AppleLogo className="absolute w-5 h-5" />
                </a>
              )}
              {userName}
              <div className="hidden text-xl max-header:text font-bold text-alco-mint max-header:flex">
                {balance} 코인
              </div>
            </div>
            <button
              className="bg-black text-white flex items-center justify-center rounded-full text-sm w-24 h-8 mt-auto font-bold font-2xl max-header:mt-0"
              onClick={() => {
                logout();
                navigate("/webtoon");
              }}
            >
              로그아웃
            </button>
          </div>
          <div className="w-full border-2 border-black rounded-xl p-5 grid grid-cols-5 max-lg:grid-cols-3 max-header:p-4 gap-4">
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                navigate("/me/charged");
              }}
            >
              <CoinStack className="w-12 h-12 stroke-[1.5]" />
              <div className="text-xl max-header:text-lg mt-3 font-bold">
                {t("alco-mypage.charged")}
              </div>
              <div className="flex text-xl max-header:text mt-3 font-bold text-alco-mint max-header:hidden">
                {balance} 코인
              </div>
            </div>
            <MenuItem
              icon={<Card className="w-12 h-12" />}
              title={t("alco-mypage.used")}
              to="/me/used"
            />
            <MenuItem
              icon={<StarBlack className="w-12 h-12" />}
              title={t("alco-mypage.like")}
              to="/favorite"
            />
            <MenuItem
              icon={<QuestionCircle className="w-12 h-12" />}
              title={t("alco-mypage.help")}
              to="/me/cs/notices"
            />
            <MenuItem
              icon={<Bell className="w-12 h-12" />}
              title={t("alco-mypage.notices")}
              to="/me/cs/notices"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] w-full max-header:px-2">
        {buyLogLoading ?
          <Loading height="h-[433px]"/> :
          <CarouselList
            title={
              <div className="flex flex-row w-full max-header:px-4">
                <p className="text-lg text-black">{t("alco-mypage.bought")}</p>
                <button
                  className={`font-bold font-notokr mt-auto ml-auto text-alco-gray-300 text-[1rem]`}
                  onClick={() => {
                    navigate("/buylog");
                  }}
                >
                  더보기
                </button>
              </div>
            }
            data={width <= 767 ? buylog.slice(0, 3) : buylog.slice(0, 5)}
            isEName
            isBought
            setExpiredPopup={setExpiredPopup}
          />
        }
      </div>
      <div className="mx-auto max-w-[1200px] w-full max-header:px-2">
        {recentLoading ?
          <Loading height="h-[433px]"/> :
          <CarouselList
            title={
              <div className="flex flex-row w-full max-header:px-4">
                <p className="text-lg text-black">{t("alco-mypage.viewed")}</p>
                <button
                  className={`font-bold font-notokr mt-auto ml-auto text-alco-gray-300 text-[1rem]`}
                  onClick={() => {
                    navigate("/recent");
                  }}
                >
                  더보기
                </button>
              </div>
            }
            data={width <= 767 ? recentViewWebtoonData.slice(0, 3) : recentViewWebtoonData.slice(0, 5)}
            isEName
          />
        }
      </div>
      <div className="h-24" />
      <Footer />
    </div>
  );
};

const MenuItem = ({
  icon,
  title,
  to,
}: {
  icon: any;
  title: string;
  to: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center cursor-pointer"
      onClick={() => navigate(to)}
    >
      {icon}
      <div className="text-xl max-header:text-lg mt-3 font-bold">{title}</div>
    </div>
  );
};
