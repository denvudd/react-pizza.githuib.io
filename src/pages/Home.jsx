import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSelector,
  setCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { useNavigate } from "react-router-dom";
import qs from "qs";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaItem from "../components/PizzaItem";
import Pagination from "../components/Pagination/Pagination";
import Skeleton from "../components/UI/Skeleton";
import NoProducts from "../components/UI/NoProducts";

import { sortList } from "../components/Sort";
import { categoriesList } from "../components/Categories";
import { fetchProducts, productsSelector } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector(productsSelector);
  const { categoryId, sort, currentPage, searchQuery } =
    useSelector(filterSelector);

  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getProducts = async () => {
    const categoryQueryParam = categoryId > 0 ? `${categoryId}` : null;
    const sortQueryParam = `${sort.sortProperty.replace("-", "")}`;
    const orderQueryParam = `${
      sort.sortProperty.includes("-") ? "asc" : "desc"
    }`;
    const searchQueryParam = searchQuery ? `${searchQuery}` : null;

    dispatch(
      fetchProducts({
        categoryQueryParam,
        sortQueryParam,
        orderQueryParam,
        searchQueryParam,
        currentPage,
      })
    );
  };

  // fetch when the filters change
  useEffect(() => {
    if (!isSearch.current) {
      getProducts();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchQuery, currentPage]);

  // if first render, then check the URL parameters and dispatch them in the store
  useEffect(() => {
    // check if there are parameters in the URL
    if (window.location.search) {
      // parse the parameters from the URL and extract the sort parameter
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // update URL with current filter parameters
  useEffect(() => {
    // if it's NOT first rended
    if (isMounted.current) {
      // construct a query string based on the current filter parameters
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId: categoryId,
        currentPage: currentPage,
        search: searchQuery,
      });

      // update url
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, searchQuery, currentPage]);

  const changeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const changePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const content = products
    .filter((product) => {
      if (product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((product) => <PizzaItem key={product.id} {...product} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          changeCategory={(id) => changeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">
        {categoriesList[categoryId] === "Все"
          ? "Все пиццы"
          : categoriesList[categoryId]}
      </h2>
      {status === "failure" ? (
        <NoProducts />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : content}
        </div>
      )}
      {products.length === 0 && <NoProducts />}
      <Pagination changePage={changePage} />
    </div>
  );
};

export default Home;
