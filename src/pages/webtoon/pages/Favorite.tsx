import { Header } from "@components/Header";
import CarouselList from "@components/CarouselList";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@context/UserContext";
import { useNavigate } from "react-router-dom";

export const Favorite = () => {
  const navigate = useNavigate();
  const { favoriteWebtoonData, userId } = useContext(UserContext);

  useEffect(() => {
    if (userId === -1) navigate("/login");
  }, []);

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
          data={favoriteWebtoonData}
        />
      </div>
    </div>
  );
};
