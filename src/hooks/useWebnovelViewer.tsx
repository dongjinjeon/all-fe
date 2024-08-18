import { useState, useEffect } from "react";
import {
  useGetWebnovelDetailMutation,
  useGetWebnovelEpisodesMutation,
  useGetWebnovelCutsMutation,
} from "@services/webnovel";
import { useSetFavoriteWebnovelMutation } from "@services/user";
import { useAppSelector } from "@store";

export const useWebnovelViewer = (webtoon_id: string) => {
  const { userId, session_token } = useAppSelector(
    (state) => state.storage.session.globalUserSlice
  );

  const placeholder1 = Array.from({ length: 14 }, () => ({
    thumbnails: { thumbnail: "/placeholder.webp" },
    name: "",
    isFree: false,
    id: "",
    price: { rent: 0, buy: 0 },
  }));

  const [webtoonDetails, setWebtoonDetails] = useState<any>();
  const [episodeCuts, setEpisodeCuts] = useState<any>({ cuts: [] });
  const [episodeDetails, setEpisodeDetails] = useState<any>([]);
  const [episodeDetailsList, setEpisodeDetailsList] =
    useState<any>(placeholder1);

  const [episodePagination, setEpisodePagination] = useState<number>(0);
  const [episodeSort, setEpisodeSort] = useState<string>("asc");

  const [getWebtoonDetail, { data: detailData }] =
    useGetWebnovelDetailMutation();
  const [
    getWebtoonEpisodes,
    { data: episodeDetailData, isError: episodeError2 },
  ] = useGetWebnovelEpisodesMutation();
  const [getEpisodeCuts, { data: episodeCutsData, isError: episodeError }] =
    useGetWebnovelCutsMutation();
  const [setFavorite] = useSetFavoriteWebnovelMutation();

  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [isLoadingCuts, setIsLoadingCuts] = useState(false);

  useEffect(() => {
    if (detailData) setWebtoonDetails(detailData);
    if (episodeDetailData) setEpisodeDetails(episodeDetailData);
    if (episodeDetailData) setEpisodeDetailsList(episodeDetailData.list);
    if (episodeCutsData) setEpisodeCuts(episodeCutsData);
  }, [detailData, episodeDetailData, episodeCutsData]);

  useEffect(() => {
    getWebtoonDetail({
      id: webtoon_id,
      UserID: userId,
    });
    setEpisodePagination(0);
    getWebtoonEpisodes({
      id: webtoon_id,
      UserID: userId,
      page: 0,
      limit: 14,
      sort: episodeSort,
    });
  }, [webtoon_id]);

  useEffect(() => {
    setIsLoadingEpisodes(true)
    if (episodePagination < 0) {
      setEpisodePagination(0);
    } else {
      getWebtoonEpisodes({
        id: webtoon_id,
        UserID: userId,
        page: episodePagination,
        limit: 14,
        sort: episodeSort,
      }).finally(() => setIsLoadingEpisodes(false));
    }
  }, [episodePagination, episodeSort]);

  const getWebtoonCuts = async (episode_id: string) => {
    setIsLoadingCuts(true);
    try {
      await getEpisodeCuts({
        episode_id,
        UserID: userId,
      }).unwrap();
    } catch (error) {
      console.error("Error fetching episode cuts:", error);
    } finally {
      setIsLoadingCuts(false);
    }
  };

  const setFavoriteWebtoon = async () => {
    await setFavorite({
      NovelID: Number(webtoon_id),
      token: session_token,
    });
  };

  return {
    webtoonDetails,
    episodeDetails,
    episodeDetailsList,
    episodeCuts,
    getEpisodeCuts: getWebtoonCuts,
    setFavoriteWebtoon,
    episodePagination,
    setEpisodePagination,
    episodeSort,
    setEpisodeSort,
    getWebtoonEpisodes,
    isLoadingEpisodes,
    setIsLoadingEpisodes,
    isLoadingCuts,
  };
};
