import { ReactComponent as ChevronLeftIcon } from "@svg/ChevronLeft.svg";
import { ReactComponent as ChevronRightIcon } from "@svg/ChevronRight.svg";
import { ReactComponent as ChevronDownIcon } from "@svg/ChevronDown.svg";
import { CSContext } from "@context/CSContext";
import { useContext, useState } from "react";

export const FAQ = () => {
  const { faq } = useContext(CSContext);

  return (
    <div className="h-full">
      {faq?.map((item: any, index: number) => {
        return <FAQContent key={index} content={item} />;
      })}
    </div>
  );
};

const FAQContent = ({ content }: { content: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div
        className="font-bold text-lg py-3 flex items-center pl-5 pr-10"
        style={{ borderBottom: "1px solid #D0D0D0" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="">Q. {content.title}</div>
        <div className="ml-auto">
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
          {content.content}
        </div>
      )}
    </>
  );
};
