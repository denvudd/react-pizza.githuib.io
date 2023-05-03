import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, cartProductByIdSelector } from "../redux/slices/cartSlice";

import { useParams } from "react-router-dom";
import axios from "axios";

import ButtonAdd from "../components/UI/ButtonAdd";
import { categoriesList } from "../components/Categories";
import NotFound from "./NotFound";

interface IProduct {
  id: string;
  imageUrl: string;
  title: string;
  ingredients: string;
  price: number;
  rating: number;
  category: number;
  count: number;
  sizes: number[];
  types: number[];
}

const SingleProduct: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>({
    id: id || "",
    imageUrl: "",
    title: "",
    ingredients: "",
    price: 0,
    rating: 0,
    category: 0,
    count: 0,
    sizes: [],
    types: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(false);

  const dispatch = useDispatch();
  const cartProduct = useSelector(cartProductByIdSelector(id || ""));

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const typeNames = ["тонкое", "традиционное"];
  const addedCount = cartProduct ? cartProduct.count : 0;
  const ratingStars = "★".repeat(product.rating);

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<IProduct>(
        `https://6448008250c253374435bb85.mockapi.io/pizzas/${id}`
      );
      setProduct(data);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const onClickAdd = () => {
    const productOnAdd = {
      id: id || "",
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      type: typeNames[activeType],
      size: product.sizes[activeSize],
      count: product.count,
    };

    dispatch(addProduct(productOnAdd));
  };

  if (!product) {
    return (
      <div className="single-loading">Загрузка, подождите пожалуйста... 🍕</div>
    );
  }

  return (
    <div className="container">
      {isLoading && !error ? (
        <div className="single-loading">
          Загрузка, подождите пожалуйста... 🍕
        </div>
      ) : error ? (
        <NotFound />
      ) : (
        <div className="product-single">
          <div className="product-single__photo">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="product-single__text">
            <h2 className="product-single__title">{product.title}</h2>
            <div className="product-single__information">
              <div className="product-single__rating">
                Рейтинг: <span>{ratingStars}</span> ({product.rating})
              </div>
              <div className="product-single__category">
                Категория:{" "}
                <span>
                  {categoriesList[product.category] === "Все"
                    ? "Все пиццы"
                    : categoriesList[product.category]}
                </span>
              </div>
            </div>
            <div className="product-single__selector">
              <ul>
                {product.types.map((typeId, i) => (
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
                {product.sizes.map((size, i) => (
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
            <div className="product-single__ingredients">
              {product.ingredients}
            </div>
            <div className="product-single__bottom">
              <div className="product-single__price">от {product.price} ₴</div>
              <ButtonAdd
                onClickAdd={onClickAdd}
                addedCount={addedCount}
                buttonText="Добавить в корзину"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
