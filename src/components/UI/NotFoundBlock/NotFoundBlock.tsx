import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница не найдена
      </p>
      <div className={styles.buttonWrapper}>
        <Link to="/" className="button button--outline">
          Вернуться на главную страницу
        </Link>
      </div>
    </div>
  );
};

export default NotFoundBlock;
