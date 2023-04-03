import { Category } from 'features/product';

import './CategoryItem.scss';

type CategoryItemProps = {
  itemData: Category;
  onClick: (itemData: string) => void;
};

const CategoryItem = ({ itemData, onClick }: CategoryItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick(itemData._id);
  };

  return (
    <div className="category-item" onClick={handleClick}>
      {itemData.title}
    </div>
  );
};

export { CategoryItem };
