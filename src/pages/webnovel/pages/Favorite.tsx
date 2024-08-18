import { Header } from "@components/Header";
import CarouselList from "@components/CarouselList";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@context/UserContext";

export const Favorite = () => {
  const { favoriteWebtoonData } = useContext(UserContext);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    console.log(favoriteWebtoonData);
    if (!favoriteWebtoonData) return;

    let favoriteData = favoriteWebtoonData.map((dat: any) => {
      console.log(dat);
      return {
        thumbnails: { thumbnail: dat.Webtoon.thumbnail_image },
        webtoon_name: dat.Webtoon.webtoon_name,
        webtoon_id: dat.WebtoonID,
      };
    });

    setData(favoriteData);
  }, [favoriteWebtoonData]);

  return (
    <div className="">
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header />
      </div>
      <div className="mx-auto w-alco-md">
        <CarouselList
          title={
            <div className="flex flex-row leading-24">
              <p className="text-alco-mint">{"즐겨찾기한 웹툰"}</p>
              {/*<p>&nbsp;밀리언 웹툰</p>*/}
            </div>
          }
          data={data}
        />
      </div>
    </div>
  );
};
