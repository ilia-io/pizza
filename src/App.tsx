import './scss/app.scss';
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Loadable from 'react-loadable';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <h2>Идет загрузка корзины...</h2>,
});

const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<h2>Идет загрузка...</h2>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<h2>Идет загрузка...</h2>}>
              <FullPizza />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
