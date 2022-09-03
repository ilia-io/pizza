import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

type SearchContext = {
  searchValue: any;
  setSearchValue: any;
};

export const AppContext = createContext({} as SearchContext);

const Layout: React.FC = () => {
  const [searchValue, setSearchValue] = useState();

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
};

export default Layout;
