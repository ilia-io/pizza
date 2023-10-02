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
import {
  Loader,
  PizzaBlock,
  Categories,
  SortPopup,
  Pagination,
} from '../components';
import { TPizza } from '../@types/TPizza';
import { listExport } from '../components/SortPopup';

const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef<boolean>(false);
  const { categoryId, sort, currentPage, orderSort, searchValue } =
    useAppSelector((state) => state.filter);
  const { items, status } = useAppSelector((state) => state.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
    const category = Number(categoryId) > 0 ? `category=${categoryId}` : ``;
    const sortBy = sort.sortBy;
    const order = orderSort ? `asc` : `desc`;
    const search = searchValue ? `title=${searchValue}` : ``;
    dispatch(
      fetchPizza({
        category,
        sortBy,
        order,
        search,
        currentPage,
      })
    );
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortBy,
        categoryId,
        currentPage,
        orderSort,
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
  }, [categoryId, sort, orderSort, searchValue, currentPage]);

  const onChangeCategory = useCallback((id: string) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onClickReloadPage = () => {
    window.location.reload();
  };

  const pizzasMapped = items
    .filter((pizza) =>
      pizza.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item: TPizza) => <PizzaBlock key={item.id} {...item} />);

  // .filter((pizza) =>pizza.title.toLowerCase().includes(searchValue.toLowerCase()))

  const loaderMapped = [...Array(4)].map((_, index) => <Loader key={index} />);

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
      {status === 'error' ? (
        <div className="error--info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению не удалось получить пиццы. <br />
            Попробуйте повторить попытку позже.
          </p>
          <a className="button button--black">
            <span onClick={onClickReloadPage}>Обновить</span>
          </a>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? loaderMapped : pizzasMapped}
        </div>
      )}

      <Pagination value={currentPage} onPageChange={onChangePage} />
    </div>
  );
};

export default Home;
