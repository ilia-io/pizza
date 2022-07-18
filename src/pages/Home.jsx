import { useContext, useEffect } from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { listExport } from '../components/Sort';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { fetchPizza } from '../redux/slices/pizzaSlice';

function Home({}) {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(AppContext);
  const { categoryId, sort, currentPage, orderSort } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = async function () {
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
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listExport.find((obj) => obj.sortBy === params.sortBy);
      dispatch(
        setFilters({
          ...params,
          sort,
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

  const pizzasMapped = items.map((item) => (
    <PizzaBlock {...item} key={item.id} />
  ));
  const loaderMapped = [...Array(4)].map((_, index) => <Loader key={index} />);

  //.filter((e) => e.title.toLowerCase().includes(searchValue.toLowerCase()))

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div class="error--info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            К сожалению не удалось получить пиццы. <br />
            Попробуйте повторить попытку позже.
          </p>
          <a class="button button--black">
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
}

export default Home;
