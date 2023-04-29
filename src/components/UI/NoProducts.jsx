import React from "react";

const NoProducts = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Пиццы не найдены <span>😕</span>
      </h2>
      <p>
        Вероятней всего, пицц по таким запросам не существует или мы просто не
        смогли найти их.
        <br/>
        Повторите попытку позже или измените фильтры пицц.
      </p>
    </div>
  );
};

export default NoProducts;
