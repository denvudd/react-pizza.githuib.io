import React from "react";
import { useEffect, useRef, useCallback } from "react";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
  setCategory,
  setCurrentPage,
  setFilters,
} from "../redux/filters/slice";
import { filterSelector } from "../redux/filters/selectors";
import { fetchProducts } from "../redux/products/asyncActions";
import { IFetchProductsParams } from "../redux/products/types";
import { productsSelector } from "../redux/products/selectors";

import { useNavigate } from "react-router-dom";
import qs from "qs";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaItem from "../components/PizzaItem";
import Pagination from "../components/UI/Pagination/Pagination";
import Skeleton from "../components/UI/Skeleton";
import NoProducts from "../components/UI/NoProducts";

import { sortList } from "../components/Sort";
import { categoriesList } from "../components/Categories";
import { Helmet } from "react-helmet";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useSelector(productsSelector);
  const { category, sort, page, search } = useSelector(filterSelector);

  const navigate = useNavigate();
  const isMounted = useRef(false);

  const getProducts = async () => {
    const categoryParam = category > 0 ? `${category}` : null;
    const sortByParam = `${sort.sortProperty.replace("-", "")}`;
    const orderParam = `${sort.sortProperty.includes("-") ? "asc" : "desc"}`;
    const searchParam = search ? `${search}` : "";

    dispatch(
      fetchProducts({
        category: categoryParam,
        sortBy: sortByParam,
        order: orderParam,
        search: searchParam,
        page: page.toString(),
      })
    );
  };

  // fetch when the filters change
  useEffect(() => {
    getProducts();

    window.scrollTo(0, 0);
  }, [category, sort, search, page]);

  // if first render, then check the URL parameters and dispatch them in the store
  useEffect(() => {
    // check if there are parameters in the URL
    if (window.location.search) {
      // parse the parameters from the URL and extract the sort parameter
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as IFetchProductsParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          search: params.search,
          category: Number(params.category),
          page: Number(params.page),
          sort: sort || sortList[0],
        })
      );
    }
  }, []);

  // update URL with current filter parameters
  useEffect(() => {
    // if it's NOT first rended
    if (isMounted.current) {
      // construct a query string based on the current filter parameters
      const queryString = qs.stringify({
        sortBy: sort.sortProperty,
        category: category > 0 ? category : null,
        page: page,
        search: search,
      });

      // update url
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [category, sort, search, page]);

  const changeCategory = useCallback((id: number) => {
    dispatch(setCategory(id));
  }, []);

  const changePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const content = products
    .filter((product: any) => {
      if (product.title.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((product: any) => <PizzaItem key={product.id} {...product} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <Helmet>
        <title>{`React Pizza: ${
          categoriesList[category] === "Все"
            ? "Все пиццы"
            : categoriesList[category]
        }`}</title>
      </Helmet>
      <div className="content__top">
        <Categories categoryId={category} changeCategory={changeCategory} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">
        {categoriesList[category] === "Все"
          ? "Все пиццы"
          : categoriesList[category]}
      </h2>
      {status === "failure" ? (
        <NoProducts />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : content}
        </div>
      )}
      {products.length === 0 && <NoProducts />}
      <Pagination changePage={changePage} page={page} />
    </div>
  );
};

export default Home;
