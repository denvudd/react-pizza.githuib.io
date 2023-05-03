import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

interface IPaginationProps {
  page: number;
  changePage: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ changePage, page }) => {
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
        forcePage={page - 1}
      />
    </div>
  );
};

export default Pagination;
