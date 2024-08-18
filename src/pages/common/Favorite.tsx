import { Header } from "@components/Header";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "@context/UserContext";
import { ContentFavorite } from "@components/ContentFavorite";
import { Footer } from "@components/Footer";
import {useLocation, useNavigate} from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import NotificationPopup from "@components/Popup/NotificationPopup";

export const Favorite = () => {
  const {
    favoriteWebtoonData,
    favoriteWebnovelData,
    recentViewWebtoonData,
    buylog,
    userId,
    getFavorite,
    getFavoriteWebnovel,
    getRecentView,
    currentLanguage,
    recentViewCnt,
    favoriteCnt,
    getBought,
    boughtCnt,
    session_token,
  } = useContext(UserContext);

  const [data, setData] = useState<any>(favoriteWebtoonData);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("webtoon");
  const [sort, setSort] = useState<string>("recent");
  const [page, setPage] = useState<number>(1);
  const location = useLocation();

  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const [expiredPopup, setExpiredPopup] = useState(false);

  useEffect(() => {
    const cur = location.pathname;

    if (cur === "/favorite") {
      getFavorite({
        page: page,
        count: 10,
        token: session_token,
        sort: sort === 'title' ? "name" : "desc"
      });
      getFavoriteWebnovel({
        page: page,
        count: 10,
        token: session_token,
        sort: sort === 'title' ? "name" : "desc"
      });
    } else if (cur === "/recent") {
      getRecentView({
        page: page,
        count: 10,
        token: session_token,
        IsValid: 0,
        sort: sort === 'title' ? "name" : "desc",
        ContentType: type === "webtoon" ? 0 : 1
      });
    } else if (cur === "/buylog") {
      getBought({
        page: page,
        count: 10,
        token: session_token,
        ContentType: type === "webtoon" ? 0 : 1,
        sort: sort === 'title' ? "name" : "desc",
      });
    }
  }, [location.pathname, type, page, sort]);

  useEffect(() => {
    const cur = location.pathname;
    if (recentViewCnt === 0 && cur === "/favorite" && page > 1) {
      setPage(page - 1);
    }
    if (favoriteCnt === 0 && cur === "/recent" && page > 1) {
      setPage(page - 1);
    }
    if (boughtCnt === 0 && cur === "/buylog" && page > 1) {
      setPage(page - 1);
    }
  }, [recentViewCnt, favoriteCnt, boughtCnt]);

  useEffect(() => {
    const cur = location.pathname;

    if (cur === "/favorite") setTitle("관심 작품");
    else if (cur === "/recent") setTitle("최근 본 작품");
    else if (cur === "/buylog") setTitle("구매한 작품");

    if (type === "webtoon") {
      if (cur === "/favorite") {
        let favoriteData = favoriteWebtoonData;
        if (search !== "") {
          favoriteData = favoriteWebtoonData.filter((dat: any) => {
            if (dat.webtoon_name.includes(search)) return dat;
          });
        }
        setData(favoriteData);
      }
      if (cur === "/recent") {
        let recentData = [];
        if (search !== "") {
          recentData = recentViewWebtoonData.filter((dat: any) => {
            if (dat.webtoon_name.includes(search) && dat.ContentType === 0)
              return dat;
          });
        } else {
          recentData = recentViewWebtoonData.filter((dat: any) => {
            if (dat.ContentType === 0) return dat;
          });
        }
        setData(recentData);
      }
      if (cur === "/buylog") {
        let buylogData = [];
        if (search !== "") {
          buylogData = buylog.filter((dat: any) => {
            if (dat.webtoon_name.includes(search) && dat.ContentType === 0)
              return dat;
          });
        } else {
          buylogData = buylog.filter((dat: any) => {
            if (dat.ContentType === 0) return dat;
          });
        }
        setData(buylogData);
      }
    } else {
      if (cur === "/favorite") {
        let favoriteData = favoriteWebnovelData;
        if (search !== "") {
          favoriteData = favoriteWebnovelData.filter((dat: any) => {
            if (dat.webtoon_name.includes(search)) return dat;
          });
        }
        setData(favoriteData);
      }
      if (cur === "/recent") {
        let recentData = [];
        if (search !== "") {
          recentData = recentViewWebtoonData.filter((dat: any) => {
            if (dat.webtoon_name.includes(search) && dat.ContentType === 1)
              return dat;
          });
        } else {
          recentData = recentViewWebtoonData.filter((dat: any) => {
            if (dat.ContentType === 1) return dat;
          });
        }
        setData(recentData);
      }
      if (cur === "/buylog") {
        let buylogData = [];
        if (search !== "") {
          buylogData = buylog.filter((dat: any) => {
            if (dat.webtoon_name.includes(search) && dat.ContentType === 1)
              return dat;
          });
        } else {
          buylogData = buylog.filter((dat: any) => {
            if (dat.ContentType === 1) return dat;
          });
        }
        setData(buylogData);
      }
    }
  }, [
    type,
    location,
    search,
    favoriteWebtoonData,
    recentViewWebtoonData,
    buylog,
    sort,
  ]);

  useEffect(() => {
    if (userId && userId <= -1) navigate("/login");
  }, []);

  const clickNext = useCallback(() => {
    if(data.length >= 10) {
      setPage(page + 1);
    }
  }, [data]);

  return (
    <div className="">
      {expiredPopup ? <NotificationPopup isOpen={expiredPopup} setIsOpen={setExpiredPopup} text={'대여기간이 만료되었습니다.'} /> : null}
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header />
      </div>
      <div className="flex flex-col">
        <div className="mx-auto max-w-[1200px] w-full">
          <div className="text-left mt-1 text-sm flex-row flex items-center gap-5 mb-5 font-notokr max-header:px-4 max-header:gap-3">
            <img src="/books.png" className="w-12 h-12 max-header:w-8 max-header:h-8" />
            <div className="text-xl font-bold max-header:text-base">{title}</div>
          </div>
          <div className="mb-3 gap-2 font-notokr flex flex-row items-center max-header:px-4 max-md:flex-col max-md:items-start max-md:justify-center">
            <div className="gap-2 flex flex-row items-center">
              <div
                onClick={() => {
                  setSort("recent");
                }}
                className={`${sort === "recent" && "font-bold"} cursor-pointer max-header:text-sm`}
              >
                최신 등록순
              </div>
              <div
                onClick={() => {
                  setSort("title");
                }}
                className={`${sort === "title" && "font-bold"} cursor-pointer max-header:text-sm`}
              >
                제목순
              </div>
              <div>|</div>
              <div
                onClick={() => {
                  setType("webtoon");
                  setPage(1);
                }}
                className={`${type === "webtoon" && "font-bold"} cursor-pointer max-header:text-sm`}
              >
                웹툰
              </div>
              <div
                onClick={() => {
                  setType("webnovel");
                  setPage(1);
                }}
                className={`${type === "webnovel" && "font-bold"} cursor-pointer max-header:text-sm`}
              >
                웹소설
              </div>
            </div>
            <div className="ml-auto px-5 w-96 h-[2.5rem] flex flex-row bg-[#FAFAFA] rounded-[16px] border-2 border-[#D0D0D0] max-md:w-full">
              <input
                className="w-80 bg-[#FAFAFA] max-md:w-full outline-none"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <MagGlass />
            </div>
          </div>
          <div className="grid grid-cols-2 max-header:grid-cols-1 max-header:px-4">
            {data?.map((item: any, index: number) => {
              return (
                <ContentFavorite
                  key={index}
                  dat={item}
                  genres={item.dat?.Webtoon.genres}
                  cont={location.pathname !== "/favorite"}
                  isBuy={
                    location.pathname === "/buylog" ||
                    location.pathname === "/recent"
                  }
                  setExpiredPopup={setExpiredPopup}
                />
              );
            })}
          </div>
          <div className="flex flex-1 my-3 flex-row w-full gap-4 justify-end max-header:px-4">
            {/*
            <button className="bg-[#F7F7F7] px-5 py-2 rounded-[8px] border-[2px] border-solid ml-auto font-notokr text-[16px] font-medium text-[#757575]">
              전체 삭제
            </button>*/}
              <button
                className="bg-[#F7F7F7] px-2 py-2 rounded-[8px] border-[2px] border-solid font-notokr text-[16px] font-medium text-[#757575]"
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                className="bg-[#F7F7F7] px-2 py-2 rounded-[8px] border-[2px] border-solid font-notokr text-[16px] font-medium text-[#757575]"
                onClick={() => clickNext()}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
          </div>
        </div>
      </div>
      <div className="h-24" />
      <Footer />
    </div>
  );
};

const MagGlass = () => {
  return (
    <svg
      className="ml-auto my-auto"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.3333"
        cy="15.3333"
        r="10.3333"
        stroke="#BDBDBD"
        strokeWidth="2"
      />
      <path
        d="M22.6667 22.6666L26.6667 26.6666"
        stroke="#BDBDBD"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
