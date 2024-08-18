import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { ReactComponent as StarBlack } from "@svg/StarBlack.svg";
import { ReactComponent as StarMint } from "@svg/StarMint.svg";

import { GenreTag } from "./GenreTag";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@context/UserContext";

import RentPopup from "./Popup/RentPopup";
import BuyAllPopup from "./Popup/BuyAllPopup";
import ChargePopup from "./Popup/ChargePopup";

interface EpisodeListProps {
  id: string;
  cover: string;
  title: string;
  genres: string[];
  desc: string;
  age: number;
  episodeList: [];
  episodeSort: any;
  setEpisodeSort: any;
  episodePagination: any;
  setEpisodePagination: any;
  episodeCount: number;
  kind: string;
  setFavorite?: any;
  isFavorites?: any;
  webtoonDetails?: any;
}

export const EpisodeList = ({
  id,
  cover,
  title,
  genres,
  desc,
  age,
  episodeList,
  episodeSort,
  setEpisodeSort,
  episodePagination,
  setEpisodePagination,
  episodeCount = 0,
  setFavorite,
  isFavorites,
  kind,
  webtoonDetails,
}: EpisodeListProps) => {
  const { t } = useTranslation();
  const [isOwn, setIsOwn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavorites);
  const [isOpen, setIsOpen] = useState(undefined);
  const [isOpenBuyAll, setIsOpenBuyAll] = useState<any>(undefined);
  const { buylog, favoriteWebtoonData, userId } = useContext(UserContext);
  const [coinPopup, setCoinPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {coinPopup ? <ChargePopup isOpen={coinPopup} setIsOpen={setCoinPopup} /> : null }
      {isOpen && (
        <RentPopup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isRent={isOwn}
          isWebtoon={location.pathname.includes("webtoon")}
          setCoinPopup={setCoinPopup}
        />
      )}
      {isOpenBuyAll && (
        <BuyAllPopup isOpen={isOpenBuyAll} setIsOpen={setIsOpenBuyAll} isWebtoon={location.pathname.includes("webtoon")} setEpisodePagination={setEpisodePagination}/>
      )}
      <div className="flex flex-col items-center mx-auto max-w-[1200px] w-full font-notokr max-header:px-4">
        <div className="mt-8 w-full">
          <div className="flex flex-row gap-10 max-header:flex-col max-header:items-center max-lg:gap-5">
            <div className="w-2/5 flex flex-col max-header:w-full">
              <div className="relative">
                <img
                  src={cover}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover filter blur-md z-10"
                />
                <img
                  src={cover}
                  alt="Main"
                  className="relative w-full h-full object-cover z-20 p-20 max-md:p-10"
                />
              </div>
              <div className="flex flex-col p-4 mt-5 rounded-[20px] border-[2.5px] border-[#3FC1BE]">
                <div className="flex flex-row h-fit">
                  <div className="flex items-center text-[30px] font-notokr max-lg:text-lg max-lg:font-bold">
                    {title}
                  </div>
                  {isFavorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#3FC1BE"
                      stroke="#3FC1BE"
                      strokeWidth={1.5}
                      className={`w-14 h-14 ml-auto cursor-pointer max-lg:w-8 max-lg:h-8`}
                      viewBox="0 0 24 24"
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                        setFavorite();
                      }} //setFavoriteWebtoon}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className={`w-14 h-14 ml-auto cursor-pointer max-lg:w-8 max-lg:h-8`}
                      viewBox="0 0 24 24"
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                        setFavorite();
                      }} //setFavoriteWebtoon}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center text-lg mt-1 max-lg:text-sm">
                  <p>
                    {genres?.length > 1 &&
                      t(`common.genre.${genres[0].toLowerCase()}`)}
                  </p>
                  <div>|</div>
                  <p>
                    {age === 0 ? "전체" : age + "+세"}
                    이용가
                  </p>
                </div>
                <div className="flex flex-row mt-5 gap-2 max-lg:mt-2">
                  {genres?.map((tag: any, index: number) => (
                    <GenreTag
                      tag={tag}
                      key={index}
                      className=""
                      fontSize="1rem"
                    />
                  ))}
                </div>
                <div>
                  <p
                    className="mt-4 text-lg text-[#999999] max-h-48 overflow-auto max-lg:text-sm"
                    style={{
                      fontFamily: "Noto Sans KR",
                    }}
                  >
                    {desc}
                  </p>
                </div>
                <div className="flex flex-row gap-3 h-16 text-2xl mt-5 max-lg:text-base max-lg:h-12">
                  <a
                    className="bg-alco-mint text-white rounded-xl pt-1 pb-1 w-full flex items-center justify-center font-bold"
                    onClick={() => {
                      navigate(`/${kind}/episodes/view/${id}/001`);
                    }}
                  >
                    첫화보기
                  </a>
                  <button
                    className="bg-white text-alco-mint rounded-xl pt-1 pb-1 w-full font-bold"
                    style={{
                      border: "2.5px solid",
                      borderColor: "#3FC1BE",
                    }}
                    onClick={() => {
                      if(userId === undefined || userId <= -1) {
                        // alert('로그인이 필요합니다')
                        navigate('/login')
                      } else {
                        setIsOpenBuyAll({ cover: cover, webtoonDetails: webtoonDetails});
                      }
                    }}
                  >
                    전체구매
                  </button>
                </div>
              </div>
              {buylog[0]?.webtoon_name !== "" ?
                <div
                  className="w-full bg-alco-mint p-5 mt-5 flex flex-col max-header:hidden"
                  style={{ borderRadius: "20px", background: "#EBFBFA" }}
                >
                  <div style={{ fontSize: "1.5rem" }}>구매한 작품</div>
                  <div className="py-5 flex flex-col gap-3">
                    {buylog.slice(0,3)?.map((item: any, index: number) => {
                      return (
                        <ContentCard
                          key={index}
                          type={item.ContentType}
                          item={item}
                          url={`view/${item.ID}/${item.EpisodeID.match(/E(\d+)/)[1]}`}
                          image={item.thumbnails.thumbnail}
                          title={item.webtoon_name}
                          tag={item.genres}
                          description={item.description}
                        />
                      );
                    })}
                  </div>
                </div>
              : null}
              {favoriteWebtoonData[0]?.webtoon_name !== "" ?
                <div
                  className="w-full p-5 mt-5 flex flex-col max-header:hidden"
                  style={{ borderRadius: "20px", background: "#EBFBFA" }}
                >
                  <div style={{ fontSize: "1.5rem" }}>관심 작품</div>
                  <div className="py-5 flex flex-col gap-3">
                    {favoriteWebtoonData.slice(0,3)?.map((item: any, index: number) => {
                      return (
                        <ContentCard
                          key={index}
                          type={item.ContentType}
                          item={item}
                          url={item.dat?.WebtoonID}
                          image={item.thumbnails.thumbnail}
                          title={item.webtoon_name}
                          tag={item.dat?.Webtoon.genres}
                          description={item.dat?.Webtoon.description}
                        />
                      );
                    })}
                  </div>
                </div>
              : null}
            </div>
            <div className="w-3/5 flex flex-col max-header:w-full">
              <div className="flex flex-row w-full text-center h-16 text-2xl max-lg:text-base max-lg:h-12">
                <div
                  className={`border-t-2 border-alco-gray-200 w-full h-full flex justify-center items-center cursor-pointer ${
                    isOwn
                      ? "bg-alco-gray-200 font-thin text-[#D0D0D0]"
                      : "font-bold"
                  }`}
                  onClick={() => {
                    setIsOwn(false);
                  }}
                >
                  대여하기
                </div>
                <div
                  className={`border-t-2 border-alco-gray-200 w-full h-full flex justify-center items-center cursor-pointer ${
                    !isOwn
                      ? "bg-alco-gray-200 font-thin text-[#D0D0D0]"
                      : "font-bold"
                  }`}
                  onClick={() => {
                    setIsOwn(true);
                  }}
                >
                  소장하기
                </div>
              </div>
              <div className="flex flex-row">
                <div className={`ml-auto flex flex-row gap-2 my-3 max-lg:text-sm`}>
                  <p
                    className={`cursor-pointer ${
                      episodeSort === "asc" && "text-alco-mint"
                    }`}
                    onClick={() => {
                      setEpisodeSort("asc");
                    }}
                  >
                    첫화부터
                  </p>
                  |
                  <p
                    className={`cursor-pointer ${
                      episodeSort === "desc" && "text-alco-mint"
                    }`}
                    onClick={() => {
                      setEpisodeSort("desc");
                    }}
                  >
                    최신화부터
                  </p>
                </div>
              </div>
              <div>
                {episodeList?.map((episode: any, idx: number) => {
                  return (
                    <EpisodeCard
                      key={idx}
                      episode={episode}
                      id={id!}
                      isOwn={isOwn}
                      setIsOpen={setIsOpen}
                      kind={kind}
                      userId={userId}
                    />
                  );
                })}
              </div>
              <div className="flex flex-row justify-center items-center gap-5 my-3">
                <ChevronLeftIcon
                  className="cursor-pointer w-8 h-8 max-lg:w-6 max-lg:h-6"
                  onClick={() => {
                    if (episodePagination > 0)
                      setEpisodePagination(episodePagination - 1);
                  }}
                />
                <div className="text-3xl flex items-center justify-center gap-2 max-lg:text-lg">
                  <p className="font-bold">{episodePagination + 1}</p>
                  <p style={{ color: "#D0D0D0" }}> / </p>
                  <p style={{ color: "#D0D0D0" }}>
                    {Math.ceil(episodeCount / 14)}
                  </p>
                </div>
                <ChevronRightIcon
                  className="cursor-pointer w-8 h-8 max-lg:w-6 max-lg:h-6"
                  onClick={() => {
                    if (episodePagination < Math.ceil(episodeCount / 14) - 1)
                      setEpisodePagination(episodePagination + 1);
                  }}
                />
              </div>

              {buylog[0]?.webtoon_name !== "" ?
                <div
                  className="w-full p-5 mt-5 hidden flex-col max-header:flex max-sm:p-2 rounded-[20px]"
                  style={{ background: "#EBFBFA" }}
                >
                  <div className="text-2xl max-sm:text-xl max-sm:text-center">구매한 작품</div>
                  <div className="py-5 flex flex-col gap-3">
                    {buylog.slice(0,3)?.map((item: any, index: number) => {
                      return (
                        <ContentCard
                          key={index}
                          type={item.ContentType}
                          item={item}
                          url={`view/${item.ID}/${item.EpisodeID.match(/E(\d+)/)[1]}`}
                          image={item.thumbnails.thumbnail}
                          title={item.webtoon_name}
                          tag={item.genres}
                          description={item.description}
                        />
                      );
                    })}
                  </div>
                </div>
              : null}
              {favoriteWebtoonData[0]?.webtoon_name !== "" ?
                <div
                className="w-full p-5 mt-5 hidden flex-col max-header:flex max-sm:p-2 rounded-[20px]"
                style={{ background: "#EBFBFA" }}
                >
                  <div className="text-2xl max-sm:text-xl max-sm:text-center">관심 작품</div>
                  <div className="py-5 flex flex-col gap-3">
                    {favoriteWebtoonData.slice(0,3)?.map((item: any, index: number) => {
                      return (
                        <ContentCard
                          key={index}
                          item={item}
                          type={item.ContentType}
                          url={item.dat?.WebtoonID}
                          image={item.thumbnails.thumbnail}
                          title={item.webtoon_name}
                          tag={item.dat?.Webtoon.genres}
                          description={item.dat?.Webtoon.description}
                        />
                      );
                    })}
                  </div>
                </div>
              : null}
            </div>
          </div>
        </div>
      </div>
      <div className="h-24" />
    </>
  );
};

interface IEpisodeCard {
  episode: any;
  id: string;
  isOwn: boolean;
  setIsOpen: any;
  kind: string;
  userId: any;
}

const EpisodeCard = ({ episode, id, isOwn, setIsOpen, kind, userId }: IEpisodeCard) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if(episode.id === "") return;
    if (userId <= -1 && !episode.isFree) {
      // alert('로그인이 필요합니다.')
      navigate('/login')
    } else {
      if (!episode.isFree && !episode.isPurchased) {
        setIsOpen({ id: id, episode: episode.id.split("_E")[1], price: episode.price });
      } else {
        navigate(`/${kind}/episodes/view/${id}/${episode.id.split("_E")[1]}`);
      }
    }

  };

  function episodeStatus(episode: any) {
    if (episode.isFree) {
      return "무료";
    }
    if(userId <= -1) {
      return "구매 전";
    }
    if (episode.isPurchased && episode.expiredAt === 0) {
      return "구매함";
    } else if(episode.isPurchased && episode.expiredAt !== 0) {
      return "대여중"
    }
    return "구매 전";
  }

  return (
    <div
      className="flex flex-row p-2"
      onClick={handleClick}
    >
      <img
        className="w-20 h-30 rounded-xl"
        src={episode.thumbnail ? episode.thumbnail : "/placeholder.webp"}
      />
      <div
        className="flex flex-col justify-center pl-5 text-xl max-sm:text-base flex-1 font-medium pr-1"
      >
        <div  className="text-ellipsis overflow-x-hidden"
        style={{
          wordBreak: 'break-all',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          display: '-webkit-box',
        }}
        >{episode.name}</div>
        {(!episode.isFree && !episode.isPurchased || (!episode.isFree && userId <= -1)) && (
          <div className="text-alco-mint">
            {isOwn ? episode.price.buy : episode.price.rent} 코인
          </div>
        )}
      </div>
      <div
        className={`flex justify-center items-center ${
          episode.isPurchased && userId > -1 ? "text-alco-mint" : "text-alco-gray"
        } text-xl max-sm:text-base font-medium`}
      >
        {episodeStatus(episode)}
      </div>
    </div>
  );
};

interface IContentCard {
  image: string;
  title: string;
  tag: string[];
  description: string;
  url?: any;
  item?: any;
  type?: number;
}

const ContentCard = ({ image, title, tag, description, url, item, type }: IContentCard) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-row gap-3 h-48 max-header:h-36">
        <div className="w-1/3 max-w-[137px] max-header:max-w-[100px]">
          <img
            className="h-auto w-full rounded-[20px]"
            src={image}
            onClick={()=> {
              navigate(`/${type === 0 ? 'webtoon' : 'webnovel'}/episodes/${url}`  , { state: { paramsData: 'refresh' } })
            }
            }
          />
        </div>
        <div className="flex-1 flex flex-col gap-3 p-1">
          <div
            className="text-xl max-sm:text-lg cursor-pointer"
            onClick={()=>
              navigate(`/${type === 0 ? 'webtoon' : 'webnovel'}/episodes/${url}`  , { state: { paramsData: 'refresh' } })
            }
          >
            {title}
          </div>
          <div className="flex gap-1 text-base max-mobileM:hidden">
            {tag?.map((tag, index) => (
              <GenreTag
                tag={tag}
                key={index}
                className="bg-white"
              />
            ))}
          </div>
          <div
            className="h-full overflow-auto text-lg max-sm:text-sm"
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
