type TReqWebtoon = {
  page: number;
  count: number;
  language: "ko" | "id" | "es" | "en";
};

type TReqSearchWebtoon = {
  id?: string;
  page: number;
  limit: number;
  sort?: "updatedAt" | "total_views" | "createdAt";
  order: "desc" | "asc";
  genres?: string[]; // "Romance"  | "Drama" | "Action" | "Fantasy" | "BLGL" | "RomanceFantasy"| "Challenges"
  days?: string[];
  language: "ko" | "id" | "es" | "en";
  keyword?: string;
  status?: "1" | "2" | "3" | "-1";
};
