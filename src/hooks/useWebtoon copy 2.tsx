import { LanguageContext } from "@context/LanguageContext";
import {
  useGetBannerMutation,
  useGetMillionWebtoonMutation,
  useGetNewWebtoonMutation,
  useGetPopularWebtoonMutation,
  useGetTodayFreeWebtoonMutation,
  useSearchWebtoonMutation,
} from "@services/webtoon";
import { useContext, useEffect, useState } from "react";

export const useWebtoon = () => {
  const { currentLanguage } = useContext(LanguageContext);

  const placeholderBanner = [{ imageURL: "/bannerplaceholder.webp" }];
  const placeholderType1 = Array.from({ length: 5 }, () => ({
    thumbnails: { thumbnail: "/placeholder.webp" },
    webtoon_name: "",
    webtoon_id: "",
  }));
  const placeholderType2 = Array.from({ length: 10 }, () => ({
    thumbnails: { thumbnail: "/placeholder.webp" },
    webtoon_name: "",
    webtoon_id: "",
  }));
  const placeholderType3 = Array.from({ length: 10 }, () => ({
    thumbnails: { thumbnail: "/placeholder.webp" },
    name: "",
    genres: [],
    id: "",
  }));

  const [todayFreeWebtoon, setTodayFreeWebtoon] = useState(placeholderType1);
  const [millionWebtoon, setMillionWebtoon] = useState(placeholderType1);
  const [popularWebtoon, setPopularWebtoon] = useState(placeholderType2);
  const [newWebtoon, setNewWebtoon] = useState<any>(placeholderType2);
  const [mainBanner, setMainBanner] = useState<any>(placeholderBanner);
  const [subBanner, setSubBanner] = useState<any>(placeholderBanner);
  const [rankingWebtoon, setRankingWebtoon] = useState<any>(placeholderType3);
  const [listedWebtoon, setListedWebtoon] = useState<any>([]);

  /* */
  const [mon, setMon] = useState<any>([]);
  const [tue, setTue] = useState<any>([]);
  const [wed, setWed] = useState<any>([]);
  const [thu, setThu] = useState<any>([]);
  const [fri, setFri] = useState<any>([]);
  const [sat, setSat] = useState<any>([]);
  const [sun, setSun] = useState<any>([]);
  /* */
  const [genreRankingWebtoon, setGenreRankingWebtoon] =
    useState<any>(placeholderType3);
  const [favoriteWebtoon, setFavoriteWebtoon] = useState(placeholderType2);
  const [searchResultWebtoons, setSearchResultWebtoon] =
    useState(placeholderType2);

  const [rankingGenre, setRankingGenre] = useState<any>("Romance");

  const [getTodayFreeWebtoon, { data: todayFreeData, isError }] =
    useGetTodayFreeWebtoonMutation();
  const [getMillionWebtoon, { data: millionData, isError: millionError }] =
    useGetMillionWebtoonMutation();
  const [getPopularWebtoon, { data: popularData, isError: popularError }] =
    useGetPopularWebtoonMutation();
  const [getBanner, { data: bannerData, isError: bannerError }] =
    useGetBannerMutation();
  const [getSubBanner, { data: subBannerData }] = useGetBannerMutation();

  const [getNewWebtoon, { data: newWebtoonData, isError: newWebtoonError }] =
    useGetNewWebtoonMutation();
  const [getRanking, { data: rankingData, isError: rankError }] =
    useSearchWebtoonMutation();
  const [getGenreRanking, { data: genreRankingData, isError: genreRankError }] =
    useSearchWebtoonMutation();
  const [
    searchWebtoonByKeyword,
    { data: searchResData, isError: searchResError },
  ] = useSearchWebtoonMutation();
  const [
    getListedWebtoons,
    { data: listedWebtoonData, isError: listedWebtoonError },
  ] = useSearchWebtoonMutation();

  const [getMonWebtoons, { data: monData }] = useSearchWebtoonMutation();
  const [getTueWebtoons, { data: tueData }] = useSearchWebtoonMutation();
  const [getWedWebtoons, { data: wedData }] = useSearchWebtoonMutation();
  const [getThuWebtoons, { data: thuData }] = useSearchWebtoonMutation();
  const [getFriWebtoons, { data: friData }] = useSearchWebtoonMutation();
  const [getSatWebtoons, { data: satData }] = useSearchWebtoonMutation();
  const [getSunWebtoons, { data: sunData }] = useSearchWebtoonMutation();

  useEffect(() => {
    if (todayFreeData) setTodayFreeWebtoon(todayFreeData);
    if (millionData) setMillionWebtoon(millionData);
    if (popularData) setPopularWebtoon(popularData);
    if (bannerData)
      setMainBanner(
        bannerData
          .filter((_: any) => _.view_type === 0)
          .map((banner: any) => ({
            ...banner,
            onClick: () => handleBannerClick(banner.link_type, banner.link),
          }))
      );
    if (subBannerData)
      setSubBanner(
        subBannerData
          .filter((_: any) => _.view_type === 0)
          .map((banner: any) => ({
            ...banner,
            onClick: () => handleBannerClick(banner.link_type, banner.link),
          }))
      );
    if (newWebtoonData) setNewWebtoon(newWebtoonData);
    if (rankingData) {
      // let translatedArray = [];
      // for (let i = 0; i < 4; i++) {
      //   for (let j = 0; j < 3; j++) {
      //     translatedArray[i * 3 + j] = {
      //       ...rankingData[j * 4 + i],
      //       rank: j * 4 + i + 1,
      //     };
      //   }
      // }
      const translatedArray = [
        ...rankingData.map((item:any, index:any) => ({
          ...item, rank: index+1
        }))
      ];

      setRankingWebtoon(translatedArray);
    }
    if (genreRankingData) setGenreRankingWebtoon(genreRankingData);
    if (listedWebtoonData) setListedWebtoon(listedWebtoonData);
    if (searchResData) setSearchResultWebtoon(searchResData);
  }, [
    todayFreeData,
    millionWebtoon,
    popularWebtoon,
    bannerData,
    subBannerData,
    newWebtoonData,
    rankingData,
    genreRankingData,
    listedWebtoonData,
    searchResData,
  ]);

  const handleBannerClick = (link_type: string, link: string) => {
    console.log("Link Type:", link_type);
    console.log("Link:", link);
    if (link_type === "internal") {
      if (link === "/login") {
         window.location.assign(isLoggedIn() ? "/my-info" : "/login");
    } else {
        window.location.assign(link);
    }
    } else if (link_type === "external") {
      window.location.href = link.startsWith("https") ? link : `https://${link}`;
    }
  };

  const isLoggedIn = () => {

    return !!localStorage.getItem("authToken");
  };

  useEffect(() => {
    const isShinhanDomain = window.location.hostname === "shinhan.allcomics.org";
    
    getTodayFreeWebtoon({
      page: 1,
      count: 10,
      language: currentLanguage,
    });
    getMillionWebtoon({
      page: 1,
      count: 6,
      language: currentLanguage,
    });
    getNewWebtoon({
      page: 1,
      count: 10,
      language: currentLanguage,
    });
    getPopularWebtoon({
      page: 1,
      count: 20,
      language: currentLanguage,
    });
    getBanner({
      page: 1,
      count: 5,
      category: isShinhanDomain ? "shinhan" : "general",
      SubCategory: "main",
      Locale: currentLanguage,
    });
    getSubBanner({
      page: 1,
      count: 5,
      category: isShinhanDomain ? "shinhan" : "general",
      SubCategory: "bottom",
      Locale: currentLanguage,
    });
    getRanking({
      page: 0,
      limit: 12,
      sort: "total_views",
      order: "desc",
      language: currentLanguage,
    });
    getListedWebtoons({
      page: 0,
      limit: 50,
      days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      order: "desc",
      language: currentLanguage,
    });
    getMonWebtoons({
      page: 0,
      limit: 50,
      days: ["mon"],
      order: "desc",
      language: currentLanguage,
    });
    getTueWebtoons({
      page: 0,
      limit: 50,
      days: ["tue"],
      order: "desc",
      language: currentLanguage,
    });
    getWedWebtoons({
      page: 0,
      limit: 50,
      days: ["wed"],
      order: "desc",
      language: currentLanguage,
    });
    getThuWebtoons({
      page: 0,
      limit: 50,
      days: ["thu"],
      order: "desc",
      language: currentLanguage,
    });
    getFriWebtoons({
      page: 0,
      limit: 50,
      days: ["fri"],
      order: "desc",
      language: currentLanguage,
    });
    getSatWebtoons({
      page: 0,
      limit: 50,
      days: ["sat"],
      order: "desc",
      language: currentLanguage,
    });
    getSunWebtoons({
      page: 0,
      limit: 50,
      days: ["sun"],
      order: "desc",
      language: currentLanguage,
    });
  }, []);

  useEffect(() => {
    getGenreRanking({
      page: 0,
      limit: 20,
      genres: [rankingGenre],
      order: "desc",
      sort: "total_views",
      language: currentLanguage,
    });
  }, [rankingGenre]);

  useEffect(() => {
    if (monData) setMon(monData);
    if (tueData) setTue(tueData);
    if (wedData) setWed(wedData);
    if (thuData) setThu(thuData);
    if (friData) setFri(friData);
    if (satData) setSat(satData);
    if (sunData) setSun(sunData);
  }, [monData, tueData, wedData, thuData, friData, satData, sunData]);

  const searchWebtoonByKeywordHandler = (keyword: string) => {
    searchWebtoonByKeyword({
      page: 0,
      limit: 10,
      order: "desc",
      keyword: keyword,
      language: currentLanguage,
    });
  };

  return {
    todayFreeWebtoon,
    rankingWebtoon,
    millionWebtoon,
    popularWebtoon,
    searchResultWebtoons,
    newWebtoon,
    mainBanner,
    subBanner,
    genreRankingWebtoon,
    listedWebtoon,
    favoriteWebtoon,
    setRankingGenre,
    searchWebtoonByKeyword: searchWebtoonByKeywordHandler,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
  };
};
