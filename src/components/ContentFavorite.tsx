import { ReactComponent as Hamburger } from "@svg/Hamburger.svg";
import { useNavigate } from "react-router-dom";
import { GenreTag } from "./GenreTag";

export const ContentFavorite = ({
  dat,
  genres,
  cont,
  nav,
  isBuy,
  setExpiredPopup,
}: {
  dat: any;
  genres: [];
  cont?: boolean;
  nav?: string;
  isBuy?: boolean;
  setExpiredPopup?: any;
}) => {
  const webtoonId = isBuy ? dat.ID : dat.webtoon_id;
  const navigate = useNavigate();
  return (
    <div className="flex flex-row p-2 gap-5 h-48 pr-20 border-b-2 border-[#D0D0D0] max-header:py-2 max-header:px-0 max-header:gap-4 max-header:h-36">
      <img
        className="rounded-xl"
        src={
          dat.thumbnails.thumbnail
            ? dat.thumbnails.thumbnail
            : "/placeholder.webp"
        }
        style={{
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "20px",
        }}
      />
      <div
        className="flex flex-col justify-center pl-5 gap-2 max-header:pl-0 max-header:justify-start max-header:pt-1"
      >
        <div className="text-xl font-bold text-ellipsis-2-line max-header:text-base">{dat.webtoon_name}</div>
        <div className="flex gap-1 flex-wrap max-h-[64px] overflow-hidden">
          {genres?.map((tag: any, index: number) => (
            <GenreTag tag={tag} key={index} className="" fontSize="0.8rem" />
          ))}
        </div>
        <div
          className="w-fit h-fit px-4 py-2 bg-alco-mint text-white rounded-lg flex items-center justify-center text-sm cursor-pointer font-bold max-header:py-1 max-header:text-xs"
          onClick={() => {
            if (dat?.ExpiredAt !== "None" && new Date() > new Date(dat?.ExpiredAt.replace(/-/g, '/'))) {
              setExpiredPopup(true)
            } else {
              navigate(
                `/${
                  dat.ContentType === 0 ? "webtoon" : "webnovel"
                }/episodes/view/${webtoonId}/${
                  cont ? dat.EpisodeID?.split("_E")[1] : "001"
                }`
              );
            }
          }}
        >
          {cont ? "이어보기" : "첫화보기"}
        </div>
      </div>
      <div
        className={`flex justify-center items-center ml-auto cursor-pointer`}
        style={{ fontSize: "1.2rem", fontWeight: "500" }}
        onClick={() => {
          navigate(
            `/${
              dat.ContentType === 0 ? "webtoon" : "webnovel"
            }/episodes/${webtoonId}`
          );
        }}
      >
        <Hamburger className="w-12 h-12 max-header:w-8 max-header:h-8" />
      </div>
    </div>
  );
};
