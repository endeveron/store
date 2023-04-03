import { CategoryItem, useGetCategoriesQuery } from 'features/product';

import './CategoryList.scss';

type CategoryListProps = {
  onChange: (id: string) => void;
};

const CategoryList = ({ onChange }: CategoryListProps) => {
  const { data } = useGetCategoriesQuery({});

  const handleItemClick = (categoryId: string) => {
    onChange(categoryId);
  };

  return (
    <section className="category-list">
      <div className="category-list__items">
        {data &&
          data.map((item) => (
            <CategoryItem
              itemData={item}
              onClick={handleItemClick}
              key={item._id}
            />
          ))}
      </div>
    </section>
  );
};

export { CategoryList };
