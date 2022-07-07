import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';

function Home(props) {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortBy: 'rating',
  });
  const [orderSort, setOrderSort] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas?${
        categoryId > 0 ? `category=${categoryId}` : ``
      }&sortBy=${sortType.sortBy}&order=${orderSort ? `asc` : `desc`}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderSort]);

  console.log(orderSort);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort
          sortType={sortType}
          onChangeSort={(index) => setSortType(index)}
          orderSort={orderSort}
          setOrderSort={(i) => setOrderSort(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(10)].map((_, index) => <Loader key={index} />)
          : pizzas.map((item) => <PizzaBlock {...item} key={item.id} />)}
      </div>
    </div>
  );
}

export default Home;
