import { Header } from "@components/Header";
import CarouselComponent from "@components/CarouselComponent/CarouselComponent";
import { ReactComponent as CalendarIcon } from "@svg/CalendarIcon.svg";
import { ReactComponent as ThumbsUpIcon } from "@svg/ThumbsUpIcon.svg";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { WebnovelContext } from "@context/WebnovelContext";
import { useParams } from "react-router-dom";
import { Content2 } from "@components/Content2";

export const Detailed = () => {
  const { t } = useTranslation();

  const { type } = useParams<{ type: string }>();

  const {todayFreeWebnovel, popularWebnovel, newWebnovel, mainBanner, millionWebnovel} =
    useContext(WebnovelContext);

  const [title, setTitle] = useState<any>();
  const [data, setData] = useState<any>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (type === "todayfree") {
      setTitle(
        <Title
          title={
            <>
              <p className="text-alco-mint">
                {"오늘만 무료" /*t("main.cheap-sale.header")*/}
              </p>
              <p>&nbsp;작품</p>
              <div
                className="ml-5 max-lg:ml-1 bg-yellow-500 rounded-full h-9 w-9 max-lg:scale-75"
                style={{ padding: "0.4rem" }}
              >
                <CalendarIcon className="fill-white max-lg:scale-90" />
              </div>
            </>
          }
        />
      );
      setData(todayFreeWebnovel);
    } else if (type === "popular") {
      setTitle(
        <Title
          title={
            <>
              <p className="text-alco-mint">
                {"인기 추천" /*t("main.popular.header")*/}
              </p>
              <p>&nbsp;작품</p>
              <div
                className="ml-5 max-lg:ml-1 bg-yellow-500 rounded-full h-9 w-9 max-lg:scale-75"
                style={{ padding: "0.4rem" }}
              >
                <ThumbsUpIcon className="fill-white max-lg:scale-90" />
              </div>
            </>
          }
        />
      );
      setData(popularWebnovel);
    } else if (type === "new") {
      setTitle(
        <Title
          title={
            <>
              <p className="text-alco-mint">
                {"신규" /*t("main.new-update.header")*/}
              </p>
              <p>&nbsp;작품</p>
              <div
                className="ml-5 max-lg:ml-1 bg-yellow-500 rounded-full h-9 w-9 flex justify-center items-center max-lg:scale-75"
                style={{ padding: "0.4rem" }}
              >
                <p
                  className="text-white text-sm"
                  style={{ fontSize: "0.8rem", fontWeight: "900" }}
                >
                  NEW
                </p>
              </div>
            </>
          }
        />
      );
      setData(newWebnovel);
    }  else if (type === "million") {
      setTitle(
        <Title
          title={
            <>
              <p className="text-alco-mint">
                {"도전"}
              </p>
              <p>&nbsp;밀리언 웹툰</p>
            </>
          }
        />
      );
      setData(millionWebnovel);
    }
  }, [type]);

  useEffect(() => {
    if (type !== "todayfree") return;
    if (search !== "") {
      let data = todayFreeWebnovel.filter((dat: any) => {
        if (dat.novel_name.includes(search)) return dat;
      });
      setData(data);
    }
    if (search === "") setData(todayFreeWebnovel);
  }, [type, search, todayFreeWebnovel]);

  useEffect(() => {
    if (type !== "popular") return;
    if (search !== "") {
      let data = popularWebnovel.filter((dat: any) => {
        if (dat.novel_name.includes(search)) return dat;
      });
      setData(data);
    }
    if (search === "") setData(popularWebnovel);
  }, [type, search, popularWebnovel]);

  useEffect(() => {
    if (type !== "new") return;
    if (search !== "") {
      let data = newWebnovel.filter((dat: any) => {
        if (dat.novel_name.includes(search)) return dat;
      });
      setData(data);
    }
    if (search === "") setData(newWebnovel);
  }, [type, search, newWebnovel]);

  useEffect(() => {
    if (type !== "million") return;
    if (search !== "") {
      let data = millionWebnovel.filter((dat: any) => {
        if (dat.novel_name.includes(search)) return dat;
      });
      setData(data);
    }
    if (search === "") setData(millionWebnovel);
  }, [type, search, millionWebnovel]);

  return (
    <div className="">
      <div className="">
        <Header />
        <CarouselComponent
          images={mainBanner?.map((item: any) => {
            return item.imageURL;
          })}
        />
      </div>
      <div className="flex flex-col">
        <div className="mx-auto w-full max-w-[1200px] max-header:px-4 max-header:mx-0">
          <div
            className="text-center mt-1 text-sm"
            style={{
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            {title}
          </div>
          <div className="mb-3 gap-2 font-notokr col-start-2 col-span-1 flex flex-row items-center flex-wrap">


            <div className="ml-auto px-5 w-96 h-[2.5rem] flex flex-row bg-[#FAFAFA] rounded-[16px] border-2 border-[#D0D0D0] max-md:w-full">
              <input
                className="w-full bg-[#FAFAFA] outline-none"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <MagGlass />
            </div>
          </div>
          <div className="grid grid-cols-2 max-header:grid-cols-1 gap-1">
            {data?.map((item: any, index: any) => {
              return <Content2 key={index} dat={item} />;
            })}
          </div>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
};

const Title = ({ title }: { title: any }) => {
  return (
    <div className="font-bold relative flex flex-row text-[30px] font-notokr my-10 max-lg:text-base font-bold text-2xl max-header:my-5">
      <div className="flex flex-row leading-24 justify-center items-center">
        {title}
      </div>
    </div>
  );
};

const MagGlass = () => {
  return (
    <svg
      className="ml-auto my-auto"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.3333"
        cy="15.3333"
        r="10.3333"
        stroke="#BDBDBD"
        strokeWidth="2"
      />
      <path
        d="M22.6667 22.6666L26.6667 26.6666"
        stroke="#BDBDBD"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
