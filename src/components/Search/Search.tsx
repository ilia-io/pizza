import debounce from 'lodash.debounce';
import { useRef, useState, useCallback, useEffect } from 'react';
import styles from './Search.module.scss';
import { useAppDispatch} from '../../redux/store';
import { setCurrentPage, setSearchValue } from '../../redux/slices/filterSlice';
import qs from 'qs';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      if (params.searchValue) {
        setValue(params.searchValue as string);
      }
    }
  }, []);

  const memoizedDebounce = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
      dispatch(setCurrentPage(1));
    }, 300),
    []
  );

  const onClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    memoizedDebounce(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.search}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        onChange={(e) => onChangeInput(e)}
        value={value}
        ref={inputRef}
      />
      {value && (
        <svg
          onClick={() => onClear()}
          className={styles.close}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
