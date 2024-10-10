import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

interface CarouselListProps {
  data: any[];
  title: React.ReactNode;
  hasNav?: boolean;
  hasMore?: boolean;
  double?: boolean;
  navTo?: string;
  isEName?: boolean;
  isSix?: boolean;
  isBought?: boolean;
  isLeft?: boolean;
  hasNotNav?: boolean;
  noMoreText?: boolean;
  setExpiredPopup?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CarouselList: React.FC<CarouselListProps> = ({
  data,
  title,
  hasNav,
  hasMore,
  double,
  navTo,
  isEName,
  isSix,
  isBought,
  isLeft,
  hasNotNav,
  noMoreText,
  setExpiredPopup,
}) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth); // Initialize with window width
  const location = useLocation();
  const {t} = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  interface CarouselContentProps {
    image: string;
    title: string;
    id: string;
    isWebtoon: number;
    isSix?: boolean;
    isBought?: boolean;
    data: any;
    setExpiredPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const CarouselContent: React.FC<CarouselContentProps> = ({
    image,
    title,
    id,
    isWebtoon,
    isSix,
    isBought,
    data,
    setExpiredPopup,
  }) => {
    const handleClick = () => {
      if (isBought) {
        if (data?.ExpiredAt !== "None" && new Date() > new Date(data?.ExpiredAt.replace(/-/g, '/'))) {
          setExpiredPopup?.(true);  // 옵셔널 체이닝 연산자 사용
        } else {
          navigate(
            isEName
              ? `/${isWebtoon && isWebtoon === 1 ? "webnovel" : "webtoon"}/episodes/view/${id.split("_")[0]}/${data?.webtoon_id?.split("_E")[1]}`
              : `/${isWebtoon && isWebtoon === 1 ? "webnovel" : "webtoon"}/episodes/view/${id}/${data?.webtoon_id?.split("_E")[1]}`
          );
        }
      } else {
        navigate(
          isEName
            ? `/${isWebtoon && isWebtoon === 1 ? "webnovel" : "webtoon"}/episodes/${id.split("_")[0]}`
            : isWebtoon ? `/${isWebtoon === 1 ? "webnovel" : "webtoon"}/episodes/view/${id}/${data?.webtoon_id?.split("_E")[1]}` : `/${location.pathname.includes("webnovel") ? "webnovel" : "webtoon"}/episodes/${id}`
        );
      }
    };

    return (
      <div
        className={`p-2 max-md:p-[2px] max-md:mb-1 ${width <= 767 ? 'min-w-[33.3%] max-w-[33.3%]' : 'min-w-[20%] max-w-[20%]'}`}
        onClick={handleClick} // Ensures that clicking triggers navigation
      >
        <img
          className="rounded-[20px] w-full"
          src={image}
        />
        <div className="text-left mt-1 text-base text-ellipsis-2-line max-md:text-xs">
          {isBought ? data.Name : title}
        </div>
        {isBought && data?.webtoon_id ? (
          <div className="text-left mt-1 text-sm text-gray-400">
            {`${Number(data?.webtoon_id?.split("_E")[1])}화 | ${
              data?.PurchaseType === 0 ? "구매함" : "대여중"
            }`}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="flex justify-center flex-col">
      <div className={`flex flex-row mb-3 max-lg:mb-0`}>
        <div className={`absolute top-0 left-0 font-bold text-2xl w-full ${isLeft && "pl-8 max-lg:pl-5"}`}>
          {title}
        </div>
        {(hasNav || hasMore) && !noMoreText && (
          <button
            className="font-bold mt-auto ml-auto text-alco-gray-300 text-base mr-7 w-20 max-lg:text-sm max-lg:mt-0"
            onClick={() => navigate(navTo!)}
          >
            {t("common.see-more")}
          </button>
        )}
      </div>
      <div className="flex flex-row">
        {hasNav && data?.length > 0 && !hasNotNav && (
          <button onClick={handlePrev}>
            <ChevronLeftIcon className="h-8 w-8 max-md:h-5 max-md:w-5 stroke-alco-gray-500"/>
          </button>
        )}
        <div className={`relative overflow-hidden w-full ${!hasNav ? (isEName ? "" : "px-8") : ""}`}>
          <div
            className={`flex ${double ? "flex-col" : "flex-row"} transform-gpu transition-transform duration-300 ease-in-out`}
            style={{
              transform: `translateX(-${width <= 767 ? currentImageIndex * 33.3 : currentImageIndex * 20}%)`,
            }}
          >
            {!double && data.map((dat, index) => (
              <CarouselContent
                key={index}
                image={dat.thumbnails.thumbnail}
                title={dat.webtoon_name}
                id={dat.webtoon_id}
                isWebtoon={dat.ContentType}
                isSix={isSix}
                isBought={isBought}
                data={dat}
                setExpiredPopup={setExpiredPopup}
              />
            ))}
            {double && (
              <>
                <div className="flex flex-row">
                  {data.slice(0, data.length / 2).map((dat, index) => (
                    <CarouselContent
                      key={index}
                      image={dat.thumbnails.thumbnail}
                      title={dat.webtoon_name}
                      id={dat.webtoon_id}
                      isWebtoon={dat.ContentType}
                      isSix={isSix}
                      isBought={isBought}
                      data={dat}
                      setExpiredPopup={setExpiredPopup}
                    />
                  ))}
                </div>
                <div className="flex flex-row">
                  {data.slice(data.length / 2).map((dat, index) => (
                    <CarouselContent
                      key={index}
                      image={dat.thumbnails.thumbnail}
                      title={dat.webtoon_name}
                      id={dat.webtoon_id}
                      isWebtoon={dat.ContentType}
                      isSix={isSix}
                      isBought={isBought}
                      data={dat}
                      setExpiredPopup={setExpiredPopup}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {hasNav && data?.length > 0 && !hasNotNav && (
          <button onClick={handleNext}>
            <ChevronRightIcon className="h-8 w-8 max-md:h-5 max-md:w-5 stroke-alco-gray-500"/>
          </button>
        )}
      </div>
    </div>
  );
};

export default CarouselList;
