import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cart/slice";
import { ICartItem } from "../redux/cart/types";
import { cartProductCountSelector } from "../redux/cart/selectors";

import { Link } from "react-router-dom";

import { ButtonAdd } from "./UI";

interface ICandyItemProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
}

const CandyItem: React.FC<ICandyItemProps> = ({
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
  const typeNames = ["цукерки", "торти"];

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
    <div className="candy-block-wrapper">
      <div className="candy-block">
        <Link to={`/product/${id}`}>
          <div className="candy-block_imageWrapper">
            <img
              className="candy-block__image"
              src={imageUrl}
              alt="Candy"
              title={`Пицца ${title}`}
            />
          </div>
        </Link>
        <Link to={`/product/${id}`}>
          <h4 className="candy-block__title" title={`Пицца ${title}`}>
            {title}
          </h4>
        </Link>
        <div className="candy-block__selector">
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
                {size} кг.
              </li>
            ))}
          </ul>
        </div>
        <div className="candy-block__bottom">
          <div className="candy-block__price">від {price} ₴</div>
          <ButtonAdd
            onClickAdd={onClickAdd}
            addedCount={addedCount}
            buttonText={"Додати"}
          />
        </div>
      </div>
    </div>
  );
};

export default CandyItem;
