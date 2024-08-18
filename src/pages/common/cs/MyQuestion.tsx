import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { ReactComponent as ChevronDownIcon } from "@svg/ChevronDown.svg";

import { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";

export const MyQuestion = () => {
  const { questionListData } = useContext(UserContext);
  return (
    <div className="pt-3">
      <div
        className="grid grid-cols-10 text-center pb-3 font-bold"
        style={{ borderBottom: "1px solid #D0D0D0" }}
      >
        <div className="col-span-2 max-sm:col-span-3">답변현황</div>
        <div className="col-span-5 max-sm:col-span-7">제목</div>
        <div className="col-span-2 max-sm:hidden">작성일</div>
        <div className="col-span-1"></div>
      </div>
      {questionListData?.map((data: any, index: number) => {
        return (
          <MyQuestionContent
            key={index}
            title={data.Title}
            content={data.Content}
            date={data.CreatedAt}
            status={data.Status}
          />
        );
      })}
    </div>
  );
};

const MyQuestionContent = ({
  title,
  content,
  date,
  status,
}: {
  title: string;
  content: string;
  date: string;
  status: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div
        className="grid grid-cols-10 text-center font-bold justify-center items-center py-2"
        style={{ borderBottom: "1px solid #D0D0D0", }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="col-span-2 flex justify-center items-center max-sm:col-span-3">
          {status === 0 ? (
            <div className="bg-black text-white rounded-lg flex items-center justify-center w-24 min-w-[32px] h-8 max-md:text-sm max-md:px-1">
              답변대기
            </div>
          ) : (
            <div className="bg-alco-mint text-white rounded-lg flex items-center justify-center w-24 h-8 min-w-[32px] max-md:text-sm max-md:px-1">
              답변완료
            </div>
          )}
        </div>
        <div className="col-span-5 break-all max-sm:col-span-6">{title}</div>
        <div className="col-span-2 break-all max-sm:hidden">{date.split(" ")[0]}</div>
        <div className="col-span-1 ml-auto mr-10">
          <ChevronDownIcon style={{ stroke: "#D0D0D0" }} />
        </div>
      </div>
      {isExpanded && (
        <div
          className="p-4 break-all"
          style={{
            transition: "height 0.3s ease",
            borderBottom: "1px solid #D0D0D0",
          }}
        >
          {/* Add your drawer content here */}
          {content}
        </div>
      )}
    </>
  );
};
