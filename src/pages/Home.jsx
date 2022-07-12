import { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Home({}) {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(AppContext);
  const { categoryId, sort, currentPage, orderSort } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPizzas = function () {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const sortBy = sort.sortBy;
    const order = orderSort ? `asc` : `desc`;
    const search = searchValue ? `search=${searchValue}` : ``;

    axios
      .get(
        `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
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
    //if (isSearch.current) {
    //}
    fetchPizzas();

    isSearch.current = false;
  }, [categoryId, sort, orderSort, searchValue, currentPage]);

  const pizzasMapped = pizzas.map((item) => (
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
      <div className="content__items">
        {isLoading ? loaderMapped : pizzasMapped}
      </div>
      <Pagination
        value={currentPage}
        onPageChange={(number) => onChangePage(number)}
      />
    </div>
  );
}

export default Home;
