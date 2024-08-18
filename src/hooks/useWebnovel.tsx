import { LanguageContext } from "@context/LanguageContext";
import {
  useGetMillionWebnovelMutation,
  useGetNewWebnovelMutation,
  useGetPopularWebnovelMutation,
  useGetTodayFreeWebnovelMutation,
  useSearchWebnovelMutation,
} from "@services/webnovel";
import { useGetBannerMutation } from "@services/webtoon";
import { useContext, useEffect, useState } from "react";

export const useWebnovel = () => {
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

  const [todayFreeWebnovel, setTodayFreeWebnovel] = useState(placeholderType1);
  const [millionWebnovel, setMillionWebnovel] = useState(placeholderType1);
  const [popularWebnovel, setPopularWebnovel] = useState(placeholderType2);
  const [newWebnovel, setNewWebnovel] = useState<any>(placeholderType2);
  const [mainBanner, setMainBanner] = useState<any>(placeholderBanner);
  const [subBanner, setSubBanner] = useState<any>(placeholderBanner);
  const [rankingWebnovel, setRankingWebnovel] = useState<any>(placeholderType3);
  const [listedWebnovel, setListedWebnovel] = useState<any>([]);

  /* */
  const [mon, setMon] = useState<any>([]);
  const [tue, setTue] = useState<any>([]);
  const [wed, setWed] = useState<any>([]);
  const [thu, setThu] = useState<any>([]);
  const [fri, setFri] = useState<any>([]);
  const [sat, setSat] = useState<any>([]);
  const [sun, setSun] = useState<any>([]);
  /* */

  const [genreRankingWebnovel, setGenreRankingWebnovel] =
    useState<any>(placeholderType3);
  const [favoriteWebnovel, setFavoriteWebnovel] = useState(placeholderType2);
  const [searchResultWebnovels, setSearchResultWebnovel] =
    useState(placeholderType2);

  const [getMonWebnovels, { data: monData }] = useSearchWebnovelMutation();
  const [getTueWebnovels, { data: tueData }] = useSearchWebnovelMutation();
  const [getWedWebnovels, { data: wedData }] = useSearchWebnovelMutation();
  const [getThuWebnovels, { data: thuData }] = useSearchWebnovelMutation();
  const [getFriWebnovels, { data: friData }] = useSearchWebnovelMutation();
  const [getSatWebnovels, { data: satData }] = useSearchWebnovelMutation();
  const [getSunWebnovels, { data: sunData }] = useSearchWebnovelMutation();

  const [rankingGenre, setRankingGenre] = useState<any>("Romance");

  const [getTodayFreeWebnovel, { data: todayFreeData, isError }] =
    useGetTodayFreeWebnovelMutation();
  const [getMillionWebnovel, { data: millionData, isError: millionError }] =
    useGetMillionWebnovelMutation();
  const [getPopularWebnovel, { data: popularData, isError: popularError }] =
    useGetPopularWebnovelMutation();
  const [getBanner, { data: bannerData, isError: bannerError }] =
    useGetBannerMutation();
  const [getSubBanner, { data: subBannerData }] = useGetBannerMutation();
  const [getNewWebnovel, { data: newWebnovelData, isError: newWebnovelError }] =
    useGetNewWebnovelMutation();
  const [getRanking, { data: rankingData, isError: rankError }] =
    useSearchWebnovelMutation();
  const [getGenreRanking, { data: genreRankingData, isError: genreRankError }] =
    useSearchWebnovelMutation();
  const [
    searchWebnovelByKeyword,
    { data: searchResData, isError: searchResError },
  ] = useSearchWebnovelMutation();
  const [
    getListedWebnovels,
    { data: listedWebnovelData, isError: listedWebnovelError },
  ] = useSearchWebnovelMutation();

  useEffect(() => {
    if (todayFreeData) setTodayFreeWebnovel(todayFreeData);
    if (millionData) setMillionWebnovel(millionData);
    if (popularData) setPopularWebnovel(popularData);
    if (bannerData)
      setMainBanner(
        bannerData.filter((_: any) => {
          return _.view_type === 0;
        })
      );
    if (subBannerData)
      setSubBanner(
        subBannerData.filter((_: any) => {
          return _.view_type === 0;
        })
      );
    if (newWebnovelData) setNewWebnovel(newWebnovelData);
    if (rankingData) {
      // const translatedArray = [];
      //
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

      setRankingWebnovel(translatedArray);
    }
    if (genreRankingData) setGenreRankingWebnovel(genreRankingData);
    if (listedWebnovelData) setListedWebnovel(listedWebnovelData);
    if (searchResData) setSearchResultWebnovel(searchResData);
  }, [
    todayFreeData,
    millionWebnovel,
    popularWebnovel,
    bannerData,
    subBannerData,
    newWebnovelData,
    rankingData,
    genreRankingData,
    listedWebnovelData,
    searchResData,
  ]);

  const handleLink = (link_type: string, link: string) => {
    if (link_type === "internal") {
      if (link === "/login") {

      }
      return link;
    } else if (link_type === "external") {
      return link.startsWith("https") ? link : `https://${link}`;
    }
    return link;
  };

  useEffect(() => {
    const isShinhanDomain = window.location.hostname === "shinhan.allcomics.org";

    getTodayFreeWebnovel({
      page: 1,
      count: 10,
      language: currentLanguage,
    });
    getMillionWebnovel({
      page: 1,
      count: 6,
      language: currentLanguage,
    });
    getNewWebnovel({
      page: 1,
      count: 10,
      language: currentLanguage,
    });
    getPopularWebnovel({
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
    getListedWebnovels({
      page: 0,
      limit: 50,
      days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      order: "desc",
      language: currentLanguage,
    });
    getMonWebnovels({
      page: 0,
      limit: 50,
      days: ["mon"],
      order: "desc",
      language: currentLanguage,
    });
    getTueWebnovels({
      page: 0,
      limit: 50,
      days: ["tue"],
      order: "desc",
      language: currentLanguage,
    });
    getWedWebnovels({
      page: 0,
      limit: 50,
      days: ["wed"],
      order: "desc",
      language: currentLanguage,
    });
    getThuWebnovels({
      page: 0,
      limit: 50,
      days: ["thu"],
      order: "desc",
      language: currentLanguage,
    });
    getFriWebnovels({
      page: 0,
      limit: 50,
      days: ["fri"],
      order: "desc",
      language: currentLanguage,
    });
    getSatWebnovels({
      page: 0,
      limit: 50,
      days: ["sat"],
      order: "desc",
      language: currentLanguage,
    });
    getSunWebnovels({
      page: 0,
      limit: 50,
      days: ["sun"],
      order: "desc",
      language: currentLanguage,
    });
  }, []);

  useEffect(() => {
    if (monData) setMon(monData);
    if (tueData) setTue(tueData);
    if (wedData) setWed(wedData);
    if (thuData) setThu(thuData);
    if (friData) setFri(friData);
    if (satData) setSat(satData);
    if (sunData) setSun(sunData);
  }, [monData, tueData, wedData, thuData, friData, satData, sunData]);

  useEffect(() => {
    getGenreRanking({
      page: 0,
      limit: 20,
      genres: [rankingGenre],
      order: "desc",
      sort: "total_views",
      language: currentLanguage,
    });
    console.log(rankingGenre);
  }, [rankingGenre]);

  const searchWebnovelByKeywordHandler = (keyword: string) => {
    searchWebnovelByKeyword({
      page: 0,
      limit: 10,
      order: "desc",
      keyword: keyword,
      language: currentLanguage,
    });
  };

  return {
    todayFreeWebnovel,
    rankingWebnovel,
    millionWebnovel,
    popularWebnovel,
    searchResultWebnovels,
    newWebnovel,
    mainBanner,
    subBanner,
    genreRankingWebnovel,
    listedWebnovel,
    favoriteWebnovel,
    setRankingGenre,
    searchWebnovelByKeyword: searchWebnovelByKeywordHandler,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
  };
};
