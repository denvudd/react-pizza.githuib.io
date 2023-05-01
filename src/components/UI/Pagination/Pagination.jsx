import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ changePage }) => {
  return (
    <div className={styles.container}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => changePage(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
