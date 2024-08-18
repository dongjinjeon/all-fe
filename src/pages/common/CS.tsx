import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Notices } from "./cs/Notices";
import { FAQ } from "./cs/FAQ";
import { OneToOne } from "./cs/OneToOne";
import { MyQuestion } from "./cs/MyQuestion";
import { useEffect, useState } from "react";
import { CSContext } from "@context/CSContext";
import { useCS } from "@hooks/useCS";
import { useTranslation } from "react-i18next";
import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";

export const CS = () => {
  const [csType, setCsType] = useState("");
  const location = useLocation();

  const { t } = useTranslation();

  const csControls = useCS();

  useEffect(() => {
    setCsType(location.pathname.split("/")[3]);
  }, [location]);

  return (
    <div>
      <div className="h-[12rem] max-header:h-[7.5rem]">
        <Header />
      </div>
      <div className="mx-auto max-w-[1200px] w-full font-notokr">
        <div className="flex flex-row w-full gap-5 max-header:flex-col max-header:px-4">
          <div className="w-72 border-2 border-alco-mint px-5 rounded-xl h-[40rem] max-header:w-full max-header:h-full max-header:py-4">
            <div className="flex flex-col h-96 max-header:flex-row max-header:h-full max-header:gap-4 max-header:flex-wrap max-header:items-center">
              <h1
                className="w-full h-24 font-medium mb-4 flex justify-center items-center py-5 border-b-[1px] border-[#D0D0D0] text-3xl max-header:py-0  max-header:mb-0 max-header:border-none max-header:h-fit max-header:w-fit"
              >
                {t("alco-cs.cs")}
              </h1>
              <div className="flex flex-col max-header:flex-row max-header:h-full max-header:gap-4 flex-wrap max-header:items-center max-header:h-full">
                <LeftMenuItem title={t("alco-cs.notices")} href="notices" />
                <LeftMenuItem title={t("alco-cs.faq")} href="faq" />
                <LeftMenuItem title={t("alco-cs.onetoone")} href="onetoone" />
                <LeftMenuItem
                  title={t("alco-cs.myquestion")}
                  href="myquestion"
                  isLast
                />
              </div>
            </div>
          </div>
          <div className="w-full border-2 border-black rounded-xl p-5 flex flex-col">
            <h1 className="text-[1.8rem] font-medium mb-4">
              {t(`alco-cs.${csType}`)}
            </h1>
            <div className="w-full px-1 mx-auto border-b-[0.08rem] border-black" />
            <div className="flex flex-col h-full">
              <CSContext.Provider value={csControls}>
                <Routes>
                  <Route path="/" element={<Navigate to="notices" />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/onetoone" element={<OneToOne />} />
                  <Route path="/myquestion" element={<MyQuestion />} />
                </Routes>
                {!location.pathname.includes("onetoone") && (
                  <div className="flex flex-row justify-center items-center gap-5 mt-auto pb-10 pt-4">
                    <ChevronLeftIcon
                      className="cursor-pointer w-6 h-6"
                      style={{ stroke: "#D0D0D0" }}
                      onClick={() => {}}
                    />
                    <div
                      className="text-sm flex items-center justify-center gap-2"
                      style={{
                        fontSize: "24px",
                        fontFamily: "Noto Sans KR",
                      }}
                    >
                      <p className="font-bold">{1}</p>
                      <p style={{ color: "#D0D0D0" }}> / </p>
                      <p style={{ color: "#D0D0D0" }}>1</p>
                    </div>
                    <ChevronRightIcon
                      className="cursor-pointer w-6 h-6"
                      style={{ stroke: "#D0D0D0" }}
                      onClick={() => {}}
                    />
                  </div>
                )}
              </CSContext.Provider>
            </div>
          </div>
        </div>
      </div>
      <div className="h-24" />
      <Footer />
    </div>
  );
};

const LeftMenuItem = ({
  title,
  href,
  isLast,
}: {
  title: string;
  href: string;
  isLast?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      onClick={() => navigate(href)}
      className={`h-24 flex justify-center items-center cursor-pointer text-center text-[1.3rem] ${
        location.pathname.endsWith(href) ? "text-alco-mint" : "text-black"
      } max-header:h-full`}
    >
      {title}
    </div>
  );
};
