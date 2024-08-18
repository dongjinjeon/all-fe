import { GenreTag } from "./GenreTag";
import { useNavigate } from "react-router-dom";

export const WebtoonContent = ({
  image,
  title,
  tags,
  id,
}: {
  image: any;
  title: string;
  tags: any;
  id: any;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="col-span-1 max-w-[164px] max-h-[304px] bg-white rounded-[20px] z-[20]"
      style={{
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
      }}
      onClick={() => {
        navigate(`/webtoon/episodes/${id}`);
      }}
    >
      <div className="p-2">
        <img className="w-full rounded-[20px]" src={image} />
      </div>
      <div
        className="pl-2 text-left mt-1 text-sm truncate text-md mb-2"
        style={{ fontFamily: "Noto Sans KR" }}
      >
        {title}
      </div>
      <div className="flex flex-row pl-2 mb-3 gap-1">
        {tags.map((tag: any, index: number) => (
          <GenreTag tag={tag} key={index} fontSize="0.7rem" />
        ))}
      </div>
    </div>
  );
};
