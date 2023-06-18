import React from "react";

const NoProducts: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Солодощів не знайдено <span>😕</span>
      </h2>
    </div>
  );
};

export default NoProducts;
