import React from 'react';

type CategoriesProps = {
  categoryId: string;
  onChangeCategory: (i: string) => void;
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
    return (
      <div className="categories">
        <ul>
          {categories.map((item, index) => (
            <li
              onClick={() => onChangeCategory(String(index))}
              className={Number(categoryId) === index ? 'active' : ''}
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
