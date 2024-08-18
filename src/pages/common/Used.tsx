import { Header } from "@components/Header";
import { ReactComponent as Hamburger } from "@svg/Hamburger.svg";
import { ReactComponent as CircleC } from "@svg/CircleC.svg";
import { useTranslation } from "react-i18next";
import {useCallback, useContext, useEffect, useState} from "react";
import { UserContext } from "@context/UserContext";
import { Footer } from "@components/Footer";
import { useNavigate } from "react-router-dom";
import {ReactComponent as ChevronLeftIcon} from "@svg/ChevronLeft.svg";
import {ReactComponent as ChevronRightIcon} from "@svg/ChevronRight.svg";

export const Used = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { userId, buylog, userHistory, session_token } = useContext(UserContext);
  const [data, setData] = useState<any>([]);

  const fetchUserHistory = async (propspage: number) => {
    try {
      let res = await userHistory(propspage, 10,'desc', session_token);

      if(res?.data?.data?.Success && res, res.data.data.data !== null) {
        setData(res.data.data.data.data)
      } else {
      }
    } catch (error) {

    } finally {

    }
  };

  useEffect( () => {
    if (userId === -1) {
      navigate("/login");
    } else {
      fetchUserHistory(1);
    }
  },[])

  useEffect( () => {
    fetchUserHistory(page);
  },[page])

  const clickNext = useCallback(() => {
    if(data.length >= 10) {
      setPage(page + 1);
    }
  }, [data]);

  return (
    <div className="">
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header />
      </div>
      <div className="flex flex-col">
        <div className="mx-auto max-w-[1200px] w-full px-[8rem] max-header:px-4">
          <div
            className="text-center mt-1 text-sm"
            style={{
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            <div className="relative flex flex-row mb-8">
              <div className="flex flex-row leading-24 justify-center items-center">
                <p className="text-black font-bold text-2xl">사용내역</p>
              </div>
            </div>
            <div className="w-full" style={{ border: "1px solid #D0D0D0" }} />
            {data?.map((item: any, index: number) => {
              return (
                <Content
                  key={index}
                  title={item.Name}
                  id={item.ID}
                  type={item.PurchaseType}
                  date={item.CreatedAt}
                  price={item.UserSpendAmount}
                  contentType={item.ContentType}
                  count={item.count}
                />
              );
            })}
          </div>
          <div className="flex ml-auto my-3 flex-row w-24">
            <button
              className="bg-[#F7F7F7] px-2 py-2 rounded-[8px] border-[2px] border-solid ml-auto font-notokr text-[16px] font-medium text-[#757575]"
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              className="bg-[#F7F7F7] px-2 py-2 rounded-[8px] border-[2px] border-solid ml-auto font-notokr text-[16px] font-medium text-[#757575]"
              onClick={() => clickNext()}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-24" />
      </div>

      <Footer />
    </div>
  );
};

const Content = ({
  title,
  id,
  type,
  date,
  price,
  contentType,
  count,
}: {
  title: string;
  id: number;
  type: number;
  date: string;
  price: number;
  contentType: number;
  count: number;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row items-center my-3 px-5">
        <div className="flex mr-5">
          <CircleC />
        </div>
        <div className="flex flex-1 flex-row items-center max-sm:flex-col max-sm:items-start">
          <div className="flex flex-col mr-10 font-notokr text-left gap-2 w-[14rem] max-sm:w-full">
            <div className="text-lg max-sm:hidden text-ellipsis-2-line break-all">{title}</div>
            <div
              className="hidden text-lg max-sm:flex break-all"
              onClick={() => {
                navigate(`/${contentType === 0 ? 'webtoon' : 'webnovel'}/episodes/${id}`);
              }}
            >
              {title}
            </div>
            <div className="text-base">
              {type === 0 ? `소장권 ${count}장` : `대여권 ${count}장`}
            </div>
            <div className="text-[#D0D0D0]">{date}</div>
          </div>
          <div className="max-sm:hidden cursor-pointer">
            <Hamburger
              className="w-8 h-8"
              onClick={() => {
                navigate(`/${contentType === 0 ? 'webtoon' : 'webnovel'}/episodes/${id}`);
              }}
            />
          </div>
          <div className="flex flex-1 items-center justify-end text-alco-mint text-xl max-sm:justify-start">{price}코인</div>
        </div>
      </div>
      <div className="w-full" style={{ border: "1px solid #D0D0D0" }} />
    </>
  );
};
