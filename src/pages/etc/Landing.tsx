import { useSearchParams } from "react-router-dom";

export const Landing = () => {
  const redirectToStore = () => {
    const userAgent = window.navigator.userAgent;
    if (/android/i.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=kr.co.all_comics";
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href =
        "https://apps.apple.com/us/app/allcomics/id1552315891";
    } else {
      window.location.href =
        "https://play.google.com/store/apps/details?id=kr.co.all_comics";
    }
  };

  return (
    <div className="flex flex-col justify-center sm:w-1/3 mx-auto">
      <img src="https://play-lh.googleusercontent.com/5G60fee-LHhP1HjeN6GW14YhgRIxOaQkOTmU8q_hBS2q9JBsM2wbb8ZVjxL-ZDhwz-xx=w2560-h1440-rw" />
      <img
        className="w-64 mx-auto"
        onClick={() => {
          window.location.href =
            "https://play.google.com/store/apps/details?id=kr.co.all_comics";
        }}
        src="https://play.google.com/intl/en_us/badges/static/images/badges/ko_badge_web_generic.png"
      />
      <img
        className="w-64 mx-auto"
        onClick={() => {
          window.location.href =
            "https://apps.apple.com/us/app/allcomics/id1552315891";
        }}
        src="https://developer.apple.com/news/images/download-on-the-app-store-badge.png"
      />
      <div className="h-8" />
      <img src="https://play-lh.googleusercontent.com/QFwVkwf3jxjePqFaEmZ_-G9WcadUS0qzhlgivQiQ0LTmEmlDwzXKIYoB0aTYeWaHVA=w2560-h1440-rw" />
      <img src="https://play-lh.googleusercontent.com/kAt6lnac3iwi0NyF1TlPWmxN_Mf5Pc3HnY9dP3YjRfQVqaNewJTGdoxkDoxOlq_-LRVt=w2560-h1440-rw" />
      <img src="https://play-lh.googleusercontent.com/DelFy13nx9oFObLZ3VmZi9aMQldwYrjzT6rC6OHiFUre_gD97rZamdyHHSMt61ngcAg=w2560-h1440-rw" />
      <img src="https://play-lh.googleusercontent.com/oQ3_jr60WvzahTYDX2VyXGmEhHmbxTiL92nT-koWBbpZk8SgPRuM2rXcPxoWp_QU3GA=w2560-h1440-rw" />
      <img src="https://play-lh.googleusercontent.com/_tDMOV1Iz57tEnHJMcxLjUoCIjDfJnuQf7vfqyVSCj9d4HOlbKg90NS_BZZPJdfnODEa=w2560-h1440-rw" />
    </div>
  );
};
