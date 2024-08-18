import React, {useContext, useEffect, useRef, useState} from "react";
import ePub from "epubjs";
import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { ReactComponent as PlusCircle } from "@svg/PlusCircle.svg";
import { ReactComponent as MinusCircle } from "@svg/MinusCircle.svg";
import { ReactComponent as WebnovelConfig } from "@svg/WebnovelConfig.svg";
import { ReactComponent as Home } from "@svg/Home.svg";
import { ReactComponent as WebnovelBack } from "@svg/WebnovelBack.svg";
import { ReactComponent as ResetIcon } from "@svg/ResetIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import PurchasePopup from "@components/Popup/PurchasePopup";
import {UserContext} from "@context/UserContext";
import ChargePopup from "@components/Popup/ChargePopup";

const EpubViewer = ({
  url,
  id,
  episode,
  episodeDetailsList,
  webtoonDetails,
  episodePagination,
  setEpisodePagination,
  setIsLoadingEpisodes,
  getWebtoonEpisodes,
}: {
  url: string;
  id: string;
  episode: any;
  episodeDetailsList: any;
  webtoonDetails: any;
  episodePagination: any;
  setEpisodePagination: any;
  setIsLoadingEpisodes: any;
  getWebtoonEpisodes: any;
}) => {
  const { userId } = useContext(UserContext);
  const viewerRef = useRef<any>();
  const [rendition, setRendition] = useState<any>(null);
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState<number>(3);
  const [lineHeight, setLineHeight] = useState<number>(3);
  const [margin, setMargin] = useState<number>(3);
  const [fontFamily, setFontFamily] = useState<string>("NanumBarunGothic");
  const [bgColor, setBgColor] = useState<string>("white");
  const [fontColor, setFontColor] = useState<string>("black");
  const [prevPagination, setPrevPagination] = useState(episodePagination);

  const [isOpen, setIsOpen] = useState<any>(undefined);

  const [configVisible, setConfigVisible] = useState<boolean>(false);
  const [coinPopup, setCoinPopup] = useState(false);

  useEffect(() => {
    const book = ePub(url);
    const rendition =  book.renderTo(viewerRef.current, { width: "100%", height: "100%" });
    setRendition(rendition);
    rendition.display();

    return () => {
      rendition.destroy();
    };
  }, [url]);


  useEffect(() => {
    if (rendition) {
      var defaultStyles = {
        body: {
          "font-size": `${fontSize * 5}px !important`,
          "font-family": `${fontFamily} !important`,
          color: `${fontColor} !important`,
        },
        p: {
          "line-height": `${lineHeight * 0.6}em !important`,
          "font-family": `${fontFamily} !important`,
          color: `${fontColor} !important`,
        },
      };
      rendition.themes.default(defaultStyles);
    }
  }, [fontSize, lineHeight, margin, fontFamily, fontColor]);

  useEffect(() => {
    refreshCurrentPage()
  }, [margin]);

  function refreshCurrentPage() {
    if (rendition) {
      const currentLocation = rendition.currentLocation() as any;
      if (currentLocation && currentLocation.start && currentLocation.start.cfi) {
        const currentCfi = currentLocation.start.cfi;
        rendition.display(currentCfi);
      }
    };
  }


  const handleNext = () => {
    if (rendition) {
      rendition.next();
    }
  };

  const handlePrev = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  const clickPrevEpisode = () => {
    if(Math.ceil(((Number(episode))-1) / 14) -1 !== episodePagination) {
      setEpisodePagination(Math.ceil(((Number(episode))-1) / 14)- 1)
    } else if((episodeDetailsList[(Number(episode)-2) % 14].isFree ? true : episodeDetailsList[(Number(episode)-2) % 14]?.isPurchased)) {
      navigate(`/webnovel/episodes/view/${id}/${("000" + (Number(episode) - 1)).slice(-3)}`)
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
      navigate(`/webnovel/episodes/view/${id}/${(
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
        id: id,
        UserID: userId,
        page: episodePagination,
        limit: 14,
        sort: "asc",
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
        navigate(`/webnovel/episodes/view/${id}/${("000" + (Number(episode) + 1)).slice(-3)}`)
      }
    } else if(prevPagination > episodePagination) {
      if((episodeDetailsList[(Number(episode)-2) % 14].isFree ? false : !episodeDetailsList[(Number(episode)-2) % 14]?.isPurchased)) {
        setIsOpen({
          id: id!,
          episode: ("000" + (Number(episode) - 1)).slice(-3),
          price: episodeDetailsList[(Number(episode)-2) % 14]?.price
        });
      } else {
        navigate(`/webnovel/episodes/view/${id}/${("000" + (Number(episode) - 1)).slice(-3)}`)
      }
    }
    setPrevPagination(episodePagination)
  },[episodeDetailsList])

  return (
    <>
      {coinPopup ? <ChargePopup isOpen={coinPopup} setIsOpen={setCoinPopup} /> : null }
      {isOpen && (
        <PurchasePopup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isWebtoon={false}
          fetchEpisodes={fetchEpisodes}
          setCoinPopup={setCoinPopup}
        />
      )}
      <div className="w-full h-[95vh]">
        <div
          className="flex flex-row justify-center items-center gap-5 h-full"
          style={{ background: bgColor, margin: `${margin * 5}px` }}
        >
          <ChevronLeftIcon onClick={handlePrev} className="w-12 h-12" />
          <div ref={viewerRef} className="w-4/5 p-10 h-full max-lg:p-0" />
          <div className="absolute right-20 bottom-24 flex flex-col gap-5 max-md:right-2">
            <img
              src="setting.png"
              className="cursor-pointer w-16 h-16 max-md:w-10 max-md:h-10"
              onClick={() => {
                setConfigVisible(true);
              }}
            />
            <WebnovelBack
              className="cursor-pointer w-16 h-16 max-md:w-10 max-md:h-10"
              onClick={() => {
                rendition.prev();
                rendition.prev();
                rendition.prev();
                rendition.prev();
                rendition.prev();
                rendition.prev();
                rendition.prev();
                rendition.prev();
                rendition.prev();
                rendition.prev();
              }}
            />
          </div>
          {configVisible && (
            <Config
              bg={bgColor}
              setBg={setBgColor}
              font={fontFamily}
              setFont={setFontFamily}
              fontSize={fontSize}
              fontColor={fontColor}
              setFontColor={setFontColor}
              setFontSize={setFontSize}
              lineHeight={lineHeight}
              setLineHeight={setLineHeight}
              margin={margin}
              setMargin={setMargin}
              resetConfig={() => {
                setBgColor("white");
                setFontFamily("Noto Sans KR");
                setFontSize(3);
                setFontColor("black");
                setLineHeight(3);
                setMargin(3);
              }}
              visibility={configVisible}
              setVisibility={setConfigVisible}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
            />
          )}
          <ChevronRightIcon onClick={handleNext} className="w-12 h-12" />
        </div>
        <div className="fixed bottom-0 h-16 bg-black w-full flex items-center justify-center text-white gap-20 text-2xl max-sm:text-xl max-sm:gap-0 max-sm:justify-between max-sm:px-4">
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
          <Home
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              navigate(`/webnovel/episodes/${id}`);
            }}
          />
          <div
            className={`flex flex-row justify-center items-center gap-2 cursor-pointer ${
              (webtoonDetails?.episodeCount === Number(episode)) && "invisible"
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

const Config = ({
  bg,
  setBg,
  font,
  setFont,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  lineHeight,
  setLineHeight,
  margin,
  setMargin,
  resetConfig,
  visibility,
  setVisibility,
  fontFamily,
  setFontFamily,
}: {
  bg: string;
  setBg: any;
  font: string;
  setFont: any;
  fontSize: number;
  fontColor: string;
  setFontColor: any;
  setFontSize: any;
  lineHeight: number;
  setLineHeight: any;
  margin: number;
  setMargin: any;
  resetConfig: any;
  visibility: boolean;
  setVisibility: any;
  fontFamily: string;
  setFontFamily: any;
}) => {
  const fonts = [
    "NanumBarunGothic",
    "KoPubWorldBatang",
    "NanumBarunpen",
    "Cafe24SsurroundAir",
    "GyeonggiBatang",
    "UhBeeMiMi",
  ];

  return (
    <>
      <div
        className="absolute w-full h-full"
        onClick={() => {
          setVisibility(false);
        }}
      ></div>
      <div
        className={`absolute bottom-16 right-20 bg-white text-black p-5 pt-10 gap-5 grid grid-rows-6 font-bold text-xl rounded-[20px] w-[540px] h-[468px] max-md:w-4/5 overflow-x-hidden max-md:text-base max-md:right-1/2 max-md:transform max-md:translate-x-1/2`}
        style={{
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="flex flex-row gap-2 overflow-x-scroll overflow-y-visible">
          <div className="whitespace-nowrap">배경색</div>
          <div className="ml-auto flex flex-row gap-5 max-lg:gap-2">
            <GaCircle
              fill="white"
              stroke="black"
              onClick={() => {
                setBg("white");
                setFontColor("black");
              }}
            />
            <GaCircle
              fill="#D2D2D2"
              stroke="black"
              onClick={() => {
                setBg("#D2D2D2");
                setFontColor("black");
              }}
            />
            <GaCircle
              fill="#F6EBCF"
              stroke="black"
              onClick={() => {
                setBg("#F6EBCF");
                setFontColor("black");
              }}
            />
            <GaCircle
              fill="#FEDAF4"
              stroke="black"
              onClick={() => {
                setBg("#FEDAF4");
                setFontColor("black");
              }}
            />
            <GaCircle
              fill="#B7E6FA"
              stroke="black"
              onClick={() => {
                setBg("#B7E6FA");
                setFontColor("black");
              }}
            />
            <GaCircle
              fill="#0B332F"
              stroke="#B1E3D7"
              onClick={() => {
                setBg("#0B332F");
                setFontColor("#B1E3D7");
              }}
            />
            <GaCircle
              fill="#313131"
              stroke="#BFBFBF"
              onClick={() => {
                setBg("#313131");
                setFontColor("#BFBFBF");
              }}
            />
            <GaCircle
              fill="#000000"
              stroke="white"
              onClick={() => {
                setBg("#000000");
                setFontColor("white");
              }}
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 overflow-x-scroll overflow-y-visible">
          <div className="whitespace-nowrap">글꼴</div>
          <select
            className="ml-auto"
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
            }}
          >
            {fonts.map((f: string, index:number) => {
              return <option key={index} value={f}>{f}</option>;
            })}
          </select>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="whitespace-nowrap">글자 크기</div>
          <div className="ml-auto flex flex-row gap-3 justify-center items-center text-xl gap-5 max-lg:text-base">
            <MinusCircle
              className="w-8 h-8"
              onClick={() => {
                if (fontSize > 1) setFontSize(fontSize - 1);
              }}
            />
            <div className="min-w-[13px]">{fontSize}</div>
            <PlusCircle
              className="w-8 h-8"
              onClick={() => {
                if (fontSize < 5) setFontSize(fontSize + 1);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="whitespace-nowrap">줄 간격</div>
          <div className="ml-auto flex flex-row gap-3 justify-center items-center text-xl gap-5 max-lg:text-base">
            <MinusCircle
              className="w-8 h-8"
              onClick={() => {
                if (lineHeight > 1) setLineHeight(lineHeight - 1);
              }}
            />
            <div className="min-w-[13px]">{lineHeight}</div>
            <PlusCircle
              className="w-8 h-8"
              onClick={() => {
                if (lineHeight < 5) setLineHeight(lineHeight + 1);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="whitespace-nowrap">여백</div>
          <div className="ml-auto flex flex-row gap-3 justify-center items-center text-xl gap-5 max-lg:text-base">
            <MinusCircle
              className="w-8 h-8"
              onClick={() => {
                if (margin > 1) setMargin(margin - 1);
              }}
            />
            <div className="min-w-[13px]">{margin}</div>
            <PlusCircle
              className="w-8 h-8"
              onClick={() => {
                if (margin < 5) setMargin(margin + 1);
              }}
            />
          </div>
        </div>
        <div
          className="text-center text-gray-400 flex flex-row gap-5 justify-center items-center text-xl cursor-pointer"
          onClick={() => {
            resetConfig();
          }}
        >
          설정 초기화
          <ResetIcon className="w-5 h-5" />
        </div>
      </div>
    </>
  );
};

const GaCircle = ({
  fill,
  stroke,
  onClick,
}: {
  fill: string;
  stroke: string;
  onClick: any;
}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <circle cx="20" cy="20" r="19.5" fill={fill} stroke="#8E8E8E" />
      <path
        d="M22.294 12.768H23.638V27.248H22.294V12.768ZM23.27 18.64H25.942V19.744H23.27V18.64ZM18.598 14.336H19.894C19.894 18.448 18.006 22.16 13.334 24.512L12.598 23.488C16.598 21.456 18.598 18.368 18.598 14.544V14.336ZM13.27 14.336H19.286V15.424H13.27V14.336Z"
        fill={stroke}
      />
    </svg>
  );
};

export default EpubViewer;
