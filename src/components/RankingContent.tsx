import { GenreTag } from "./GenreTag";
import { useNavigate } from "react-router-dom";

export const RankingContent = ({
  image,
  title,
  tags,
  id,
  idx,
  isSmall,
  isBottom,
}: {
  image: any;
  title: string;
  tags: any;
  id: any;
  idx?: number;
  isSmall?: boolean;
  isBottom?: boolean;
}) => {
  const navigate = useNavigate();
  // console.log(idx);
  return (
    <div className={`relative ${isBottom ? "mb-5" : ""} max-lg:mb-0`}>
      {idx && idx % 10 === 1 && (
        <div className="absolute top-[-1rem] left-[-1.5rem] w-16 h-16 text-[2.5rem] pb-3 text-center text-white font-notokr bg-opacity-[65%] bg-[#EAB021] rounded-[20px] flex items-center justify-center font-bold max-header:left-[-0.5rem]">
          {idx}
        </div>
      )}
      <div className={`w-full h-full ${isSmall && "p-1"}`}>
        <div
          className="col-span-1 w-full h-full bg-white"
          style={{
            borderRadius: "20px",
          }}
          onClick={() => {
            navigate(`/webtoon/episodes/${id}`);
          }}
        >
          <img
            className="w-full"
            src={image}
            style={{ borderRadius: "20px 20px 0 0" }}
          />
          <div
            className="pl-2 text-left mt-3 text-sm truncate text-md mb-2"
            style={{ fontFamily: "Noto Sans KR" }}
          >
            {title}
          </div>
          <div className="flex flex-row pl-2 mb-3 gap-1 overflow-auto hide-scroll">
            {tags.map((tag: any, index: number) => (
              <GenreTag tag={tag} key={index} fontSize="0.7rem" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
