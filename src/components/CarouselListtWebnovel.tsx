import React, {useState, useEffect} from "react";
import {ReactComponent as ChevronLeftIcon} from "@svg/ChevronLeft.svg";
import {ReactComponent as ChevronRightIcon} from "@svg/ChevronRight.svg";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CarouselList = ({
                        data,
                        title,
                        hasNav,
                        double,
                        navTo,
                        isEName,
                        isSix,
                        isLeft,
                        hasNotNav,
                      }: {
  data: any;
  title: any;
  hasNav?: boolean;
  double?: boolean;
  navTo?: string;
  isEName?: boolean;
  isSix?: boolean;
  isLeft?: boolean;
  hasNotNav?: boolean,
}) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const {t} = useTranslation();

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

  const handleClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrev = () => {
    if (double) {
      if (width <= 767) {
        setCurrentImageIndex(
          currentImageIndex === 0 ? data.length / 2 - 3 : currentImageIndex - 1
        );
      } else {
        setCurrentImageIndex(
          currentImageIndex === 0 ? data.length / 2 - 5 : currentImageIndex - 1
        );
      }
    } else {
      if (width <= 767) {
        setCurrentImageIndex(currentImageIndex === 0 ? data.length - 3 : currentImageIndex - 1);
      } else {
        setCurrentImageIndex(
          currentImageIndex === 0 ? data.length - 5 : currentImageIndex - 1
        );
      }
    }
  };

  const handleNext = () => {
    if (double) {
      if (width <= 767) {
        setCurrentImageIndex(
          currentImageIndex === data.length / 2 - 3 ? 0 : currentImageIndex + 1
        );
      } else {
        setCurrentImageIndex(
          currentImageIndex === data.length / 2 - 5 ? 0 : currentImageIndex + 1
        );
      }
    } else {
      if (width <= 767) {
        setCurrentImageIndex(
          currentImageIndex === data.length - 3 ? 0 : currentImageIndex + 1
        );
      } else {
        setCurrentImageIndex(
          currentImageIndex === data.length - 5 ? 0 : currentImageIndex + 1
        );
      }
    }
  };

  const Single = ({isSix}: { isSix?: boolean }) => {
    return data.map((dat: any, index: number) => {
      return (
        <CarouselContent
          key={index}
          image={dat.thumbnails.thumbnail}
          title={dat.webtoon_name ? dat.webtoon_name : dat.novel_name}
          id={dat.novel_id}
          isSix={isSix}
        />
      );
    });
  };

  const Double = ({isSix}: { isSix?: boolean }) => {
    return (
      <>
        <div className="flex flex-row">
          {data.slice(0, data.length / 2).map((dat: any, index: number) => {
            return (
              <CarouselContent
                key={`${index}a`}
                image={dat.thumbnails.thumbnail}
                title={dat.webtoon_name ? dat.webtoon_name : dat.novel_name}
                id={dat.novel_id}
                isSix={isSix}
              />
            );
          })}
        </div>
        <div className="flex flex-row">
          {data
            .slice(data.length / 2, data.length)
            .map((dat: any, index: number) => {
              return (
                <CarouselContent
                  key={`${index}a`}
                  image={dat.thumbnails.thumbnail}
                  title={dat.webtoon_name ? dat.webtoon_name : dat.novel_name}
                  id={dat.novel_id}
                  isSix={isSix}
                />
              );
            })}
        </div>
      </>
    );
  };

  const CarouselContent = ({
                             image,
                             title,
                             id,
                             isSix,
                           }: {
    image: any;
    title: string;
    id: string;
    isSix?: boolean;
  }) => {
    return (
      <div
        className={`${'h-full'} p-2 max-md:p-[2px] max-md:mb-1 ${width <= 767 ? 'min-w-[33.3%] max-w-[33.3%]' : 'min-w-[20%] max-w-[20%]'}`}
        onClick={() => {
          navigate(`/webnovel/episodes/${id}`);
        }}
      >
        <img
          className="rounded-[20px] w-full"
          src={image}
        />
        <div
          className="text-left mt-1 text-base text-ellipsis-2-line max-md:text-xs"
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
          }}
        >
          {title}
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex justify-center flex-col"
      style={{
        fontFamily: "'Noto Sans KR', sans-serif",
      }}
    >
      <div className={`flex flex-row mb-3 max-lg:mb-0 ${!isEName && "pl-8 max-lg:pl-5"}`}>
        <div
          className={`absoulte top-0 left-0 font-bold text-2xl w-full ${
            isLeft && "pl-8 max-lg:pl-5"
          }`}
        >
          {title}
        </div>
        {hasNav && (
          <button
            className={`font-bold font-notokr mt-auto ml-auto text-alco-gray-300 text-base mr-7 w-20 max-lg:text-sm max-lg:mt-0 max-lg:max:my-auto`}
            onClick={() => {
              navigate(navTo!);
            }}
          >
            {t("common.see-more")}
          </button>
        )}
      </div>
      <div className="flex flex-row">
        {hasNav && data?.length > 0 && (hasNotNav ? <div className="h-8 w-8 max-md:h-4 max-md:w-4"></div> :
            <button onClick={handlePrev}>
              <ChevronLeftIcon className="h-8 w-8 max-md:h-5 max-md:w-5 stroke-alco-gray-500"/>
            </button>
        )}
        <div
          className={`relative overflow-hidden w-full ${
            !hasNav ? (isEName ? "" : "px-8") : ""
          }`}
        >
          <div
            className={`flex ${
              double ? "flex-col" : "flex-row"
            } transform-gpu transition-transform duration-300 ease-in-out`}
            style={{
              transform: `translateX(-${width <= 767 ? currentImageIndex * 33.3 : currentImageIndex * 20}%)`,
            }}
          >
            {!double && <Single isSix={isSix}/>}
            {double && <Double isSix={isSix}/>}
          </div>
        </div>
        {hasNav && data?.length > 0 && (hasNotNav ? <div className="h-8 w-8 max-md:h-4 max-md:w-4"></div> :
            <button onClick={handleNext}>
              <ChevronRightIcon className="h-8 w-8 max-md:h-5 max-md:w-5 stroke-alco-gray-500"/>
            </button>
        )}
      </div>
    </div>
  );
};

export default CarouselList;
