import React from "react";
import { ColorRing } from "react-loader-spinner";

import styles from "./ContentLoader.module.scss";

const ContentLoader: React.FC = () => {
  return (
    <div className={styles.container}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default ContentLoader;
