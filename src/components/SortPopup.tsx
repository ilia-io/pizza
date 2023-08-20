import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort, setOrderSort } from '../redux/slices/filterSlice';
import { TSort } from '../@types/TSort';
import { SortPropEnum } from '../@types/SortPropEnum';

export const listExport: TSort[] = [
  { name: 'популярности', sortBy: SortPropEnum.RATING },
  { name: 'цене', sortBy: SortPropEnum.PRICE },
  { name: 'алфавиту', sortBy: SortPropEnum.TITLE },
];

type TSortPopup = {
  sort: TSort;
  orderSort: boolean;
};

const SortPopup: React.FC<TSortPopup> = React.memo(({ sort, orderSort }) => {
  const [sortPopup, setSortPopup] = useState(false);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  function handleSort(obj: TSort) {
    dispatch(setSort(obj));
    setSortPopup(false);
  }

  useEffect(() => {
    const handleClickOutOfSort = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      const path = _event.path || event.composedPath();
      if (sortRef.current && !path.includes(sortRef.current)) {
        setSortPopup(false);
      }
    };

    document.body.addEventListener('click', handleClickOutOfSort);

    return () =>
      document.body.removeEventListener('click', handleClickOutOfSort);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={() => dispatch(setOrderSort(!orderSort))}
          className={orderSort ? '' : 'active'}
          width="20"
          height="20"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#fe5f1e"
          />
        </svg>
        <b>Сортировка по:</b>
        <p>
          <span onClick={() => setSortPopup(!sortPopup)}>{sort.name}</span>
        </p>
      </div>
      {sortPopup && (
        <div className="sort__popup">
          <ul>
            {listExport.map((item, index) => (
              <li
                onClick={() => handleSort(item)}
                className={item.sortBy === sort.sortBy ? 'active' : ''}
                key={index}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
