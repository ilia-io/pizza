import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import axios from 'axios';

function Home({}) {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderSort, setOrderSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(AppContext);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const sortBy = sort.sortBy;
    const order = orderSort ? `asc` : `desc`;
    const search = searchValue ? `search=${searchValue}` : ``;

    axios
      .get(
        `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, orderSort, searchValue, currentPage]);

  const pizzasMapped = pizzas
    .filter((e) => e.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock {...item} key={item.id} />);
  const loaderMapped = [...Array(4)].map((_, index) => <Loader key={index} />);

  //

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort orderSort={orderSort} setOrderSort={(i) => setOrderSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? loaderMapped : pizzasMapped}
      </div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
