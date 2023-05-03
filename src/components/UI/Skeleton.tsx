import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="pizza-block"
    >
      <rect x="0" y="280" rx="5" ry="5" width="280" height="27" />
      <rect x="0" y="318" rx="10" ry="10" width="277" height="88" />
      <rect x="0" y="421" rx="5" ry="5" width="90" height="27" />
      <rect x="122" y="413" rx="30" ry="30" width="152" height="45" />
      <circle cx="130" cy="130" r="130" />
    </ContentLoader>
  );
};

export default Skeleton;
