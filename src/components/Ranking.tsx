import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "../svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "../svg/ChevronRight.svg";
import { GenreTag } from "./GenreTag";
import { MainRankingPlaceholder } from "./WebtoonPlaceholder";

const Ranking = ({
  data,
  title,
  isWebnovel,
  hideButton,
}: {
  data: any;
  title: any;
  isWebnovel?: boolean;
  hideButton?:boolean;
}) => {
  const [contentType, setContentType] = useState(
    isWebnovel ? "webnovel" : "webtoon"
  );

  const [width,setWidth]=useState(0);
  const [rankData, setRankData] = useState(data);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const prevImages = data.slice(
    currentImageIndex > 0 ? currentImageIndex - 1 : data.length - 1,
    currentImageIndex > 0 ? currentImageIndex + 4 : data.length
  );

  const nextImages = data.slice(currentImageIndex + 1, currentImageIndex + 6);

  const handleClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? data.length - 1 : currentImageIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(
      currentImageIndex === data.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  // useEffect(()=>{
  //   if(window.innerWidth <= 1240){
  //     let sortdata = data.sort((a:any,b:any)=>{
  //       return a.rank - b.rank
  //     })
  //     setRankData(sortdata)
  //   }
  // },[]);
  //
  useEffect(()=>{
    setRankData(data)
    // if(width <= 1240){
    //   let sortdata = data.sort((a:any,b:any)=>{
    //     return a.rank - b.rank
    //   })
    //   setRankData(sortdata)
    // } else {
    //   setRankData(data)
    // }
  },[data, width]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    const time = setTimeout(() => {
      setWidth(window.innerWidth);
    }, 1);

    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth);
      });

      clearTimeout(time);
    };
  }, []);

  const RankingContent = ({
    image,
    title,
    rank,
    genres,
    id,
  }: {
    image: any;
    title: string;
    rank: number;
    genres: any;
    id: number;
  }) => {
    return (
      <div
        className="flex w-full p-3 max-md:p-0 max-md:flex-col"
        onClick={() => {
          navigate(`/${contentType}/episodes/${id}`);
        }}
      >
        <div className="w-1/2 relative max-md:w-full">
          <div className="p-4 max-header:p-[2px]">
            {" "}
            <img src={image} alt="" className="w-full rounded-xl" />
          </div>
          <div
            className={`absolute bottom-0 p-2 ml-[-1.5rem] leading-[5rem] ${
              rank === 1 ? "text-alco-gold" : "text-alco-mint"
            } text-[6rem] max-md:ml-[-1rem] max-md:text-[4rem] max-md:leading-[3rem]`}
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: "900",
            }}
          >
            {rank}
          </div>
        </div>
        <div className="w-1/2 p-4 flex justify-center flex-col max-header:p-[2px] max-md:w-full">
          <h3 className="text-lg font-bold mb-2 text-left truncate max-md:font-normal max-md:text-xs">{title}</h3>
          <div className="flex items-center gap-1 overflow-auto hide-scroll">
            {genres.map((tag: any, index: number) => (
              <GenreTag tag={tag} key={index} fontSize="0.6rem" />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex flex-row pl-8">
        <div className="absoulte top-0 left-0 mt-2">
          {title}
        </div>
      </div>
      <div className="flex flex-row">
        {hideButton ?<button onClick={handlePrev}>
          <ChevronLeftIcon className="h-8 w-8" />
        </button> : <div className="h-8 w-8 max-md:h-5 max-md:w-5" />}
        <div className={`grid grid-cols-3 justify-center w-full max-md:justify-normal gap-y-3`}>
          {rankData?.map((dat: any, index: number) => {
            return (
              <RankingContent
                key={index}
                image={dat.thumbnails.thumbnail}
                title={dat.name}
                genres={dat.genres}
                rank={dat.rank}
                id={dat.id}
              />
            );
          })}
          {/*{width <= 767 ?*/}
          {/*  rankData?.slice(0,3)?.map((dat: any, index: number) => {*/}
          {/*    return (*/}
          {/*      <RankingContent*/}
          {/*        key={index}*/}
          {/*        image={dat.thumbnails.thumbnail}*/}
          {/*        title={dat.name}*/}
          {/*        genres={dat.genres}*/}
          {/*        rank={dat.rank}*/}
          {/*        id={dat.id}*/}
          {/*      />*/}
          {/*    );*/}
          {/*  })*/}
          {/*  :*/}
          {/*  rankData?.map((dat: any, index: number) => {*/}
          {/*    return (*/}
          {/*      <RankingContent*/}
          {/*        key={index}*/}
          {/*        image={dat.thumbnails.thumbnail}*/}
          {/*        title={dat.name}*/}
          {/*        genres={dat.genres}*/}
          {/*        rank={dat.rank}*/}
          {/*        id={dat.id}*/}
          {/*      />*/}
          {/*    );*/}
          {/*  })*/}
          {/*}*/}
        </div>
        {hideButton ?<button onClick={handleNext}>
          <ChevronRightIcon className="h-8 w-8 " />
        </button> : <div className="h-8 w-8 max-md:h-5 max-md:w-5" />}
      </div>
    </div>
  );
};

export default Ranking;
