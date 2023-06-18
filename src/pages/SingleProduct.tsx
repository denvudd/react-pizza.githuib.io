import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cart/slice";
import { cartProductCountSelector } from "../redux/cart/selectors";

import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

import { ButtonAdd, SingleProductLoader } from "../components/UI";
import NotFound from "./NotFound";

import { categoriesList } from "../components/Categories";

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
  const cartProductCount = useSelector(cartProductCountSelector(id || ""));

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const typeNames = ["цукерки", "торти"];
  const addedCount = cartProductCount;
  const ratingStars = "★".repeat(product.rating);

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<IProduct>(
        `https://648ebfdb75a96b6644443b60.mockapi.io/sweets/${id}`
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
      <div className="single-loading">Загрузка, подождите пожалуйста...</div>
    );
  }

  return (
    <div className="container">
      <Helmet>
        <title>{`React Pizza: Пицца ${product.title}`}</title>
      </Helmet>
      {isLoading && !error ? (
        <SingleProductLoader />
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
                Категорія:{" "}
                <span>
                  {categoriesList[product.category] === "Всі"
                    ? "Всі солодощі"
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
                    {size} кг.
                  </li>
                ))}
              </ul>
            </div>
            <div className="product-single__ingredients">
              {product.ingredients}
            </div>
            <div className="product-single__bottom">
              <div className="product-single__price">від {product.price} ₴</div>
              <ButtonAdd
                onClickAdd={onClickAdd}
                addedCount={addedCount}
                buttonText="Додати в корзину"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
