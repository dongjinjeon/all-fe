import React, {useState, useContext, useEffect, useRef} from "react";
import { Header } from "@components/Header";
import { RankingContent } from "@components/RankingContent";
import { WebtoonContext } from "@context/WebtoonContext";
import { ReactComponent as TrophyIcon } from "@svg/TrophyIcon.svg";

export const Ranking = () => {
  const { genreRankingWebtoon, setRankingGenre } = useContext(WebtoonContext);
  const [width, setWidth] = useState(window.innerWidth);

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

  return (
    <div className="">
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header />
      </div>
      <div className="mx-auto max-w-[1200px] w-full max-header:px-4">
        <div className="flex flex-row mb-5">
          <div className="absoulte top-0 left-0 mt-2 font-bold text-2xl flex flex-row max-lg:text-lg">
            <div className="flex flex-row justify-center items-center leading-24 text-alco-mint">
              랭킹
            </div>
            <div
              className="ml-2 max-lg:ml-0 bg-yellow-500 rounded-full h-9 w-9 max-lg:scale-75"
              style={{ padding: "0.4rem" }}
            >
              <TrophyIcon className="stroke-white max-lg:scale-90" />
            </div>
          </div>
        </div>
        {width <= 1240 ?
          <TableHeaderMobile setRankingGenre={setRankingGenre} />
          :
          <TableHeader setRankingGenre={setRankingGenre} />
        }
        <div className="w-full bg-alco-skyblue-100 py-3 px-10 h-full h-fit max-header:px-0 max-md:max-h-full max-lg:hidden">
          <div className="grid grid-cols-4 gap-10 max-header:gap-4 max-md:grid-cols-2">
            {genreRankingWebtoon.slice(0, 4).map((dat: any, index: any) => {
              return (
                <RankingContent
                  key={index}
                  image={dat.thumbnails.thumbnail}
                  title={dat.name}
                  tags={dat.genres}
                  id={dat.id}
                  isSmall
                />
              );
            })}
          </div>
        </div>
        <div className="bg-alco-skyblue p-3 bg-opacity-50 min-h-[427.98px] max-header:p-0 max-lg:bg-transparent">
          <div
            className={`grid grid-cols-${width <= 1240 ? 3 : 5} px-5 py-5 max-header:px-0`}
            style={{
            gap: `${width <= 1024 ? 4 : width <= 1240 ? 16 : 32}px`,
          }}>
            {genreRankingWebtoon.map((dat: any, idx: number) => {
              return (
                <RankingContent
                  key={idx}
                  image={dat.thumbnails.thumbnail}
                  title={dat.name}
                  tags={dat.genres}
                  id={dat.id}
                  idx={idx + 1}
                  isBottom
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
};

const TableHeaderMobile = ({ setRankingGenre }: { setRankingGenre: any }) => {
  const genres = [
    "로맨스",
    "드라마",
    "소년/액션",
    "판타지",
    "BL",
    "로판",
    "베도",
  ];
  const genrecodes = [
    "Romance",
    "Drama",
    "Action",
    "Fantasy",
    "BLGL",
    "RomanceFantasy",
    "Challenges",
  ];
  const [current, setCurrent] = useState("로맨스");
  const [seltabidx, setSeltabidx] = useState(0);
  const categoryRef = useRef<any[]>([]);


  const onClickPrev = () => {
    if(seltabidx !== 0) {
      setSeltabidx(prevState => prevState - 1)
    }
  }

  const onClickNext = () => {
    if(seltabidx < 6) {
      setSeltabidx(prevState => prevState + 1)
    }
  }

  useEffect(()=> {
    setCurrent(genres[seltabidx]);
    setRankingGenre(genrecodes[seltabidx]);
    if (categoryRef.current) {
      categoryRef?.current[seltabidx]?.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  },[seltabidx])

  return (
    <div className="flex flex-row w-full min-h-[40px]">
      <div className={`flex w-[48px] max-sm:w-[32px] items-center justify-center cursor-pointer`} onClick={onClickPrev}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke={`${seltabidx === 0 ? '#D3D3D3' : 'black'}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m15 6-6 6 6 6"
          />
        </svg>
      </div>
      <div className="flex w-full flex-1 flex-row overflow-auto hide-scroll">
        {genres.map((genre, index: number) => (
          <div
            ref={(el) => {
              categoryRef.current[index] = el;
            }}
            key={genre}
            className="flex font-bold items-center justify-center flex-1 cursor-pointer px-4 transform-gpu transition-transform duration-300 ease-in-out"
            onClick={() => {
              setSeltabidx(index);
              setCurrent(genre);
              setRankingGenre(genrecodes[index]);
            }}
          >
            <div className={`font-bold text-[17px] font-notokr max-lg:text-base ${current === genre ? "text-alco-mint" : ""}`} style={{width: 'max-content'}}>{genre}</div>
          </div>
        ))}
      </div>
      <div className={`flex w-[48px] max-sm:w-[32px] items-center justify-center cursor-pointer`} onClick={onClickNext}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke={`${seltabidx === 6 ? '#D3D3D3' : 'black'}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m9 6 6 6-6 6"
          />
        </svg>
      </div>
    </div>
  );
};

const TableHeader = ({ setRankingGenre }: { setRankingGenre: any }) => {
  const genres = [
    "로맨스",
    "드라마",
    "소년/액션",
    "판타지",
    "BL",
    "로판",
    "베도",
  ];
  const genrecodes = [
    "Romance",
    "Drama",
    "Action",
    "Fantasy",
    "BLGL",
    "RomanceFantasy",
    "Challenges",
  ];
  const [current, setCurrent] = useState("로맨스");

  return (
    <>
      <div
        className="bg-[#EFEFEF] grid grid-cols-7 h-[60px] max-sm:grid-cols-4 max-sm:h-fit max-sm:py-4"
        style={{ borderRadius: "20px 20px 0px 0px" }}
      >
        {genres.map((genre, index: number) => (
          <h2
            key={genre}
            className="col-span-1 font-bold mb-4 flex items-center justify-center h-full cursor-pointer"
            onClick={() => {
              setCurrent(genre);
              setRankingGenre(genrecodes[index]);
            }}
          >
            <div
              className={`flex items-center justify-center h-10 w-[70px] ${
                current === genre ? "text-white bg-alco-gold " : ""
              }`}
              style={{ borderRadius: "100px" }}
            >
              <p className="font-bold text-[17px] font-notokr max-lg:text-base"> {genre}</p>
            </div>
          </h2>
        ))}
      </div>
    </>
  );
};
