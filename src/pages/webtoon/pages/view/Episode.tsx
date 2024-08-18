import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWebtoonViewer } from "@hooks/useWebtoonViewer";
import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { ReactComponent as Home } from "@svg/Home.svg";
import { ReactComponent as Logo } from "@svg/LogoColor.svg";
import PurchasePopup from "@components/Popup/PurchasePopup";
import { Loading } from "@components/Loading";
import {UserContext} from "@context/UserContext";
import ChargePopup from "@components/Popup/ChargePopup";

export const Episode = () => {
  const { userId, session_token } = useContext(UserContext);
  const { id, episode } = useParams();
  const { webtoonDetails, episodeCuts, getEpisodeCuts, episodeDetailsList, getWebtoonEpisodes, episodePagination, isLoadingEpisodes, isLoadingCuts, setEpisodePagination, setIsLoadingEpisodes } =
    useWebtoonViewer(id!);


  const [contentRef, setContentRef] = useState<any>();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<any>(undefined);
  const [prevPagination, setPrevPagination] = useState(episodePagination);

  const [coinPopup, setCoinPopup] = useState(false);

  useEffect(() => {
    getEpisodeCuts(`${id}_E${episode}`);
  }, [id, episode]);

  const moveWebtoonFront = () => {
    navigate(`/webtoon/episodes/${id}`);
  };

  const moveHome = () => {
    navigate(`/webtoon`);
  };

  const clickPrevEpisode = () => {
    if(Math.ceil(((Number(episode))-1) / 14) -1 !== episodePagination) {
      setEpisodePagination(Math.ceil(((Number(episode))-1) / 14)- 1)
    } else if((episodeDetailsList[(Number(episode)-2) % 14].isFree ? true : episodeDetailsList[(Number(episode)-2) % 14]?.isPurchased)) {
      navigate(`/webtoon/episodes/view/${id}/${("000" + (Number(episode) - 1)).slice(-3)}`)
    } else {
      setIsOpen({
        id: id!,
        episode: ("000" + (Number(episode) - 1)).slice(-3),
        price: episodeDetailsList[Number(episode) % 14].price
      });
    }
  }

  const clickNextEpisode = () => {
    if(Math.ceil(((Number(episode))+1) / 14) -1 !== episodePagination) {
      setEpisodePagination(Math.ceil(((Number(episode))+1) / 14)- 1)
    } else if((episodeDetailsList[(Number(episode) % 14)].isFree ? true : episodeDetailsList[(Number(episode) % 14)]?.isPurchased)) {
      navigate(`/webtoon/episodes/view/${id}/${(
        "000" +
        (Number(episode) + 1)
      ).slice(-3)}`)
    } else {
      setIsOpen({
        id: id!,
        episode: ("000" + (Number(episode) + 1)).slice(-3),
        price: episodeDetailsList[Number(episode) % 14].price
      });
    }
  }

  const fetchEpisodes = async () => {
    setIsLoadingEpisodes(true);
    try {
      await getWebtoonEpisodes({
        id: id!,
        page: episodePagination,
        limit: 14,
        sort: "asc",
        token: session_token,
      })
    } catch (error) {
      console.error('fetchEpisodes Error:', error);
    } finally {
      setIsLoadingEpisodes(false);
    }
  };

  useEffect(()=> {
    if(prevPagination < episodePagination) {
      if((episodeDetailsList[Number(episode) % 14].isFree ? false : !episodeDetailsList[Number(episode) % 14]?.isPurchased)) {
        setIsOpen({
          id: id!,
          episode: ("000" + (Number(episode) + 1)).slice(-3),
          price: episodeDetailsList[Number(episode) % 14].price
        });
      } else {
        navigate(`/webtoon/episodes/view/${id}/${("000" + (Number(episode) + 1)).slice(-3)}`)
      }
    } else if(prevPagination > episodePagination) {
      if((episodeDetailsList[(Number(episode)-2) % 14].isFree ? false : !episodeDetailsList[(Number(episode)-2) % 14]?.isPurchased)) {
        setIsOpen({
          id: id!,
          episode: ("000" + (Number(episode) - 1)).slice(-3),
          price: episodeDetailsList[(Number(episode)-2) % 14]?.price
        });
      } else {
        navigate(`/webtoon/episodes/view/${id}/${("000" + (Number(episode) - 1)).slice(-3)}`)
      }
    }
    setPrevPagination(episodePagination)
  },[episodeDetailsList])

  return (
    <>
      {coinPopup ? <ChargePopup isOpen={coinPopup} setIsOpen={setCoinPopup} /> : null }
      {isOpen && (
        <PurchasePopup isOpen={isOpen} setIsOpen={setIsOpen} isWebtoon={true} fetchEpisodes={fetchEpisodes} setCoinPopup={setCoinPopup} />
      )}
      {isLoadingEpisodes || isLoadingCuts ?
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-50">
          <Loading />
        </div>
        : null}
      <div
        className="flex items-center justify-center flex-col text-white"
        ref={contentRef}
      >
        <div
          className="h-16 bg-black w-full flex items-center justify-center"
          style={{ fontFamily: "Noto Sans KR", fontWeight: "900" }}
        >
          <div className="w-alco-md mx-auto flex flex-row items-center justify-center max-header:px-4 max-header:gap-4">
            <Logo className="w-12 h-12 min-w-[48px]" onClick={moveHome} />
            <div className="text-center justify-center items-center mx-auto text-ellipsis-2-line">
              {episodeCuts?.name}
            </div>
          </div>
        </div>
        {episodeCuts.cuts.map((item: any, index:number) => {
          return <img key={index} src={item} />;
        })}
        <div className="fixed bottom-0 h-16 bg-black w-full flex items-center justify-center text-white gap-20 text-2xl max-sm:text-xl max-sm:gap-0 max-sm:justify-between max-sm:px-4">
          {/*{need2BuyPrev ?*/}
            <div
              className={`flex flex-row justify-center items-center gap-2 cursor-pointer ${
                Number(episode) !== 1 ? "" : "invisible"
              }`}
              style={{ fontFamily: "Noto Sans KR", fontWeight: "500" }}
              onClick={() => clickPrevEpisode()
            }
            >
              <ChevronLeftIcon className="stroke-white w-8 h-8 max-sm:w-6 max-sm:h-6" />
              이전화
            </div>
          <Home className="w-8 h-8 cursor-pointer" onClick={moveWebtoonFront} />
          <div
            className={`flex flex-row justify-center items-center gap-2 cursor-pointer ${
              (webtoonDetails?.episodeCount === Number(episode) && episodeCuts?.cuts.length > 0) && "invisible"
            }`}
            style={{ fontFamily: "Noto Sans KR", fontWeight: "500" }}
            onClick={() => clickNextEpisode()}
          >
            다음화
            <ChevronRightIcon className="stroke-white w-8 h-8 max-sm:w-6 max-sm:h-6" />
          </div>
        </div>
      </div>
    </>
  );
};
