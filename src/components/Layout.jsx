import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export const AppContext = createContext();

function Layout({}) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default Layout;