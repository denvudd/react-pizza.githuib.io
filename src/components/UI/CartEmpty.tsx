import React from "react";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/img/empty-cart.png";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пуста <span>😕</span>
        </h2>
        <p>
          Скоріш за все, ви не замовили солодощі.
          <br />
          Для того, щоб замовити товар, перейдіть на головну сторінку.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
