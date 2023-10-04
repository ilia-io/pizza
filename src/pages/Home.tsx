import { useEffect, useCallback, useRef } from 'react';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchPizza } from '../redux/asyncActions';
import { Categories, SortPopup } from '../components';
import { listExport } from '../components/SortPopup';
import PaginatedItems from '../components/Pagination/PaginatedItems';

const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef<boolean>(false);
  const { categoryId, sort, currentPage, orderSort, searchValue } =
    useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPizzas = useCallback(async () => {
    const category = Number(categoryId) > 0 ? `&category=${categoryId}` : ``;
    const sortBy = sort.sortBy;
    const order = orderSort ? `asc` : `desc`;
    const search = searchValue ? `title=${searchValue}` : ``;
    const searchString = searchValue || '';
    dispatch(
      fetchPizza({
        category,
        sortBy,
        order,
        searchString,
      })
    );
  }, [categoryId, sort, orderSort, searchValue]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortBy: sort.sortBy,
        orderSort,
        currentPage,
        searchValue,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, orderSort, currentPage, searchValue]);

  //Если был первый рендер, проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listExport.find((obj) => obj.sortBy === params.sortBy);
      const order = params.orderSort === 'false' ? false : true;

      dispatch(
        setFilters({
          searchValue: params.searchValue as string,
          categoryId: params.categoryId as string,
          currentPage: params.currentPage as unknown as number,
          sort: sort || listExport[0],
          orderSort: order,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, orderSort, searchValue]);

  const onChangeCategory = useCallback((id: string) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  }, []);

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <SortPopup sort={sort} orderSort={orderSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <PaginatedItems onPageChange={onPageChange} currentPage={currentPage} />
    </div>
  );
};

export default Home;
