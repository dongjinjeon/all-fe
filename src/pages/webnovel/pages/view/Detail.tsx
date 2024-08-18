import { useParams } from "react-router-dom";
import { useWebnovelViewer } from "@hooks/useWebnovelViewer";
import { Header } from "@components/Header";
import { Loading } from "@components/Loading";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ReactComponent as Star } from "@svg/Star.svg";
import { UserContext } from "@context/UserContext";
import { GenreTag } from "@components/GenreTag";
import { useTranslation } from "react-i18next";
import { EpisodeList } from "@components/EpisodeList";

export const Detail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    webtoonDetails,
    episodeDetails,
    episodeDetailsList,
    setFavoriteWebtoon,
    episodePagination,
    setEpisodePagination,
    episodeSort,
    setEpisodeSort,
  } = useWebnovelViewer(id!);

  const { favoriteWebtoonData } = useContext(UserContext);

  const [isOwn, setIsOwn] = useState(false);
  const [isOpen, setIsOpen] = useState(undefined);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoriteWebtoonData)
      setIsFavorite(
        favoriteWebtoonData?.some(
          (favoriteWebtoon: any) =>
            Number(favoriteWebtoon.webtoon_id) === Number(id)
        )
      );
  }, [favoriteWebtoonData]);

  return (
    <div>
      <div className="h-[10rem] max-lg:h-[6rem]">
        <Header />
      </div>

      <EpisodeList
        id={id!}
        cover={
          webtoonDetails?.image ? webtoonDetails?.image : "/placeholder.webp"
        }
        webtoonDetails={webtoonDetails}
        title={webtoonDetails?.name}
        genres={webtoonDetails?.genres}
        desc={webtoonDetails?.description}
        age={webtoonDetails?.age}
        episodeList={episodeDetailsList}
        episodeSort={episodeSort}
        setEpisodeSort={setEpisodeSort}
        episodePagination={episodePagination}
        setEpisodePagination={setEpisodePagination}
        episodeCount={webtoonDetails?.episodeCount}
        setFavorite={setFavoriteWebtoon}
        isFavorites={isFavorite}
        kind="webnovel"
      />
    </div>
  );
};
