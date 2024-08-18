import { GenreTag } from "./GenreTag";
import { useNavigate } from "react-router-dom";

export const ListedContent = ({
  image,
  title,
  tags,
  id,
  type,
}: {
  image: any;
  title: string;
  tags: any;
  id: any;
  type: string,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="col-span-1 max-w-[164px] max-h-[304px] bg-white rounded-[20px] z-[20] max-header:max-w-full max-header: max-h-full"
      onClick={() => {
        navigate(`/${type}/episodes/${id}`);
      }}
    >
      <div className="p-2 max-header:p-0">
        <img className="w-full rounded-[20px]" src={image} />
      </div>
      <div
        className="pl-2 text-left mt-1 text-sm truncate text-md mb-2 max-header:pl-1"
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
  );
};
