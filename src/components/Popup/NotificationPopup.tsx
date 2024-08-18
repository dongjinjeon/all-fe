const NotificationPopup = ({
   isOpen,
   setIsOpen,
  text
                   }: {
  isOpen: any;
  setIsOpen: any;
  text: any
}) => {

  return (
    <div className="fixed top-0 right-0 flex justify-center items-center w-full h-screen z-30 text-lg">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"></div>
      <div className="border border-black border-4 border-solid relative font-notokr bg-white rounded-md shadow-lg z-40 w-[30rem] max-lg:w-[80%] bg-gray-100 max-lg:max-w-[480px]">
        <div className="px-[1.5rem] py-8 gap-4 flex flex-col bg-white">
          <div className="max-lg:text-sm">{text}</div>
          <button
            className="flex px-8 h-10 bg-alco-mint font-medium text-white font-notokr rounded-[8px]  justify-center items-center ml-auto max-lg:text-sm max-lg:w-fit"
            onClick={() => setIsOpen(false)}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
