import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cart/slice";
import { ICartItem } from "../redux/cart/types";
import { cartProductCountSelector } from "../redux/cart/selectors";

import { Link } from "react-router-dom";

import ButtonAdd from "./UI/ButtonAdd";

interface IPizzaItemProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
}

const PizzaItem: React.FC<IPizzaItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const dispatch = useDispatch();
  const cartProductCount = useSelector(cartProductCountSelector(id));

  const addedCount = cartProductCount;
  const typeNames = ["тонкое", "традиционное"];

  const onClickAdd = () => {
    const product: ICartItem = {
      id: id,
      title: title,
      price: price,
      imageUrl: imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0, // by default
    };

    dispatch(addProduct(product));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/product/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
            title={`Пицца ${title}`}
          />
        </Link>
        <Link to={`/product/${id}`}>
          <h4 className="pizza-block__title" title={`Пицца ${title}`}>
            {title}
          </h4>
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
