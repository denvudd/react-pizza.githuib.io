import React, {memo} from "react";
import useWhyDidYouUpdate  from "ahooks/lib/useWhyDidYouUpdate";

interface ICategoriesProps {
  categoryId: number;
  changeCategory: (index: number) => void;
}

export const categoriesList: string[] = [
  "Всі",
  "Шоколад",
  "Карамель",
  "Сиропи",
  "Білий шоколад",
  "Цукерки",
];

const Categories: React.FC<ICategoriesProps> = memo(({ categoryId, changeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoriesList.map((category, index) => (
          <li
            key={index}
            onClick={() => changeCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
