import React, {useEffect, useContext, useState} from "react";
import {Header} from "@components/Header";
import {ListedContent} from "@components/ListedContent";
import {WebtoonContext} from "@context/WebtoonContext";

export const Listed = () => {
  const {mon, tue, wed, thu, fri, sat, sun} = useContext(WebtoonContext);
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const daysOfWeeks = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date().getDay() === 0 ? 7 : new Date().getDay();

  const webtoons = [mon, tue, wed, thu, fri, sat, sun];

  const [current, setCurrent] = useState("로맨스");
  const [seltabidx, setSeltabidx] = useState(today - 1);

  const onClickPrev = () => {
    if (seltabidx !== 0) {
      setSeltabidx(prevState => prevState - 1)
    }
  }

  const onClickNext = () => {
    if (seltabidx < 6) {
      setSeltabidx(prevState => prevState + 1)
    }
  }

  useEffect(() => {
    setCurrent(daysOfWeek[seltabidx]);
  }, [seltabidx])

  return (
    <div className="">
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header/>
      </div>
      <div className="mx-auto px-4 max-w-[1200px] w-full">
        <div className="flex flex-row mb-5">
          <div className="absoulte top-0 left-0 mt-2 font-bold text-2xl flex flex-row max-lg:text-lg">
            <div className="flex flex-row justify-center items-center leading-24 text-alco-mint">
              연재
            </div>
            <div className="ml-2 max-lg:ml-0 bg-yellow-500 rounded-full h-9 w-9 max-lg:scale-75">
              <img src="/listcal.png" className="max-lg:scale-90"/>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden overflow-x-scroll px-4">
        <div className="flex-col hidden max-header:flex">
          <div className="flex flex-row w-full min-h-[40px] mb-5 ">
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
              {daysOfWeek.map((day, index: number) => (
                <div
                  key={day}
                  className="flex font-bold items-center justify-center flex-1 cursor-pointer transform-gpu transition-transform duration-300 ease-in-out"
                  onClick={() => {
                    setSeltabidx(index);
                    setCurrent(day);
                  }}
                >
                  <div
                    className={`font-bold text-[17px] font-notokr max-lg:text-base ${current === day ? "text-alco-mint" : ""}`}
                    style={{width: 'max-content'}}>{day}</div>
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
          <div className="grid grid-cols-3 gap-1 pb-4">
            {webtoons[seltabidx].map((data: any, index: any) => {
              return (
                <ListedContent
                  key={index}
                  type={'webtoon'}
                  image={data.thumbnails.thumbnail}
                  title={data.name}
                  tags={data.genres}
                  id={data.id}
                />
              );
            })}
          </div>
        </div>
        <div className="mx-auto w-[1200px] px-4 flex-col flex max-header:hidden">
          <div className="relative">
            <div
              className={`absolute h-full z-10`}
              style={{
                border: "2.5px solid #3FC1BE",
                borderRadius: "20px",
                width: "14.28%",
                left: `${14.28 * ((today + 6) % 7)}%`,
              }}
            />

            <div
              className="relative bg-[#EFEFEF] grid grid-cols-7 mb-5 z-0 h-[60px] font-notokr"
              style={{borderRadius: "20px 20px 0px 0px"}}
            >
              {daysOfWeek.map((day) => (
                <h2
                  key={day}
                  className="col-span-1 mb-4 flex items-center justify-center h-full font-medium"
                >
                  <div
                    className={`flex items-center justify-center h-10 w-[80px] ${
                      daysOfWeeks[today] === day ? "text-white bg-alco-mint" : ""
                    }`}
                    style={{borderRadius: "100px"}}
                  >
                    <p className="text-[20px] font-notokr"> {day}</p>
                  </div>
                </h2>
              ))}
            </div>
            <div className="grid grid-cols-7 z-10">
              {webtoons.map((data: any, index: any) => {
                return (
                  <div key={index} className="flex flex-col gap-8 px-[0.25rem]">
                    {data.map((dat: any, index: any) => (
                      <ListedContent
                        key={index}
                        type={'webtoon'}
                        image={dat.thumbnails.thumbnail}
                        title={dat.name}
                        tags={dat.genres}
                        id={dat.id}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-24"/>
    </div>
  );
};
