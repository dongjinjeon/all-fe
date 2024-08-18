export const WebtoonPlaceholder = () => {
  return (
    <div className="h-full p-2" style={{ minWidth: "20%" }}>
      <img
        className="rounded-xl w-full"
        src="/placeholder.webp"
        style={{ borderRadius: "20px" }}
      />
      <div className="text-center mt-1 text-sm">{}</div>
    </div>
  );
};

export const MainRankingPlaceholder = () => {
  return (
    <div className="flex w-full p-3">
      <div className="w-1/2 relative">
        <img
          className="w-full rounded-xl"
          style={{ background: "#d3d3d3" }}
          src="/placeholder.webp"
        />
      </div>
      <div className="w-1/2 p-4 flex justify-center flex-col">
        <h3 className="text-sm font-bold mb-2 text-left truncate">{}</h3>
        <div className="flex items-center"></div>
      </div>
    </div>
  );
};
