import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useWebnovelViewer } from "@hooks/useWebnovelViewer";
import EpubViewer from "@components/EpubViewer";
import {Loading} from "@components/Loading";

export const Episode = () => {
  const { id, episode } = useParams();
  const { webtoonDetails, episodeCuts, getEpisodeCuts, episodeDetailsList, episodePagination, setEpisodePagination, setIsLoadingEpisodes, getWebtoonEpisodes, isLoadingCuts, isLoadingEpisodes } =
    useWebnovelViewer(id!);

  const [epub, setEpub] = useState<string>("");

  useEffect(() => {
    if (episodeCuts.cuts[0]) {
      setEpub(episodeCuts.cuts[0]);
    }
  }, [episodeCuts]);

  useEffect(() => {
    getEpisodeCuts(`${id}_E${episode}`);
  }, [id, episode]);

  return (
    <div className="flex items-center justify-center flex-col text-white">
      {isLoadingEpisodes || isLoadingCuts ?
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-50">
          <Loading />
        </div>
        : null}
      <EpubViewer
        url={epub}
        id={id!}
        episode={episode}
        episodeDetailsList={episodeDetailsList}
        webtoonDetails={webtoonDetails}
        episodePagination={episodePagination}
        setEpisodePagination={setEpisodePagination}
        setIsLoadingEpisodes={setIsLoadingEpisodes}
        getWebtoonEpisodes={getWebtoonEpisodes}
      />
    </div>
  );
};
