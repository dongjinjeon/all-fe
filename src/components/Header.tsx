import { LanguageContext } from "@context/LanguageContext";
import { UserContext } from "@context/UserContext";
import i18n from "@src/i18n";
import { ReactComponent as AppleLogo } from "@svg/AppleLogo.svg";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as MagnifyingGlass } from "../svg/MagnifyingGlass.svg";
import { ReactComponent as MagnifyingGlassBlack } from "../svg/MagnifyingGlassBlack.svg";
import { ReactComponent as Profile } from "../svg/Profile.svg";
import { ReactComponent as ProfileBlack } from "../svg/ProfileBlack.svg";
import { ReactComponent as ProfileMint } from "../svg/ProfileMint.svg";
import { ReactComponent as Star } from "../svg/Star.svg";
import { ReactComponent as StarBlack } from "../svg/StarBlack.svg";
import { ReactComponent as StarMint } from "../svg/StarMint.svg";
import DownloadPopup from "./Popup/DownloadPopup";

export const Header = () => {
  const { userName, userId, login, logout, isDrawerOpen, setIsDrawerOpen } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [height,setHeight]=useState(0);
  const [width,setWidth]=useState(0);
  const [scroll,setScroll]=useState(0);

  const [openCharge, setOpenCharge] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [isMypage, setIsMypage] = useState(false);

  const [isMain, setIsMain] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isRank, setIsRank] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);

  const [type, setType] = useState<"webtoon" | "webnovel">("webtoon");

  const collaborationWith = useMemo(() => {
    if (window.location.hostname.includes('shinhan')) {
      return "shinhan";
    }
    return "";
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
    if (location.pathname.startsWith("/me")) setIsMypage(true);
    else setIsMypage(false);
    if (
      location.pathname === "/webtoon" ||
      location.pathname === "/webnovel" ||
      location.pathname.startsWith("/webtoon/detailed") ||
      location.pathname.startsWith("/webnovel/detailed")
    )
      setIsMain(true);
    else setIsMain(false);
    if (
      location.pathname === "/webtoon/list" ||
      location.pathname === "/webnovel/list"
    )
      setIsList(true);
    else setIsList(false);
    if (
      location.pathname === "/webtoon/ranking" ||
      location.pathname === "/webnovel/ranking"
    )
      setIsRank(true);
    else setIsRank(false);
    if (location.pathname.startsWith("/webnovel")) setType("webnovel");
    else setType("webtoon");
    if (location.pathname === "/favorite") setIsFavorite(true);
    else setIsFavorite(false);
    if (location.pathname.startsWith("/me")) setIsMyPage(true);
    else setIsMyPage(false);
  }, [location]);

  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  const { t } = useTranslation();

  const changeLanguage = (lng: "ko" | "en" | "id" | "es") => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const [mode, setMode] = useState<"light" | "dark">(
    location.pathname === "/webtoon" ||
      location.pathname === "/webnovel" ||
      location.pathname === "/me" ||
      location.pathname === "/me/charged" ||
      location.pathname === "/favorite" ||
      location.pathname === "/me/used" ||
      location.pathname === "/me/cs/notices" ||
      location.pathname === "/payments" ||
      location.pathname.startsWith("/webtoon/detailed") ||
      location.pathname.startsWith("/webnovel/detailed")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    const time = setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 1);

    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });

      clearTimeout(time);
    };
  }, []);

  useEffect(()=>{
    if(isDrawerOpen){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }

    setScroll(window.scrollY)

  },[isDrawerOpen]);



  return (
    <div className={`${isMain && "absolute"} z-10 w-full`}>
      {isDrawerOpen && <div className="fixed inset-0 z-[100] bg-black opacity-30"
          style={{
            height: height,
            width: width,
          }} onClick={()=> setIsDrawerOpen((prev: boolean) => !prev)}></div>}
      {isDrawerOpen &&
        <div id='menu' className="absolute z-[101] w-[320px] bg-white h-screen right-0 p-5 max-sm:w-[85%]" style={{top:scroll}}>
          <div className="text-xl font-bold mb-5">내 정보</div>
          <h1 className="w-full font-bold flex items-center flex-row gap-3 mr-auto mb-5 text-base flex-wrap">
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
          </h1>
          <div className="flex w-full my-5">
            <Search
              searchText={searchText}
              setExpandSearch={setExpandSearch}
              setSearchText={setSearchText}
              bg={'bg-gray-200'}
              border={'border-none'}
              h={'h-12'}
            />
          </div>
          {userId && userId <= -1 ? (
            <>
              <div
                className="flex justify-center items-center rounded-[8px] border-alco-mint border-[1px] py-2 text-alco-mint text-xl max-lg:text-base font-bold cursor-pointer mb-5"
                onClick={() => navigate("/login")}
              >
                로그인/회원가입
              </div>
            </>
          ) : (
            <div className="flex flex-col pl-5 text-xl font-bold gap-4 mb-4 max-lg:text-base">
              <div className="cursor-pointer" onClick={() => navigate('/me')}>내 서재</div>
              <div className="cursor-pointer" onClick={() => navigate('/favorite')}>관심 작품</div>
            </div>
          )}
          <div className="flex flex-col gap-4 mb-5">
            {collaborationWith === 'shinhan' ? (
                <div
                    className="flex justify-center font-notokr bg-alco-mint text-white rounded-[8px] border-alco-mint border-[1px] py-2 cursor-pointer font-bold text-xl max-lg:text-base px-5 max-lg:px-4"
                    onClick={() => {
                      navigate("/payments");
                      // setOpenCharge(true);
                    }}
                >
                  {t("header.billing")}
                </div>
            ) : null}
            {userId && userId > -1 ? (
            <a
              className="flex justify-center font-notokr bg-alco-mint text-white rounded-[8px] border-alco-mint border-[1px] py-2 cursor-pointer font-bold text-xl max-lg:text-base px-5 max-lg:px-4"
              href={`https://wall.smaad.net/wall/414430490/?u=${userId}`}
              target="_blank" rel="noreferrer"
            >
              무료충전소
            </a>) : null}
          </div>
          {userId && userId > -1 ? (
            <div
              className="flex justify-center items-center rounded-[8px] border-alco-mint border-[1px] py-2 text-alco-mint text-xl max-lg:text-base font-bold cursor-pointer"
              onClick={() => {
                logout();
                navigate("/webtoon");
              }}
            >
              로그아웃
            </div>) : null}
        </div>
      }
      {openCharge && (
        <DownloadPopup isOpen={openCharge} setIsOpen={setOpenCharge} />
      )}
      <div className="">
        <div
          className={`${
            mode === "dark" ? "bg-black" : ""
          } w-full h-8 flex items-center pt-5 pb-5 font-medium`}
        >
          <div
            className={`mx-auto w-alco-md grid grid-cols-3 ${
              mode === "dark" ? "bg-black text-white" : "text-black"
            }`}
          >

            <div className="font-notokr col-start-2 col-span-1 flex flex-row justify-center items-center">
              <div
                className={`text-xl cursor-pointer max-header:text-base ${
                  location.pathname.startsWith("/webtoon")
                    ? "text-alco-mint"
                    : ""
                }`}
                onClick={() => {
                  let newLocation;
                  if(location.pathname.includes('search') || location.pathname.includes('episodes')
                    || location.pathname.includes('me') || location.pathname.includes('favorite')){
                    return navigate("/webtoon")
                  }
                  if(location.pathname.startsWith("/webtoon")){
                    return
                  }else{
                    newLocation = location.pathname.replace('/webnovel','/webtoon');
                    navigate(newLocation);
                  }
                }}
              >
                {t("header.title_webtoon")}&nbsp;&nbsp;
              </div>
              <div>|</div>
              <div
                className={`text-xl cursor-pointer max-header:text-base ${
                  location.pathname.startsWith("/webnovel")
                    ? "text-alco-mint"
                    : ""
                }`}
                onClick={() => {
                  let newLocation;
                  if(location.pathname.includes('search') || location.pathname.includes('episodes')
                    || location.pathname.includes('me') || location.pathname.includes('favorite') ){
                    return navigate("/webnovel")
                  }
                  if(location.pathname.startsWith("/webnovel")){
                    return
                  }else{
                    newLocation = location.pathname.replace('/webtoon','/webnovel');
                    navigate(newLocation);
                  }
                }}
              >
                &nbsp;&nbsp;{t("header.title_webnovel")}
              </div>
            </div>
            {userId === -1 ? (
              <div className="font-notokr col-span-1 flex flex-row justify-end">
                <div className="flex flex-row justify-center items-center gap-2 max-header:pr-4 max-header:gap-1 cursor-pointer" onClick={() => navigate("/login")}>
                  <div className="text-base max-header:text-sm max-mobileM:hidden">
                    {t("header.join")}
                  </div>
                  <div className="max-mobileM:hidden">
                    <svg
                      width="6"
                      height="7"
                      viewBox="0 0 6 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.232 6.3C4.66 6.3 5.808 5.124 5.808 3.612C5.808 2.072 4.66 0.924 3.232 0.924C1.748 0.924 0.684 2.072 0.684 3.612C0.684 5.124 1.748 6.3 3.232 6.3Z"
                        fill={isMain ? "white" : "black"}
                      />
                    </svg>
                  </div>
                  <div className="text-base max-header:text-sm">
                    {t("header.login")}
                  </div>
                </div>
              </div>
            ) : (
              <div className="font-notokr col-span-1 flex flex-row justify-end">
                <div className="flex flex-row justify-center items-center gap-2"></div>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex items-center h-[4rem] max-lg:h-[2.5rem]"
          style={{
            backgroundColor: "rgba( 0, 0, 0, 0.5 )",
          }}
        >
          <div
            className={`mx-auto w-full ${
              mode === "dark" ? "text-white" : "text-black"
            } z-20 h-full flex flex-row px-0 max-w-[1200px] max-header:px-4`}
          >
            <div className="h-full flex flex-row items-center font-notokr font-medium gap-16 max-header:gap-3">
              <div className="h-full flex-row items-center flex">
                <img
                    src="/logocolor.png"
                    className="h-10 cursor-pointer max-lg:w-10 max-lg:h-auto max-lg:scale-70"
                    onClick={() => {
                      navigate(`/${type}`);
                    }}
                />
                {collaborationWith === 'shinhan' ? (
                    <img
                        src="/shinhan.png"
                        className="h-10 cursor-pointer max-lg:max-lg:h-6 max-lg:scale-70"
                        onClick={() => {
                          navigate(`/${type}`);
                        }}
                    />
                ) : null}
              </div>
              <div className="">
                <div
                    className={`${
                        isMain
                            ? "text-white"
                            : isList || isRank
                                ? "text-alco-gray-500"
                                : "text-black"
                    } text-2xl max-lg:text-base cursor-pointer`}
                    onClick={() => {
                      navigate(`/${type}`);
                    }}
                >
                  {t("header.home")}
                </div>
              </div>
              <div className="">
                <div
                    className={`text-md cursor-pointer ${
                        isList
                            ? "border-2 border-alco-mint rounded-[100px] px-5 text-alco-mint"
                            : isMain || isRank
                                ? "text-alco-gray-500"
                                : "text-black"
                    } text-2xl max-lg:text-base cursor-pointer`}
                    onClick={() => {
                      navigate(`/${type}/list`);
                    }}
                >
                  {t("header.listed")}
                </div>
              </div>
              <div className="">
                <div
                    className={`text-md cursor-pointer ${
                        isRank
                            ? "border-2 border-alco-mint rounded-[100px] px-5 text-alco-mint"
                            : isList || isMain
                                ? "text-alco-gray-500"
                                : "text-black"
                    } text-2xl max-lg:text-base cursor-pointer`}
                    onClick={() => {
                      navigate(`/${type}/ranking`);
                    }}
                >
                  {t("header.ranking")}
                </div>
              </div>
            </div>
            <div className="hidden items-center cursor-pointer ml-auto max-header:flex"
                 onClick={() => setIsDrawerOpen((prev: boolean) => !prev)}>
              {width <= 1024 ?
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  <path
                  d="M22.668 6.668H1.332a1.335 1.335 0 0 1 0-2.668h21.336a1.334 1.334 0 0 1 0 2.668Zm0 6.664H1.332a1.331 1.331 0 1 1 0-2.664h21.336a1.331 1.331 0 1 1 0 2.664Zm0 6.668H1.332a1.334 1.334 0 0 1 0-2.668h21.336a1.335 1.335 0 0 1 0 2.668Zm0 0"
                  style={{
                    stroke: "none",
                    fillRule: "nonzero",
                    fill: `${isMain ? 'white': 'black'}`,
                    fillOpacity: 1,
                  }}
                />
              </svg>
                :
              <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
                <path
                  d="M0 0h40v40H0z"
                  style={{
                    fill: "#fff",
                    fillOpacity: 0.0117647,
                    stroke: "none",
                  }}
                />
                <path
                  d="M7.95 11.948h32.002M7.95 23.948h32.002M7.95 35.948h32.002"
                  style={{
                    fill: "none",
                    strokeWidth: 4,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    stroke: `${isMain ? 'white': 'black'}`,
                    strokeOpacity: 1,
                    strokeMiterlimit: 4,
                  }}
                  transform="scale(.83333)"
                />
              </svg>
              }
            </div>
            <div className="flex flex-row items-center justify-end flex-1 relative gap-8 max-header:gap-4 max-header:hidden">
              {expandSearch ? (
                <div className="flex flex-1 bg-transparent pl-4">
                  <Search
                    searchText={searchText}
                    setExpandSearch={setExpandSearch}
                    setSearchText={setSearchText}
                  />
                </div>
              ) : isMain ? (
                <MagnifyingGlass
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    setExpandSearch(true);
                  }}
                />
              ) : (
                <MagnifyingGlassBlack
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    setExpandSearch(true);
                  }}
                />
              )}
              {isMain ? (
                <Star
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    if(userId && userId > -1) {
                      navigate("/favorite");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              ) : isFavorite ? (
                <StarMint
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    if(userId && userId > -1) {
                      navigate("/favorite");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              ) : (
                <StarBlack
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    if(userId && userId > -1) {
                      navigate("/favorite");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              )}
              {isMain ? (
                <Profile
                  className={`w-10 h-10 cursor-pointer ${
                    isMypage && "stroke-alco-mint"
                  }`}
                  onClick={() => {
                    if(userId && userId > -1) {
                      navigate("/me");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              ) : isMyPage ? (
                <ProfileMint
                  className={`w-10 h-10 cursor-pointer ${
                    isMypage && "stroke-alco-mint"
                  }`}
                  onClick={() => {
                    if(userId && userId > -1) {
                      navigate("/me");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              ) : (
                <ProfileBlack
                  className={`w-10 h-10 cursor-pointer ${
                    isMypage && "stroke-alco-mint"
                  }`}
                  onClick={() => {
                    if(userId && userId > -1) {
                      navigate("/me");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              )}
              {collaborationWith === 'shinhan' ? (
                  <div
                      className="font-notokr bg-alco-mint text-white rounded-full py-1 cursor-pointer font-bold text-lg max-lg:text-base px-5 max-lg:px-4"
                      onClick={() => {
                        navigate("/payments");
                        // setOpenCharge(true);
                      }}
                  >
                    {t("header.billing")}
                  </div>
              ) : null}
              {userId !== -1 && (
                <a
                  className="font-notokr bg-alco-mint text-white rounded-full py-1 cursor-pointer font-bold text-lg max-lg:text-base px-5 max-lg:px-4"
                  href={`https://wall.smaad.net/wall/414430490/?u=${userId}`}
                  target="_blank" rel="noreferrer"
                >
                  무료충전소
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Search = ({
  searchText,
  setSearchText,
  setExpandSearch,
  bg,
  border,
  h,
}: {
  searchText: any;
  setSearchText: any;
  setExpandSearch: any;
  bg?: any;
  border?: any;
  h?: any
}) => {
  const searchRef = useRef<any>();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (searchRef) {
      searchRef.current.focus();
    }
  }, [searchRef]);

  return (
    <div className={`w-full rounded-xl px-4 ${h ? h : 'h-10'} flex flex-col items-center justify-center ${bg ? bg : 'bg-white'}`}>
      <div className={`flex flex-row w-full border-b-[0.1rem] ${border ? border : 'border-black'}`}>
        <input
          maxLength={20}
          className="bg-transparent w-full h-full outline-none text-black max-lg:text-base"
          ref={searchRef}
          placeholder={"제목/키워드를 검색해주세요."}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if(location.pathname.startsWith("/webnovel")){
                navigate(`/webnovel/search/${searchText}`);
              } else{
                navigate(`/webtoon/search/${searchText}`);
              }
            }
          }}
          onBlur={() => {
            setExpandSearch(false);
          }}
        />
        <MagnifyingGlassBlack
          className="w-10 h-10 ml-auto cursor-pointer max-lg:w-8 max-lg:h-8"
          onClick={() => {
            if(searchText.length > 0) {
              if(location.pathname.startsWith("/webnovel")){
                navigate(`/webnovel/search/${searchText}`);
              } else{
                navigate(`/webtoon/search/${searchText}`);
              }
            }
          }}
        />
      </div>
    </div>
  );
};
