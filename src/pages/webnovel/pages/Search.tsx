import { Header } from "@components/Header";
import CarouselList from "@components/CarouselList";
import { useContext, useEffect } from "react";
import { WebnovelContext } from "@context/WebnovelContext";
import { useParams } from "react-router-dom";

export const Search = () => {
  const { searchResultWebnovels, searchWebnovelByKeyword } =
    useContext(WebnovelContext);
  const { keyword } = useParams();

  useEffect(() => {
    if (keyword) searchWebnovelByKeyword(keyword);
  }, [keyword]);

  return (
    <div className="">
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header />
      </div>
      <div className="mx-auto w-full max-w-[1200px] max-header:px-4">
        <CarouselList
          title={
            <div className="flex flex-row leading-24">
              <p className="text-alco-mint">{keyword} 에 대한 검색 결과</p>
              {/*<p>&nbsp;밀리언 웹툰</p>*/}
            </div>
          }
          data={searchResultWebnovels}
          hasNav={true}
          noMoreText={true}
        />
      </div>
    </div>
  );
};
