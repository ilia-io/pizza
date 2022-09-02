import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  onPageChange: any;
  value: number;
};

const Pagination: React.FC<PaginationProps> = ({ onPageChange, value }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={undefined}
      forcePage={value - 1}
    />
  );
};

export default Pagination;
