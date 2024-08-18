import CarouselComponent from "@components/CarouselComponent/CarouselComponent";
import CarouselList from "@components/CarouselList";
import { Header } from "@components/Header";
import Ranking from "@components/Ranking";
import { WebtoonContext } from "@context/WebtoonContext";
import { ReactComponent as CalendarIcon } from "@svg/CalendarIcon.svg";
import { ReactComponent as ThumbsUpIcon } from "@svg/ThumbsUpIcon.svg";
import { ReactComponent as TrophyIcon } from "@svg/TrophyIcon.svg";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const {t} = useTranslation();
  const [width, setWidth] = React.useState(0);

  const {
    todayFreeWebtoon,
    popularWebtoon,
    millionWebtoon,
    mainBanner,
    subBanner,
    newWebtoon,
    rankingWebtoon,
  } = useContext(WebtoonContext);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial set

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Header/>
      <CarouselComponent
        images={mainBanner.map((item: any) => item.imageURL)}
        links={mainBanner.map((item: any) => item.link)}  
      />

      <div className="flex flex-col py-10 max-header:py-5">
        <div className="mx-auto w-full max-w-[1200px]">
          <CarouselList
            title={
              <Title
                title={
                  <>
                    <p className="text-alco-mint">
                      {"오늘만 무료" /*t("main.cheap-sale.header")*/}
                    </p>
                    <p>&nbsp;작품</p>
                    <div
                      className="ml-2 max-lg:ml-0 bg-yellow-500 rounded-full h-9 w-9 max-lg:scale-75"
                      style={{padding: "0.4rem"}}
                    >
                      <CalendarIcon className="fill-white max-lg:scale-90"/>
                    </div>
                  </>
                }
              />
            }
            data={todayFreeWebtoon}
            hasNav={true}
            navTo={"/webtoon/detailed/todayfree"}
            isLeft
          />
          <div className="h-10 max-lg:h-4"/>
          <CarouselList
            title={
              <Title
                title={
                  <>
                    <p className="text-alco-mint">
                      {"인기 추천" /*t("main.popular.header")*/}
                    </p>
                    <p>&nbsp;작품</p>
                    <div
                      className="ml-2 max-lg:ml-0 bg-yellow-500 rounded-full h-9 w-9 max-lg:scale-75"
                      style={{padding: "0.4rem"}}
                    >
                      <ThumbsUpIcon className="fill-white max-lg:scale-90"/>
                    </div>
                  </>
                }
              />
            }
            data={popularWebtoon}
            hasNav={true}
            double={true}
            navTo={"/webtoon/detailed/popular"}
            isSix
            isLeft
          />
          <div className="h-10 max-lg:h-4"/>
          <Ranking
            title={
              <Title
                title={
                  <>
                    <p>{"실시간" /*t("main.ranking.header")*/} </p>
                    <p className="text-alco-mint">&nbsp;랭킹</p>
                    <div
                      className="ml-2 max-lg:ml-0 bg-yellow-500 rounded-full h-9 w-9 max-lg:scale-75"
                      style={{padding: "0.4rem"}}
                    >
                      <TrophyIcon className="stroke-white max-lg:scale-90"/>
                    </div>
                  </>
                }
              />
            }
            data={rankingWebtoon}
          />
        </div>
        <div className="h-10 max-lg:h-0"/>
        <div className="my-5 max-h-[20rem]">
          <CarouselComponent
            images={subBanner.map((item: any) => item.imageURL)}
            links={subBanner.map((item: any) => item.link)}  
            isSub
          />
        </div>
        <div className="h-10 max-lg:h-0"/>
        <div className="mx-auto w-full max-w-[1200px]">
          <CarouselList
            title={
              <Title
                title={
                  <>
                    <p className="text-alco-mint">
                      {"신규" /*t("main.new-update.header")*/}
                    </p>
                    <p>&nbsp;작품</p>
                    <div
                      className="ml-2 max-lg:ml-0 bg-yellow-500 rounded-full h-9 w-9 flex justify-center items-center max-lg:scale-75"
                      style={{padding: "0.4rem"}}
                    >
                      <p
                        className="text-white text-sm"
                        style={{fontSize: "0.8rem", fontWeight: "900"}}
                      >
                        NEW
                      </p>
                    </div>
                  </>
                }
              />
            }
            data={newWebtoon}
            double={true}
            navTo="/webtoon/detailed/new"
            hasMore
            isLeft
            isSix
            hasNav={width <= 767 ? true : false}
            hasNotNav={true}
          />
          <div className="h-10 max-lg:h-4"/>
          <CarouselList
            title={
              <Title
                title={
                  <>
                    <p className="text-alco-yellow">
                      {"도전!" /*t("main.hot-romance.header")*/}
                    </p>
                    <p>&nbsp;밀리언 웹툰</p>
                    <div
                      className="ml-2 max-lg:ml-0 bg-yellow-500 rounded-full h-9 w-9 flex justify-center items-center max-lg:scale-75 opacity-0"
                      style={{padding: "0.4rem"}}
                    >
                      <p
                        className="text-white text-sm"
                        style={{fontSize: "0.8rem", fontWeight: "900"}}
                      >
                      </p>
                    </div>
                  </>
                }
              />
            }
            navTo="/webtoon/detailed/million"
            data={millionWebtoon}
            isSix
            isLeft
            hasNav={true}
          />
        </div>
      </div>
    </div>
  );
};

const Title = ({title}: { title: any }) => {
  return (
    <div className="relative flex flex-row text-[30px] font-notokr max-lg:text-base font-bold text-2xl">
      <div className="flex flex-row leading-24 justify-center items-center">
        {title}
      </div>
    </div>
  );
};
