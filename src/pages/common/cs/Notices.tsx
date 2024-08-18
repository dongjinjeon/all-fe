import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { ReactComponent as ChevronDownIcon } from "@svg/ChevronDown.svg";
import { CSContext } from "@context/CSContext";
import { useContext, useState } from "react";

export const Notices = () => {
  const { notices } = useContext(CSContext);

  return (
    <div>
      <div
        className="grid grid-cols-10 text-left pl-10 py-3 max-md:pl-4"
        style={{ borderBottom: "1px solid #D0D0D0" }}
      >
        <div className="col-span-2 max-md:hidden">번호</div>
        <div className="col-span-4 max-md:col-span-6">제목</div>
        <div className="col-span-1 max-md:hidden">조회수</div>
        <div className="col-span-2 max-md:col-span-3">작성일</div>
      </div>
      {notices?.map((item: any, index: number) => {
        return <TableContent key={index} content={item} />;
      })}
    </div>
  );
};

const TableContent = ({ content }: { content: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function leftPad(value: any) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function toStringByFormatting(source: any, delimiter = "-") {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  }

  return (
    <>
      <div
        className="grid grid-cols-10 text-left flex justify-center h-14 items-center pl-10 max-md:pl-4"
        style={{ borderBottom: "1px solid #D0D0D0" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="col-span-2 max-md:hidden">{content.noticeID}</div>
        <div className="col-span-4 max-md:col-span-6 text-ellipsis-2-line">{content.title}</div>
        <div className="col-span-1 max-md:hidden">{content.viewCount}</div>
        <div className="col-span-2 max-md:col-span-3">
          {toStringByFormatting(new Date(content.updatedAt))}
        </div>
        <div className="col-span-1">
          <ChevronDownIcon style={{ stroke: "#D0D0D0" }} />
        </div>
      </div>
      {isExpanded && (
        <div
          className="p-4"
          style={{
            transition: "height 0.3s ease",
            borderBottom: "1px solid #D0D0D0",
          }}
        >
          {/* Add your drawer content here */}
          {content.content}
        </div>
      )}
    </>
  );
};
