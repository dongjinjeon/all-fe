import { ReactComponent as LogoFooter } from "../svg/Logo.svg";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div
      className={`mt-auto flex flex-col items-start bg-alco-gray-100 border-t border-allco-g3 font-notokr font-medium ${
        location.pathname.startsWith("/webnovel/episodes/view") && "hidden"
      } w-full`}
      style={{
        borderTop: "1.5px solid #8E8E8E",
      }}
    >
      <div className="w-full px-0">
        <div className="flex items-center text-center gap-5 text-alco-gray-400 mx-auto w-full max-w-[1200px] flex-row pt-2 pb-2 text-base max-lg:text-xs max-header:px-4 max-header:gap-4">
          <a
            href="https://sites.google.com/view/allcomics-terms/kor?authuser=3"
            target="_blank" rel="noreferrer"
          >
            {t("header.privacy")}
          </a>
          <div>|</div>
          <a
            href="https://sites.google.com/view/terms-youth/kor?authuser=3"
            target="_blank" rel="noreferrer"
          >
            {t("header.policy")}
          </a>
          <div>|</div>
          <a
            href="https://sites.google.com/view/youth-terms/kor?authuser=3"
            target="_blank" rel="noreferrer"
          >
            {t("header.youthpolicy")}
          </a>
        </div>
        <div className="w-full" style={{ borderTop: "1.5px solid #8E8E8E" }} />
        <div className="mx-auto w-full max-w-[1200px] pb-10 max-header:px-4">
          <div className="flex items-start mt-10 text-alco-gray-400 text-base max-lg:text-xs max-header:mt-5">
            {t("main.footer.top")}
          </div>
          <div className="flex items-start text-alco-gray-400 text-base max-lg:text-xs">
            Ⓒ AI and Metaverse all right reserved.
          </div>
          <div className="flex items-center gap-1.5 ml-113 mt-5 h-35 break-all">
            <img src="/logogray.png" className="w-24 h-18" />
            <div className="flex flex-col text-alco-gray-300 text-base max-lg:text-xs">
              <p>대표자명: 성경준</p>
              <p>{t("main.footer.contact")}: 02-6243-6241</p>
              <p>{t("main.footer.email")}: webtoontv@naver.com</p>
              <p>
                {t("main.extra-footer.title.registration-number")}: 656-86-00544
              </p>
              <p>통신판매업신고번호: 제 2020-서울마포-1279호</p>
              <p className="">
                {t("main.extra-footer.title.address")}: 서울시 마포구 월드컵북로
                54길 25, 913호
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
