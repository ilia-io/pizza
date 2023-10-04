import React from 'react';
import { TPizza } from '../@types/TPizza';
import { useAppSelector } from '../redux/store';
import PizzaBlock from './PizzaBlock';
import Loader from './Loader';

type PizzasProps = {
  currentItems: TPizza[];
  pageCount: number;
};

const Pizzas: React.FC<PizzasProps> = ({ currentItems, pageCount }) => {
  const { status } = useAppSelector((state) => state.pizza);

  const onClickReloadPage = () => {
    window.location.reload();
  };

  const pizzasMapped = currentItems.map((item: TPizza) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const loaderMapped = [...Array(4)].map((_, index) => <Loader key={index} />);

  const errorMessage = (
    <>
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
    </>
  );
  const notFoundMessage = (
    <>
      <div className="error--info">
        <h2>Пиццы не найдены 😕</h2>
      </div>
    </>
  );

  return (
    <>
      {status === 'success' && pageCount < 1 && notFoundMessage}
      {status === 'error' ? (
        errorMessage
      ) : (
        <div className="content__items">
          {status === 'loading' ? loaderMapped : pizzasMapped}
        </div>
      )}
    </>
  );
};

export default Pizzas;
