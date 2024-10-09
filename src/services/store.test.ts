import store, { rootReducer } from '../services/store';

test('проверка работы rootReducer', () => {
  const expected = rootReducer(undefined, { type: 'undefined' });
  expect(expected).toEqual(store.getState());
});