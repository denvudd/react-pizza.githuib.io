import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://6448008250c253374435bb85.mockapi.io/pizzas/${id}`)
  }, [id])

  return (
    <div className="container">
      <img src="" alt="" />
      <h2>{id}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, placeat!
      </p>
      <h4>250 ₴</h4>
    </div>
  );
};

export default SingleProduct;
