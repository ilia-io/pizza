import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function FullPizza({}) {
  let { id } = useParams();
  const [pizzaData, setPizzaData] = useState({});
  const { price, imageUrl, title, rating } = pizzaData;
  useEffect(() => {
    const getPizza = async function () {
      try {
        const { data } = await axios.get(
          `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas/${id}`
        );
        setPizzaData(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        console.error(error);
      }
    };
    getPizza();
  }, [id]);

  if (!pizzaData) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <div className="count-pizza">
        <Link to={id > 0 ? `/pizza/${+id - 1}` : `/pizza/0`}>
          <img width={40} src="/img/arrow-left.png" alt="arrow left" />
        </Link>
        <h2>{+id + 1}</h2>
        <Link to={id < 9 ? `/pizza/${+id + 1}` : `/pizza/9`}>
          <img width={40} src="/img/arrow-right.png" alt="arrow right" />
        </Link>
      </div>
      <main className="main-pizza">
        <img width={330} src={imageUrl} alt="pizza" />
        <h2>{title}</h2>
        <p>
          Рейтинг: {rating} <br />
        </p>
        <p>Цена: от {price} ₽</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
          veritatis ad placeat officia consectetur quos cupiditate, aperiam
          quod. Itaque voluptas velit numquam laborum dignissimos dolores
          provident aperiam atque, illum mollitia.
        </p>
      </main>
    </div>
  );
}

export default FullPizza;
