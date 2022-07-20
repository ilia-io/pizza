import './App.css';
import './scss/app.scss';
import Header from './components/Header';
//import pizzas from './assets/pizzas.json';
import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

export const AppContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
