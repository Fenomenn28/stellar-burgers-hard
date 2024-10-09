import feedSlice, { getFeeds, initialState } from './feedSlice';

describe('тестирование feedSlice', () => {
  const actions = {
    pending: {
      type: getFeeds.pending.type,
      payload: null
    },
    fulfilled: {
      type: getFeeds.fulfilled.type,
      payload: { orders: ['order1', 'order2'], total: 222, totalToday: 333 }
    },
    rejected: {
      type: getFeeds.rejected.type,
      error: { message: 'error' }
    }
  };
  test('тестирует состояние при getFeeds.pending', () => {
    const newState = feedSlice(initialState, actions.pending);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('тестирует состояние полсе getFeeds.fulfilled', () => {
    const newState = feedSlice(initialState, actions.fulfilled);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.orders).toEqual(actions.fulfilled.payload.orders);
    expect(newState.total).toBe(222);
    expect(newState.totalToday).toBe(333);
  });

  test('тестирует состояние полсе getFeeds.rejected', () => {
    const newState = feedSlice(initialState, actions.rejected);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(actions.rejected.error.message);
  });
});