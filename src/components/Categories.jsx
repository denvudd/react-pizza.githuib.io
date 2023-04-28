export const categoriesList = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = ({ categoryId, changeCategory }) => {
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
};

export default Categories;
