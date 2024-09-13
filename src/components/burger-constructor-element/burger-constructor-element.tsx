import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { removeIngredient } from '../../services/slices/constructorSlice/constructorSlice';
import { useDispatch } from '../../services/store';
import {
  handleMoveUp as handelMoveUpAction,
  handleMoveDown as handleMoveDownAction
} from '../../services/slices/constructorSlice/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(handleMoveDownAction(index));
    };

    const handleMoveUp = () => {
      dispatch(handelMoveUpAction(index));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
