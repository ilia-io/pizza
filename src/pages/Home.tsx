import { useContext, useEffect, useCallback } from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';
import SortPopup from '../components/SortPopup';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { AppContext } from '../components/Layout';
import { useAppDispatch } from '../redux/store';
import { fetchPizza } from '../redux/asyncActions';

const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef<boolean>(false);
  const { searchValue } = useContext(AppContext);
  const { categoryId, sort, currentPage, orderSort } = useSelector(
    (state: any) => state.filter
  );
  const { items, status } = useSelector((state: any) => state.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
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

  //Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortBy,
        categoryId,
        currentPage,
        orderSort,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, orderSort, currentPage]);
  //, searchValue

  //Если был первый рендер, проверяем URL-параметры и сохраняем в редаксе
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sort = listExport.find((obj) => obj.sortBy === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: params.currentPage,
  //         sort: sort || listExport[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, orderSort, searchValue, currentPage]);

  const pizzasMapped = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const loaderMapped = [...Array(4)].map((_, index) => <Loader key={index} />);

  //.filter((e) => e.title.toLowerCase().includes(searchValue.toLowerCase()))

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const onClickReloadPage = () => {
    window.location.reload();
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
