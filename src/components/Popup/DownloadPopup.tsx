import {ReactComponent as AppleStore} from "@svg/App_Store_Badge.svg";
import {ReactComponent as QRCode} from "@svg/allcomics_QR.svg";
import {useMemo} from "react";

const DownloadPopup = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: any;
  setIsOpen: any;
}) => {
  const collaborationWith = useMemo(() => {
    if (window.location.hostname.includes('shinhan')) {
      return "shinhan";
    }
    return "";
  }, []);

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed flex justify-center items-center w-full h-screen z-[200]">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="border border-black border-4 border-solid relative bg-white p-4 rounded-md shadow-lg z-40 w-96 bg-gray-100">
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
        <div className="text-center gap-5 flex flex-col">
          <div className="relative flex flex-row mb-4 items-center">
            <p className="text-alco-mint font-notokr font-bold text-[1.8rem]">
              Allcomics&nbsp;
            </p>
            <p className="mr-auto font-notokr font-medium flex items-center pt-[8px]">
              코인 충전
            </p>
          </div>
          <div className="text-alco-mint font-notokr font-medium text-[1.3rem]">
            Allcomics앱 다운로드 받고 설치하기
          </div>
          <div className="flex w-full justify-center items-center max-lg:hidden">
            <QRCode className="" />
          </div>
          <div className="hidden w-full flex-row gap-4 max-lg:flex">
            <div className="flex flex-1 justify-center items-center">
              <a href="https://play.google.com/store/apps/details?id=kr.co.all_comics" target="_blank" rel="noopener noreferrer">
               <img className="w-full" src="/google-play-badge.png" />
              </a>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <a href="https://apps.apple.com/app/allcomics/id1552315891" target="_blank" rel="noopener noreferrer">
                <AppleStore className="flex w-full h-screen max-w-[164px] max-h-[50px]" />
              </a>
            </div>
          </div>
          <p className="mb-4 font-notokr font-medium text-md">
            코인 충전은 올코믹스 앱에서 가능합니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;
