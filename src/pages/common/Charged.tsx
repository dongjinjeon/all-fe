import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import PaymentDetailPopup from "@components/Popup/PaymentDetail";
import { UserContext } from "@context/UserContext";
import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GetAllPaymentsRes, Payment, getAllPayments } from './paymentService';

export const Charged = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId, chargeLog, getChargeLog, chargeLogCnt, session_token } = useContext(UserContext);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any>(chargeLog);
  const [isOpen, setIsOpen] = useState<any>(undefined);
  const [selectedItem, setSelectedItem] = useState<any>(undefined);
  const [isHoveredIndex, setIsHoveredIndex] = useState<number>(-1);
  const [tossPayments, setTossPayments] = useState<Payment[]>([]);
  const [tossPage, setTossPage] = useState<number>(1);
  const [tossPageCount, setTossPageCount] = useState<number>(1);

  useEffect(() => {
    if (chargeLogCnt === 0) {
      setPage(prev => prev - 1);
    } else {
      setData(chargeLog);
    }
  }, [chargeLog, chargeLogCnt]);

  useEffect(() => {
    if (userId && userId <= -1) navigate("/login");
  }, [userId]);

  useEffect(() => {
    fetchPayments(tossPage); 
  }, [tossPage]);

  const fetchPayments = async (page: number) => {
    if (!session_token) {
      console.error('세션 토큰이 정의되지 않았습니다');
      return;
    }

    try {
      const result: GetAllPaymentsRes = await getAllPayments({
        startDate: '2023-01-01',
        endDate: '2024-12-31',
        page: page,
        count: 10,
        token: session_token,
      });

      if (result && result.data && result.data.list && result.data.list.length > 0) {
        const appPayments = result.data.list.filter(payment => payment.platform !== 'web' && payment.platform !== 'toss');
        setTossPayments(appPayments); 
        setTossPageCount(Math.ceil(result.data.total / 10));
      } else {
        console.error('결제 정보 가져오기 오류: 결제 정보 없음');
      }
    } catch (error) {
      console.error('결제 정보 가져오기 오류:', error);
    }
  };

  const clickNext = useCallback(() => {
    if (data.length >= 10) {
      setPage(page + 1);
    }
  }, [data, page]);

  const handleMouseEnter = (index: number) => {
    setIsHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHoveredIndex(-1);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const renderEmptyItems = (count: number) => {
    const emptyItems = [];
    for (let i = 0; i < count; i++) {
      emptyItems.push(
        <div key={`empty-${i}`} className="flex flex-col items-center my-3 px-2 flex-wrap" style={{ minHeight: '3rem' }}>
          <div className="flex flex-row w-full justify-between max-sm:flex-col">
            <div className="flex flex-col font-notokr text-left gap-1">
              <div className="flex flex-row gap-4 text-[#000000] flex-wrap">
                <div>&nbsp;</div>
                <div className="flex flex-row items-center gap-3">
                  <div>&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return emptyItems;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center flex-1 justify-center">
        {isOpen && (
          <PaymentDetailPopup 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            selectedItem={selectedItem}
          />
        )}
        <div className="flex flex-col items-center flex-1">
          <div className="mx-auto max-w-[1200px] w-full px-4 sm:px-8 lg:px-[8rem] flex-1 flex flex-col justify-center">
            <div className="text-center mt-8 text-sm" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              <div className="relative flex flex-row mb-8 justify-center">
                <div className="flex flex-row leading-24 justify-center items-center">
                  <p className="text-black font-bold text-2xl">충전내역</p>
                </div>
              </div>
              {data?.map((item: any, index: number) => (
                <Content
                  key={index}
                  item={item}
                  setIsOpen={setIsOpen}
                  setSelectedItem={setSelectedItem}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  isHovered={isHoveredIndex === index}
                  onItemClick={() => handleItemClick(item)}
                />
              ))}

              {tossPayments?.map((item: Payment, index: number) => (
                <Content
                  key={`toss-${index}`}
                  item={item}
                  setIsOpen={setIsOpen}
                  setSelectedItem={setSelectedItem}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  isHovered={isHoveredIndex === index}
                  onItemClick={() => handleItemClick(item)}
                />
              ))}
              {renderEmptyItems(10 - data.length - tossPayments.length)}
            </div>
            <div className="flex justify-center my-8 w-full">
              <button
                className="flex items-center px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => setTossPage(tossPage - 1)}
                disabled={tossPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <span className="mx-2 flex items-center">{tossPage} / {tossPageCount}</span>
              <button
                className="flex items-center px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => setTossPage(tossPage + 1)}
                disabled={tossPage === tossPageCount}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const Content = ({
  item,
  setIsOpen,
  setSelectedItem,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  onItemClick,
  onCancel
}: {
  item: any; 
  setIsOpen: any;
  setSelectedItem: any;
  onMouseEnter: any;
  onMouseLeave: any;
  isHovered: boolean;
  onItemClick: any;
  onCancel?: any;
}) => {
  return (
    <div
      className={`cursor-pointer w-full ${isHovered ? 'bg-blue-200' : ''}`}
      onClick={onItemClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ minHeight: '3rem' }}
    >
      <div className="flex flex-col items-center my-3 px-2 flex-wrap">
        <div className="flex flex-row w-full justify-between max-sm:flex-col">
          <div className="flex flex-col font-notokr text-left gap-1">
            {item.payments && (
              <div className="flex flex-row gap-4 text-[#000000] flex-wrap">
                <div>{item.createdAt}</div>
                <div className="flex flex-row items-center gap-3">
                  <div>{item.default_coin + item.bonus_coin}Coin</div>
                  <div className="flex flex-row items-center text-right gap-2 text-sm">
                    {item.payments && (
                      <div className="text-red-400">{item.payments.cardAmount} 원</div>
                    )}
                  </div>
                  {item.Status === 1 && (
                    <span className="text-green-500">결제완료</span>
                  )}
                  {item.Status === 2 && (
                    <span className="text-red-500">취소완료</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
