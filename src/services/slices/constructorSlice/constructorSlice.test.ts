import { initialState, initialState2, initialState3, filling } from './test_data';
import constructorSlice, {addIngredient, removeIngredient, handleMoveUp, handleMoveDown} from './constructorSlice';

describe('тестирование constructorSlice', () => {
  test('добавляет ингредиент', () => {
    const newState = constructorSlice(initialState, addIngredient(filling));
    const ingredient = newState.constructorItems.ingredients[0];
    expect(ingredient).toEqual({...filling, id: ingredient.id}); // Проверяем что добавленный ингредиент тот самый 
  });
  test('удаляет ингредиент', () => {
    const newState = constructorSlice(initialState2, removeIngredient('0'));
    const ingrediens = newState.constructorItems.ingredients;
    expect(ingrediens).toEqual([]); // Проверяем что в массиве ingrediens больше нет удаленного ингредиента 
  });
  test('перемещает ингредиент вверх', () => {
    const newState = constructorSlice(initialState3, handleMoveUp(2));
    const ingredient = newState.constructorItems.ingredients[1];
    expect(ingredient).toEqual({...filling, id: '2'}); // Проверяет что поднятый ингредиент тот самый 
  });
  test('перемещает ингредиент вниз', () => {
    const newState = constructorSlice(initialState3, handleMoveDown(2));
    const ingredient = newState.constructorItems.ingredients[3];
    expect(ingredient).toEqual({...filling, id: '2'}); 
  });
});