import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

function Pagination({ onPageChange, value }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={value - 1}
    />
  );
}

export default Pagination;
