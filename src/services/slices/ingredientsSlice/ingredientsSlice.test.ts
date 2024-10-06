import ingredientSlice, {getIngredients, initialState} from './ingredientsSlice';

describe('тестирование ingredientSlice', () => {
  const actions = {  
    pending: {
      type: getIngredients.pending.type,
      payload: null
    },
    fulfilled: {
      type: getIngredients.fulfilled.type,
      payload: ['filling 1', 'filling 2']
    },
    rejected: {
      type: getIngredients.rejected.type,
      error: { message: 'error' }
    }
  };

  test('тестирует состояние при синхронном экшене getIngredients.pending', () => {
    const newState = ingredientSlice(initialState, actions.pending);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('тестирует состояние после синхронного экшена getIngredients.fulfilled', () => {
    const newState = ingredientSlice(initialState, actions.fulfilled);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.ingredients).toEqual(actions.fulfilled.payload);
  });

  test('тестирует состояние после синхронного экшена getIngredients.rejected', () => {
    const newState = ingredientSlice(initialState, actions.rejected);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(actions.rejected.error.message);
  });
});