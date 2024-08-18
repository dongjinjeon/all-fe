import { UserContext } from '@context/UserContext';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cancelTossPmntOrder } from '../../pages/common/paymentService';

const PaymentDetailPopup = ({
  isOpen,
  setIsOpen,
  selectedItem,
  // updateChargeLog,
}: {
  isOpen: any;
  setIsOpen: any;
  selectedItem: any;
  // updateChargeLog: () => void; 
}) => {
  const navigate = useNavigate(); 
  const { session_token } = useContext(UserContext);
  const [isCancelDisabled, setIsCancelDisabled] = useState(false); 

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleCancelPayment = async () => {

    try {
      if (!session_token) {
        throw new Error('세션 토큰이 없습니다. 다시 로그인해 주세요.');
      }

      await cancelTossPmntOrder({
        orderId: selectedItem.orderId,
        paymentKey: selectedItem.payments.paymentKey,
        cancel_reason: '고객요청', 
        token: session_token,
      });

      alert("결제가 취소되었습니다.");
      setIsCancelDisabled(true); 
      handleClosePopup(); 
    
      navigate('/', { replace: true });

    } catch (error) {
      console.error("결제 취소 에러:", error);

      alert("결제 취소 중 오류가 발생했습니다.");
    }
  };


  const getChargeMethod = (type: string) => {
    switch (type) {
      case 'inapp':
        return '앱에서 충전';
      case 'web':
        return '웹';
      default:
        return '웹에서 충전';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-screen z-30">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="border border-black border-4 border-solid relative font-notokr bg-white rounded-md shadow-lg z-40 w-96 bg-gray-100">
        <div className="h-12 bg-alco-mint flex px-[1.5rem]">
          <div className="font-notokr text-white font-bold my-auto">
            충전 상세 내역
          </div>
          <button
            onClick={handleClosePopup}
            className="absolute top-0 right-0 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-[1.5rem] py-3">
          <div className=" gap-4 flex flex-col">
            {/* <div>충전방법: {getChargeMethod(selectedItem.type)}</div> */}
            <div>충전일시: {selectedItem.type === 'inapp' ? selectedItem.purchaseTime : selectedItem.createdAt}</div>
            <div>포인트 사용: {selectedItem.type === 'inapp' ? (selectedItem.useCardPoint === 0 ? '카드' : '포인트') : (selectedItem.payments.useCardPoint === 0 ? '카드' : '포인트')}</div>
            <div>결제종류: {selectedItem.type === 'inapp' ? selectedItem.cardType : selectedItem.payments.cardType}</div>
            <div>카드번호: {selectedItem.type === 'inapp' ? selectedItem.number :selectedItem.payments.number}</div>
            <div>결제금액: {selectedItem.type === 'inapp' ? selectedItem.formattedPrice : formatCurrency(selectedItem.amount)}</div>
            <div>충전코인: {selectedItem.default_coin} ContentCoin</div>
            <div>보너스코인: {selectedItem.bonus_coin} ContentCoin</div>
          </div>
          <div className="leading-[1.2rem] py-5">
            <div className="text-left font-normal text-[#757575] text-[10px]">
              <p>• 사용한 코인은 결제 취소할 수 없습니다.</p>
              {selectedItem.type === 'inapp' ? (
                <p>• 인앱결제한 코인은 앱에서만 취소가능합니다.</p>
              ) : (
                <p>• 결제취소에 대한 자세한 문의는 [고객 지원] 페이지에서 문의해주시기 바랍니다.</p>
              )}
            </div>
            {selectedItem.type === 'inapp' ? (
              <button
                className="flex disabled cursor-default w-full h-7 mt-5 bg-gray-400 font-thin text-white font-notokr rounded-[8px]  justify-center items-center ml-auto"
              >
                {"앱에서만 취소가능합니다."}
              </button>
            ) : (
              <button
                className={`flex w-full h-7 mt-5 ${isCancelDisabled || selectedItem.Status === 2 ? 'bg-gray-400' : 'bg-alco-mint'} font-thin text-white font-notokr rounded-[8px] justify-center items-center ml-auto`}
                onClick={handleCancelPayment} 
                disabled={isCancelDisabled || selectedItem.Status === 2} 
              >
                {"결제 취소"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailPopup;
