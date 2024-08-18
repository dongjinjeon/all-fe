import { UserContext } from "@context/UserContext";
import React, { useState, useEffect } from "react";
import {useContext} from "react";
import { Loading } from "@components/Loading";
import {useLocation, useNavigate} from 'react-router-dom';

const BuyAllPopup = ({
  isOpen,
  setIsOpen,
  isWebtoon,
  setEpisodePagination,
}: {
  isOpen: any;
  setIsOpen: any;
  isWebtoon: any;
  setEpisodePagination: any;
}) => {
  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const {
    buyAllRemainContent,
    userBuyDetail,
    session_token
  } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [detailData, setDetailData] = useState<any>(null);
  const [isFail, setIsFail] = useState(false);

  useEffect( () => {
    const fetchUserBuyDetail = async () => {
      try {
        let res = await userBuyDetail(isOpen.webtoonDetails.id, isWebtoon ? 0 : 1, session_token);

        if(res?.data?.data?.Success && res, res.data.data.data !== null) {
          setDetailData(res.data.data.data)
        } else {
          setIsFail(true)
          // alert("코인이 부족합니다.");
          // setIsOpen(false);
        }
      } catch (error) {
        alert("오류가 발생했습니다.");
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserBuyDetail();
  },[])

  const handleBuy = async () => {
    if (!isLoading && !isFail) {
      try {
        let res = await buyAllRemainContent(isOpen.webtoonDetails.id, isWebtoon ? 0 : 1, session_token);
        if(res.data.data.Success) {
          console.log('res: ', res)
          setEpisodePagination(-1)
          setIsOpen(false);
          navigate("/me");
        } else {
          setIsFail(true);
          alert("구매에 실패 했습니다.");
          setIsOpen(false);
        }
      } catch (error) {
        alert("구매에 실패 했습니다.");
        setIsOpen(false);
        // console.error('Error during userBuyDetail:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 right-0 flex justify-center items-center w-full h-screen z-30">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div
        className="border p-5 border-black border-4 border-solid relative font-notokr bg-white rounded-md shadow-lg z-40 w-[30rem] max-lg:w-[80%] bg-gray-100 max-lg:max-w-[480px]">
        {isFail ?
          <div className={"flex flex-col justify-center items-center text-lg font-bold gap-5"}>
            코인이 부족합니다.
            <div>
              <button
                disabled={isLoading}
                onClick={handleClosePopup}
                className="flex w-24 h-10 bg-white border-[#E3E3E3] border-2 rounded-[8px] font-medium text-black font-notokr justify-center items-center"
              >
                확인
              </button>
            </div>
          </div> : null}
        {isLoading ? <Loading/> :
          !isFail ?
          <>
            <div className="h-12 bg-white flex px-[1.5rem] max-lg:px-2">
              <div className="font-notokr text-black font-medium text-2xl my-auto">
                전체 구매
              </div>
            </div>

            <div className="px-[1.5rem] py-[1.5rem] gap-4 flex flex-col max-lg:px-2">
              <div className="flex flex-row items-center font-notokr">
                <div className="flex flex-col rounded-xl">
                  <img src={isOpen.cover} className="w-24 rounded-xl"/>
                  <div
                    className="text-center"
                    style={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    x{detailData?.buy_episode_count}
                  </div>
                </div>
                <div className="flex flex-row flex-1 max-sm:flex-col justify-between max-sm:justify-center pl-5 max-sm:gap-2">
                  {detailData?.buy_episode_count === 0 ? <div className="text-lg">0화</div> : <div className="text-lg">{detailData?.epi_term_start}화~{detailData?.epi_term_end}화</div>}
                  <div className="font-medium text-xl">{detailData?.UserSpendAmount}코인</div>
                </div>
              </div>
              <div
                className="px-1 w-full font-notokr font-medium text-lg pb-3"
                style={{borderBottom: "1px solid #E3E3E3"}}
              >
                소장: {isOpen.webtoonDetails?.price.buy}코인
              </div>

              <div>
                <div
                  className="text-left"
                  style={{fontWeight: "400", fontSize: "10px", color: "#757575"}}
                >
                  <p>
                    • 대여권, 소장권을 구매한 작품은 구매 취소하거나 환불을 받을 수
                    없습니다.
                  </p>
                  <p>
                    • 결제에 대한 자세한 문의는 [고객 지원] 페이지에서 문의해주시기
                    바랍니다.
                  </p>
                </div>
              </div>
              <div className="flex flex-row ml-auto gap-3">
                <button
                  disabled={isLoading}
                  onClick={handleClosePopup}
                  className="flex w-24 h-10 bg-white border-[#E3E3E3] border-2 rounded-[8px] font-medium text-black font-notokr justify-center items-center"
                >
                  취소
                </button>
                <button
                  disabled={isLoading || detailData?.buy_episode_count === 0}
                  className={`flex w-24 h-10 font-medium text-white font-notokr rounded-[8px] justify-center items-center ${ detailData?.buy_episode_count === 0 ? "bg-[#d3d3d3]" : "bg-alco-mint"}`}
                  onClick={handleBuy}>
                  구매
                </button>
              </div>
            </div>
          </>
          : null
        }
      </div>
    </div>
  );
};

export default BuyAllPopup;
