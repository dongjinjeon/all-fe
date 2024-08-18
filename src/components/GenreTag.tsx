import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const GenreTag = ({
  tag,
  className,
  fontSize,
}: {
  tag: string;
  className?: string;
  fontSize?: string;
}) => {
  const [color, setColor] = useState<string>("");
  const { t } = useTranslation();
  useEffect(() => {
    if (tag.toUpperCase() === "ROMANCE")
      setColor("text-alco-genre-romance border-alco-genre-romance");
    else if (tag.toUpperCase() === "DRAMA")
      setColor("text-alco-genre-drama border-alco-genre-drama");
    else if (tag.toUpperCase() === "ACTION")
      setColor("text-alco-genre-action border-alco-genre-action");
    else if (tag.toUpperCase() === "FANTASY")
      setColor("text-alco-genre-fantasy border-alco-genre-fantasy");
    else if (tag.toUpperCase() === "BLGL")
      setColor("text-alco-genre-bl border-alco-genre-bl");
    else if (tag.toUpperCase() === "ROMANCEFANTASY")
      setColor(
        "text-alco-genre-romancefantasy border-alco-genre-romancefantasy"
      );
  }, [tag]);

  return (
    <span
      className={`whitespace-nowrap px-2 rounded-full ${color} ${className!}`}
      style={{
        fontSize: `${fontSize ? fontSize : "0.75rem"}`,
        border: "1px solid",
        fontFamily: "Noto Sans KR",
      }}
    >
      # {t(`common.genre.${tag.toLowerCase()}`)}
    </span>
  );
};
