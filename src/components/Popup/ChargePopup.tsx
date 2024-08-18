import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "@context/UserContext";
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ChargePopup = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: any;
  setIsOpen: any;
}) => {
  const { userId, session_token } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed flex justify-center items-center w-full h-screen z-[200]">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="border border-black border-4 border-solid relative bg-white p-4 rounded-md shadow-lg z-40 w-[400px] bg-gray-100">
        <button
          onClick={handleClosePopup}
          className="absolute top-0 right-0 p-2 z-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col gap-4 p-4 text-lg text-black">
          코인이 부족합니다. 코인 구매 화면으로 이동하시겠습니까?
          <div className="w-full flex justify-between mt-auto">
            <div
              className="w-full flex flex-col items-center cursor-pointer bg-alco-mint rounded-[8px] px-4 py-2"
              onClick={() => navigate(`/payments?redirect=${location.pathname}`)}
            >
              <div className="flex flex-row items-center text-white font-bold text-lg">
                코인 구매
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargePopup;
