import React, { useState, useRef, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import { setSort } from "../redux/filters/slice";
import { SortPropertyEnum } from "../redux/filters/types";

interface ISortList {
  sortName: string;
  sortProperty: SortPropertyEnum;
}

type DropdownClickPath = MouseEvent & {
  path: Node[];
};

interface ISortProps {
  sort: ISortList;
}

export const sortList: ISortList[] = [
  { sortName: "популярности (+)", sortProperty: SortPropertyEnum.RATING_DESC },
  { sortName: "популярности (-)", sortProperty: SortPropertyEnum.RATING_ASC },
  { sortName: "цене (+)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { sortName: "цене (-)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { sortName: "алфавиту (+)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { sortName: "алфавиту (-)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

const Sort: React.FC<ISortProps> = memo(({ sort }) => {
  const dispatch = useDispatch();
  const { sortProperty, sortName }: ISortList = sort;
  const sortRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const onClickSort = (sortItem: ISortList) => {
    dispatch(setSort(sortItem));
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const _event = event as DropdownClickPath;

    // if click outside of dropdown
    if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
      setIsOpen(false);
    }
  };

  // close dropdown when click outside
  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortName}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sortItem, index) => (
              <li
                key={index}
                onClick={() => onClickSort(sortItem)}
                className={
                  sortProperty === sortItem.sortProperty ? "active" : ""
                }
              >
                {sortItem.sortName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
