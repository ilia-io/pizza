import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Loader from '../components/Loader';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';

function Home({ searchValue }) {
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
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const sortBy = sortType.sortBy;
    const order = orderSort ? `asc` : `desc`;
    const search = searchValue ? `search=${searchValue}` : ``;
    fetch(
      `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderSort, searchValue]);

  const pizzasMapped = pizzas
    .filter((e) => e.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock {...item} key={item.id} />);
  const loaderMapped = [...Array(10)].map((_, index) => <Loader key={index} />);

  //

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
        {isLoading ? loaderMapped : pizzasMapped}
      </div>
    </div>
  );
}

export default Home;
