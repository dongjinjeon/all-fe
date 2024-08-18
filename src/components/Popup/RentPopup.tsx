import { ReactComponent as Logo } from "@svg/LogoColor.svg";
import { ReactComponent as QR } from "@svg/QR.svg";
import { useAppSelector } from "@store";
import { UserContext } from "@context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const RentPopup = ({
  isOpen,
  setIsOpen,
  isRent,
  isWebtoon,
  setCoinPopup,
}: {
  isOpen: any;
  setIsOpen: any;
  isRent: boolean;
  isWebtoon: boolean;
  setCoinPopup: any;
}) => {
  const { buyWebtoon, buyWebnovel } = useContext(UserContext);
  const navigate = useNavigate();
  const { balance } = useAppSelector(
    (state) => state.storage.session.globalUserSlice
  );

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleBuy = async () => {
    if (isWebtoon) {
      const res = await buyWebtoon(isOpen.id, isOpen.episode, isRent ? 0 : 1);
      if (Number(res?.data?.code) === 200) {
        navigate(`/webtoon/episodes/view/${isOpen.id}/${isOpen.episode}`);
      } else {
        setCoinPopup(true);
      }
    } else {
      const res = await buyWebnovel(isOpen.id, isOpen.episode, isRent ? 0 : 1);
      if (Number(res?.data?.code) === 200) {
        navigate(`/webnovel/episodes/view/${isOpen.id}/${isOpen.episode}`);
      } else {
        setCoinPopup(true);
      }
    }
  };

  return (
    <div className="fixed top-0 right-0 flex justify-center items-center w-full h-screen z-30 text-lg">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="border border-black border-4 border-solid relative font-notokr bg-white rounded-md shadow-lg z-40 w-[30rem] bg-gray-100">
        <div className="h-12 bg-alco-mint flex px-[1.5rem]">
          <div className="font-notokr text-white font-bold my-auto">
            작품 구매
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

        <div className="px-[1.5rem] py-16 gap-4 flex flex-col">
          <div>{Number(isOpen.episode)}화</div>
          <div className="px-1 w-full h-16">
            <div className="bg-alco-skyblue-100 text-lg w-full h-full rounded-md flex justify-center items-center flex-row px-3">
              {isRent ? "소장" : "3일 대여"}
              <div className="ml-auto text-alco-mint text-lg">
                {isRent ? `${isOpen.price.buy}코인` : `${isOpen.price.rent}코인`}
              </div>
            </div>
          </div>
          <div className="leading-[1.2rem]">
            <div
              className="text-left font-normal text-[#757575] text-[10px]"
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
          <button
            onClick={handleBuy}
            className="flex w-24 h-10 bg-alco-mint font-medium text-white font-notokr rounded-[8px]  justify-center items-center ml-auto"
          >
            {isRent ? "소장하기" : "대여하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentPopup;
