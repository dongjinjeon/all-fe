import { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
export const OneToOne = () => {
  const { registerQuestion } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="flex flex-row pt-3">
      <div className="flex flex-col max-sm:hidden">
        <div className="bg-alco-mint text-white rounded-lg flex items-center justify-center w-32 h-12 mb-3">
          제목
        </div>
        <div className="bg-alco-mint text-white rounded-lg flex items-center justify-center w-32 h-12">
          문의내용
        </div>
      </div>
      <div className="flex flex-col w-full">
        <input
          maxLength={20}
          className="bg-gray-100 h-12 mb-3 ml-3 rounded-lg pl-5 max-sm:ml-0"
          type="text"
          placeholder="제목을 입력하세요 (20자 이내)"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <textarea
          maxLength={300}
          className="bg-gray-100 ml-3 rounded-lg h-96 pl-5 pt-5 max-sm:ml-0"
          placeholder="문의 내용을 입력하세요 (300자 이내)"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <div className="flex flex-row gap-2">
          <div
            className="text-left text-sm ml-3 mt-2"
            style={{ fontWeight: "400", fontSize: "12px", color: "#757575" }}
          >
            <p>-답변은 상단의 문의 내역에서 확인 가능하십니다. </p>
            <p>-빠른 시일 내에 답변 드릴 수 있도록 노력하겠습니다. </p>
          </div>
          <button
            onClick={async () => {
              await registerQuestion(title, content);
              alert("문의가 등록되었습니다.");
              setTitle("");
              setContent("");
            }}
            className="bg-alco-mint text-white rounded-lg flex items-center justify-center w-32 h-12 mb-3 ml-auto mt-2"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
