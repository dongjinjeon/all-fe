import { useEffect, useState } from "react";
import { useGetNoticesMutation, useGetFAQMutation } from "@services/cs";

export const useCS = () => {
  const [notices, setNotices] = useState<any>([]);
  const [faq, setFAQ] = useState<any>([]);

  const [getNotices, { data: noticeData }] = useGetNoticesMutation();
  const [getFAQ, { data: faqData }] = useGetFAQMutation();

  useEffect(() => {
    getNotices({ page: 1, count: 10, country: "ko" });
    getFAQ({ page: 1, count: 10, country: "ko" });
  }, []);

  useEffect(() => {
    if (noticeData) {
      // sort noticeData by noticeID
      let sorted = noticeData.slice();
      sorted.sort((a: any, b: any) => {
        return a.noticeID - b.noticeID;
      });
      setNotices(sorted);
    }
    if (faqData) {
      setFAQ(faqData);
    }
  }, [noticeData, faqData]);

  return { notices, faq };
};
