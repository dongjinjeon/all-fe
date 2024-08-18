import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { PaymentContext } from "@context/PaymentContext";
import { UserContext } from "@context/UserContext";
import { useAppSelector } from "@store";
import { ReactComponent as CircleC } from "@svg/CircleC.svg";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmPopup from "../../components/Popup/ConfirmPopup";
import PaymentSuccessPopup from "../../components/Popup/PaymentSuccessPopup";

interface DataItem {
  Id: string;
  productId: string;
  default_coin: number;
  bonus_coin: number;
  price: number;
  language: string;
  os: string;
}

const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);

export const Payments = () => {
  const { balance } = useAppSelector(
    (state) => state.storage.session.globalUserSlice
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, userName, login, session_token } = useContext(UserContext);
  const { executePreparePayment, executeGetChargeList } = useContext(PaymentContext);
  const [data, setData] = useState<DataItem[]>([]);
  const [select, setSelect] = useState(-1);
  const [agree, setAgree] = useState(false);
  const [conFirmText, setConFirmText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); // 성공 팝업 상태
  const query = new URLSearchParams(location.search);

  const tossPayments = useRef(null);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      tossPayments.current = await loadTossPayments("live_ck_AQ92ymxN34R0R9vaqXbArajRKXvd");
    })();
  }, [data]);

  useEffect(() => {
    chargeList();
  }, []);


  const chargeList = async () => {
    try {
      let verifyRes = await executeGetChargeList();
      setData(verifyRes.data.list);
      setIsLoading(false);
    } catch (error) {
      console.log('chargeList error:', error)
    } finally {
      setIsLoading(false);
    }
  }

  const clickPay = () => {
    if (select < 0 || select > 5) {
      setConFirmText('결제 금액을 선택해주세요.');
    }
    if (select >= 0 && select <= 5 && !agree) {
      setConFirmText('구매 진행에 동의해주세요');
    }
    if (agree && select >= 0 && select <= 5) {
      requestPay();
    }
  };

  const requestPay = async () => {
    try {
      let res = await executePreparePayment(session_token, select);
      if (res.data.code === 200) {
        // @ts-ignore
        const aaa = await tossPayments.current.requestPayment('카드', {
          cardCompany: 'SHINHAN',
          // flowMode: 'DIRECT',
          // useCardPoint: true,
          useAppCardOnly: false,
          amount: data[select]?.price,
          orderId: res.data.data.orderId,
          orderName: `${data[select].default_coin} ContentCoin`,
          customerName: userName,
          successUrl: `${window.location.origin}/payments/complete`,
          failUrl: `${window.location.origin}/payments/fail`
        });

        const response = await fetch('https://api-client.allcomics.org/v1/payment/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session_token}`  // Assuming token is required
          },
          body: JSON.stringify(aaa)
        });

        if (!response.ok) {
          // Log response details for debugging
          const errorText = await response.text();
          console.error(`Payment request failed with status ${response.status}: ${errorText}`);
          throw new Error('Payment request failed');
        }

        console.log("@@@@@@@@@@@@@@@@@@@ aaa", aaa);
        // 결제 성공 시 성공 팝업 열기
        setIsSuccessPopupOpen(true);
      }
    } catch (error) {
      console.log('사전등록 에러:', error)
    }
  }

  useEffect(() => {
    if (userId && userId <= -1) navigate("/login");
  }, []);

  return (
    <div>
      <div className="">
        <Header />
      </div>
      {conFirmText.length === 0 ? null : <ConfirmPopup text={conFirmText} setText={setConFirmText} />}
      <div className="w-full flex justify-center align-center">
        <div className="max-w-[1200px] w-full flex flex-col justify-center items-center gap-4 pt-16 max-lg:pt-8">
          <div className="flex w-full flex-col px-4 justify-center items-center gap-4">
            <div className="font-bold text-xl mb-4">ContentCoin 충전</div>
            <div className="w-full flex items-start text-lg flex-wrap">내 보유 포인트 ContentCoin&nbsp;
              <div className="text-alco-mint font-bold">{balance!.toLocaleString('ko-KR')}</div>
            </div>
          </div>
          <div className="w-full h-[4px] bg-[#eeeeee]" />
          <div className="flex w-full flex-col px-4 justify-center items-center gap-4">
            <div className="w-full flex items-start text-base text-[#666666]">충전하실 금액을 선택해주세요.</div>
            {isLoading ? <Loading height="h-[396px]" /> : (
              Array.isArray(data) && data.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center w-full min-h-[50px] py-2 cursor-pointer px-4 rounded-[8px] ${select === index ? 'border-alco-mint border-[1.5px]' : 'border-[#eeeeee] border-[1px]'}`}
                    onClick={() => setSelect(index)}
                  >
                    <CircleC className="w-[24px] h-[24px] mr-4" />
                    <div className="flex flex-row font-bold flex-wrap mr-2">
                      {item.default_coin} ContentCoin
                      <div className="text-alco-mint">&nbsp;+{item.bonus_coin}</div>
                    </div>
                    <div
                      className="min-w-[95px] flex flex-col justify-center items-center bg-alco-mint px-4 rounded-[16px] text-white ml-auto">
                      ￦{item.price.toLocaleString('ko-KR')}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="w-full h-[4px] bg-[#eeeeee]" />
          {select >= 0 && select <= 5 ? (
            <div className="w-full flex flex-col px-4">
              <div className="w-full flex items-start text-base text-[#666666]">결제 금액을 확인해주세요.</div>
              <div className="flex flex-row">
                <img src="/logocolor.png" className="w-[64px] h-[48px]" />
                <div className="flex flex-col">
                  <div className="flex flex-row font-bold flex-wrap mr-2">
                    {data[select].default_coin} ContentCoin
                  </div>
                  <div className="font-bold text-xl text-alco-mint">￦{data[select].price.toLocaleString('ko-KR')}</div>
                </div>
              </div>
            </div>
          ) : null}
          {select >= 0 && select <= 5 ? (
            <div className="w-full h-[4px] bg-[#eeeeee]" />
          ) : null}

          <div className="flex w-full flex-col px-4
justify-center items-center gap-4">
            <div className="w-full flex flex-col items-start mt-4">
              <div className="font-bold text-lg">결제 상품 이용안내</div>
              <div className="flex flex-row text-sm text-[#666666]">
                <div className="px-2">•</div>
                대여권, 소장권을 구매한 작품은 구매 취소하거나 환불을 받을 수 없습니다.
              </div>
              <div className="flex flex-row text-sm text-[#666666]">
                <div className="px-2">•</div>
                결제에 대한 자세한 문의는 고객지원 페이지에서 문의해주시기 바랍니다.
              </div>
            </div>
            <div
              className="w-full flex flex-col items-start cursor-pointer select-none"
              onClick={() => setAgree(!agree)}
            >
              <div className="flex flex-row items-center">
                <img
                  src={`${agree ? 'ico_check_on.png' : 'ico_check_off.png'}`}
                  className="cursor-pointer w-8 h-8 mr-2"
                />
                (필수)위 내용을 확인하였으며 구매진행에 동의합니다.
              </div>

            </div>
            <div
              className="w-full flex flex-col items-center cursor-pointer bg-alco-mint rounded-[8px] px-4 py-2 mb-12"
              onClick={() => clickPay()}
            >
              <div className="flex flex-row items-center text-white font-bold text-lg">
                결제요청
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentSuccessPopup isOpen={isSuccessPopupOpen} onClose={() => setIsSuccessPopupOpen(false)} />
    </div>
  );
};

export default Payments;
