import { ReactComponent as Logo } from "@svg/LogoColor.svg";

const ChargePopup = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed flex justify-center items-center w-full h-screen z-20">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="relative bg-white p-4 rounded-md shadow-lg z-40 w-96 bg-gray-100">
        <button
          onClick={handleClosePopup}
          className="absolute top-0 right-0 p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 hover:text-gray-500"
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
          <div className="relative flex flex-row mb-4">
            <p className="absolute mr-auto text-alco-mint">Allcomics</p>
            <p className="ml-auto mr-auto">코인 충전</p>
          </div>
          <div className="text-alco-mint">Scan to log in </div>
          <Logo className="mx-auto my-5" />
          <p className="mb-4">코인 충전은 올코믹스 앱에서 가능합니다</p>
        </div>
      </div>
    </div>
  );
};

export default ChargePopup;
