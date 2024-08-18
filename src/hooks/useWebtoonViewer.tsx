import { useState, useEffect } from "react";
import {
  useGetWebtoonDetailMutation,
  useGetWebtoonCutsMutation,
  useGetWebtoonEpisodesMutation,
} from "@services/webtoon";
import { useSetFavoriteMutation } from "@services/user";
import { useAppSelector } from "@store";

export const useWebtoonViewer = (webtoon_id: string) => {
  const { userId, token, session_token } = useAppSelector(
    (state) => state.storage.session.globalUserSlice
  );

  const placeholder1 = Array.from({ length: 1 }, () => ({
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
    useGetWebtoonDetailMutation();
  const [
    getWebtoonEpisodes,
    { data: episodeDetailData, isError: episodeError2 },
  ] = useGetWebtoonEpisodesMutation();
  const [getEpisodeCuts, { data: episodeCutsData, isError: episodeError }] =
    useGetWebtoonCutsMutation();
  const [setFavorite] = useSetFavoriteMutation();

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
      token: session_token,
    });
    setEpisodePagination(0);
    getWebtoonEpisodes({
      id: webtoon_id,
      page: 0,
      limit: 14,
      sort: episodeSort,
      token: session_token,
    });
  }, [webtoon_id]);

  useEffect(() => {
    setIsLoadingEpisodes(true)
    if (episodePagination < 0) {
      setEpisodePagination(0);
    } else {
      getWebtoonEpisodes({
        id: webtoon_id,
        page: episodePagination,
        limit: 14,
        sort: episodeSort,
        token: session_token,
      }).finally(() => setIsLoadingEpisodes(false));
    }
  }, [episodePagination, episodeSort]);

  const getWebtoonCuts = async (episode_id: string) => {
    setIsLoadingCuts(true);
    try {
      await getEpisodeCuts({
        episode_id,
        UserID: userId!,
        token: session_token,
      }).unwrap();
    } catch (error) {
      console.error("Error fetching episode cuts:", error);
    } finally {
      setIsLoadingCuts(false);
    }
  };

  const setFavoriteWebtoon = async () => {
    await setFavorite({
      WebtoonID: Number(webtoon_id),
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
