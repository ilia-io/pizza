import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  let { id } = useParams<{ id: string }>();
  const [pizzaData, setPizzaData] = useState<{
    price: number;
    imageUrl: string;
    title: string;
    rating: number;
  }>();

  useEffect(() => {
    const getPizza = async function () {
      try {
        const { data } = await axios.get(
          `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas/${id}`
        );
        setPizzaData(data);
      } catch (error) {
        alert('Ошибка при загрузке пиццы');
        console.error(error);
        navigate('/');
      }
    };
    getPizza();
  }, [id]);

  if (!pizzaData) {
    return <>'Загрузка...'</>;
  }

  return (
    <div className="container">
      <div className="count-pizza">
        <Link to={Number(id) > 0 ? `/pizza/${Number(id) - 1}` : `/pizza/0`}>
          <img width={40} src="/img/arrow-left.png" alt="arrow left" />
        </Link>
        <h2>{Number(id) + 1}</h2>
        <Link to={Number(id) < 9 ? `/pizza/${Number(id) + 1}` : `/pizza/9`}>
          <img width={40} src="/img/arrow-right.png" alt="arrow right" />
        </Link>
      </div>
      <main className="main-pizza">
        <img width={330} src={pizzaData.imageUrl} alt="pizza" />
        <h2>{pizzaData.title}</h2>
        <p>
          Рейтинг: {pizzaData.rating} <br />
        </p>
        <p>Цена: от {pizzaData.price} ₽</p>
        <p>{/* Description */}</p>
      </main>
    </div>
  );
};

export default FullPizza;
