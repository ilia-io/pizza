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

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onChangeCategory,
}) => {
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
};

export default Categories;
