import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetching } from "../hooks/useFetching";
import {
  setCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { useNavigate } from "react-router-dom";
import qs from "qs";
import axios from "axios";

import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaItem from "../components/PizzaItem";
import Skeleton from "../components/UI/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { sortList } from "../components/Sort";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sort = useSelector((state) => state.filterSlice.sort);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const searchValue = useSelector((state) => state.filterSlice.searchQuery);

  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = () => {
    const categoryQueryParam = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortQueryParam = `&sortBy=${sort.sortProperty.replace(
      "-",
      ""
    )}&order=${sort.sortProperty.includes("-") ? "asc" : "desc"}`;
    const searchQueryParam = searchValue ? `&search=${searchValue}` : "";
    const apiUrl = `https://6448008250c253374435bb85.mockapi.io/pizzas?page=${currentPage}&limit=8${categoryQueryParam}${sortQueryParam}${searchQueryParam}`;

    setIsLoading(true);
    axios.get(apiUrl).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
  };

  // fetch when the filters change
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

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
        search: searchValue,
      });

      // update url
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  const changeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const changePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const content = pizzas
    .filter((pizza) => {
      if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((pizza) => (
      <PizzaItem
        title={pizza.title}
        price={pizza.price}
        imageUrl={pizza.imageUrl}
        sizes={pizza.sizes}
        types={pizza.types}
        key={pizza.id}
      />
    ));
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
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : content}</div>
      <Pagination changePage={changePage} />
    </div>
  );
};

export default Home;
