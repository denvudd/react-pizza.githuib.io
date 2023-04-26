import { useState, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { setSearch } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

import closeIcon from "../../assets/img/close_icon.svg";
import searchIcon from "../../assets/img/search_icon.svg";

import styles from "./Search.module.scss";

const Search = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleClearClick = (e) => {
    e.preventDefault();
    dispatch(setSearch(""));
    inputRef.current.focus();
  };

  const updateSearchValue = useDebounce((value) => {
    dispatch(setSearch(value));
  }, 250);

  const onChangeSearch = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <img src={searchIcon} className={styles.searchIcon} alt="search" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        className={styles.input}
        onChange={(e) => onChangeSearch(e)}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          onMouseDown={handleClearClick}
          src={closeIcon}
          alt="clear"
          className={styles.clearIcon}
        />
      )}
    </div>
  );
};

export default Search;
