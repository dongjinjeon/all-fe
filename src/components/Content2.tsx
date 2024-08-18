import { ReactComponent as Hamburger } from "@svg/Hamburger.svg";
import { useNavigate } from "react-router-dom";
import { GenreTag } from "./GenreTag";

export const Content2 = ({ dat, nogenre }: { dat: any; nogenre?: boolean }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row p-2 gap-5 h-48 pr-20 border-b-2 border-[#D0D0D0] rounded-[20px] max-header:py-2 max-header:px-0 max-header:gap-4 max-header:h-36">
      <img
        className="rounded-xl"
        src={
          dat.thumbnails.thumbnail
            ? dat.thumbnails.thumbnail
            : "/placeholder.webp"
        }
        style={{
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      />
      <div
        className="flex flex-col justify-center pl-5 gap-2 max-header:pl-0 max-header:justify-start max-header:pt-1"
      >
        <div className="text-xl font-bold text-ellipsis-2-line max-header:text-base">{dat.novel_name}</div>
        <div className="flex gap-1 flex-wrap max-h-[64px] overflow-auto hide-scroll font-medium">
          {!nogenre &&
            dat.genres?.map((tag: any, index: number) => (
              <GenreTag tag={tag} key={index} className="max-header:text-xs" />
            ))}
        </div>
        <div
          className="w-fit h-fit px-4 py-2 bg-alco-mint text-white rounded-lg flex items-center justify-center text-sm cursor-pointer font-bold max-header:py-1"
          onClick={() => {
            navigate(`/webnovel/episodes/view/${dat.novel_id}/001`);
          }}
        >
          첫화보기
        </div>
      </div>
      <a
        className={`flex justify-center items-center ml-auto cursor-pointer`}
        style={{ fontSize: "1.2rem", fontWeight: "500" }}
        onClick={() => {
          navigate(`/webnovel/episodes/${dat.novel_id}`);
        }}
      >
        <Hamburger className="w-12 h-12 max-header:w-8 max-header:h-8" />
      </a>
    </div>
  );
};
