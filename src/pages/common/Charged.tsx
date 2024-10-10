import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { UserContext } from "@context/UserContext";
import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { ReactComponent as CircleC } from "@svg/CircleC.svg";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Charged = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { userId, chargeHistory, session_token } = useContext(UserContext);
  const [data, setData] = useState<any>([]);

  const fetchChargeHistory = async (propspage: number) => {
    try {
      if (session_token) {
        let res = await chargeHistory(propspage, 10, 'desc', session_token);
        if (res?.data?.data?.Success && res.data.data.data !== null) {
          setData(res.data.data.data.data);
        } else {
          // Handle error
        }
      }
    } catch (error) {
      // Handle error
    } finally {
      // Any cleanup code
    }
  };

  useEffect(() => {
    if (userId === -1) {
      navigate("/login");
    } else {
      fetchChargeHistory(1);
    }
  }, []);

  useEffect(() => {
    fetchChargeHistory(page);
  }, [page]);

  const clickNext = useCallback(() => {
    if (data.length >= 10) {
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
                <p className="text-black font-bold text-2xl">충전내역</p>
              </div>
            </div>
            <div className="w-full" style={{ border: "1px solid #D0D0D0" }} />
            {data?.map((item: any, index: number) => {
              return (
                <Content
                  key={index}
                  amount={item.Amount}
                  date={item.CreatedAt}
                  price={item.Price}
                  status={item.Status}
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
  amount,
  date,
  price,
  status,
}: {
  amount: number;
  date: string;
  price: number;
  status: string;
}) => {
  return (
    <>
      <div className="flex flex-row items-center my-3 px-5">
        <div className="flex mr-5">
          <CircleC />
        </div>
        <div className="flex flex-1 flex-row items-center max-sm:flex-col max-sm:items-start">
          <div className="flex flex-col mr-10 font-notokr text-left gap-2 w-[14rem] max-sm:w-full">
            <div className="text-lg">{amount}코인 충전</div>
            <div className="text-base">상태: {status}</div>
            <div className="text-[#D0D0D0]">{date}</div>
          </div>
          <div className="flex flex-1 items-center justify-end text-alco-mint text-xl max-sm:justify-start">{price}원</div>
        </div>
      </div>
      <div className="w-full" style={{ border: "1px solid #D0D0D0" }} />
    </>
  );
};