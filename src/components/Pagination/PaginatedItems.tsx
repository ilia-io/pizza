import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import Pizzas from '../Pizzas';
import { useAppSelector } from '../../redux/store';

type PaginatedItemsProps = {
  onPageChange: (page: number) => void;
  currentPage: number;
};

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  onPageChange,
  currentPage,
}) => {
  const { items } = useAppSelector((state) => state.pizza);

  const itemsPerPage = 4;
  const pageVisited = (currentPage - 1) * itemsPerPage;
  let currentItems = items.slice(pageVisited, pageVisited + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  //const pageCountProp = pageCount <= 1 ? 1 : pageCount;
  const forcePage = currentPage - 1;

  const changePage = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <>
      <Pizzas currentItems={currentItems} pageCount={pageCount} />
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        pageCount={pageCount}
        onPageChange={changePage}
        forcePage={forcePage}
        renderOnZeroPageCount={null}
        // pageRangeDisplayed={4}
      />
    </>
  );
};

export default PaginatedItems;
