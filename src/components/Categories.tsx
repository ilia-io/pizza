import { useWhyDidYouUpdate } from 'ahooks';
import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
    useWhyDidYouUpdate('Categories', { categoryId, onChangeCategory });
    return (
      <div className="categories">
        <ul>
          {categories.map((item, index) => (
            <li
              onClick={() => onChangeCategory(index)}
              className={categoryId === index ? 'active' : ''}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
