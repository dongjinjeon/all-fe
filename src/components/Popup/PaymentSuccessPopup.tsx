import React from 'react';

interface PaymentSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentSuccessPopup: React.FC<PaymentSuccessPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-screen z-30">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="border border-black border-4 border-solid relative font-notokr bg-white rounded-md shadow-lg z-40 w-96 bg-gray-100">
        <div className="h-12 bg-alco-mint flex px-[1.5rem]">
          <div className="font-notokr text-white font-bold my-auto">
            결제 완료
          </div>
          <button
            onClick={onClose}
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
          <div className="gap-4 flex flex-col">
            <div>결제가 성공적으로 완료되었습니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPopup;
