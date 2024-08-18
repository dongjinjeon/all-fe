import React from "react";

const ChargePopup = ({
  text,
  setText,
}: {
  text: string;
  setText: any,
}) => {

  return (
    <div className="fixed flex justify-center items-center w-full h-screen z-[200]">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="border border-black border-4 border-solid relative bg-white p-4 rounded-md shadow-lg z-40 w-[400px] bg-gray-100">
        <div className="flex h-full flex-col gap-4 p-4 items-center">
          {text}
          <div
            className="w-full flex flex-col items-center cursor-pointer bg-alco-mint rounded-[8px] px-4 py-2"
            onClick={() => setText("")}
          >
            <div className="flex flex-row items-center text-white font-bold text-lg">
              확인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargePopup;
