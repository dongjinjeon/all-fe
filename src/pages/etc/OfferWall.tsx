import { useSearchParams } from "react-router-dom";

export const OfferWall = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.dir(searchParams.toString());

  return <div>OK</div>;
};
