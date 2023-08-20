import { TCartItem } from '../@types/TCartItem';

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
