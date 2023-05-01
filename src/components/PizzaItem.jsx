import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, cartProductByIdSelector } from "../redux/slices/cartSlice";

import { Link } from "react-router-dom";

import ButtonAdd from "./UI/ButtonAdd";

const PizzaItem = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();
  const cartProduct = useSelector(cartProductByIdSelector(id));

  const addedCount = cartProduct ? cartProduct.count : 0;
  const typeNames = ["тонкое", "традиционное"];

  const onClickAdd = () => {
    const product = {
      id: id,
      title: title,
      price: price,
      imageUrl: imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };

    dispatch(addProduct(product));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/product/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <Link to={`/product/${id}`}>
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, i) => (
              <li
                key={i}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₴</div>
          <ButtonAdd
            onClickAdd={onClickAdd}
            addedCount={addedCount}
            buttonText={"Добавить"}
          />
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
