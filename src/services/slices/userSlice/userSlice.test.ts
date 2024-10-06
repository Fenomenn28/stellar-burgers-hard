import { error } from 'console';
import userSlice, {
  initialState,
  loginUser,
  getUser,
  registerUser,
  logoutUser,
  updateUser,
  getOrdersAll,
} from './userSlice';

describe('тестирование userSlice', () => {
  describe('тесты для асинхронного экшена loginUser', () => {
    const actions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'Alexx2', email: 'alexx@mail.ru' } }
      }
    };
    test('тестирует состояние при синхронном экшене loginUser.pending', () => {
      const newState = userSlice(initialState, actions.pending);
      expect(newState.loginUserError).toBe(null);
      expect(newState.loginUserRequest).toBe(true);
    });

    test('тестирует состояние после синхронного экшена loginUser.fulfilled', () => {
      const newState = userSlice(initialState, actions.fulfilled);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.data).toEqual(actions.fulfilled.payload.user);
      expect(newState.loginUserRequest).toBe(false);
    });

    test('тестирует состояние после синхронного экшена loginUser.rejected', () => {
      const newState = userSlice(initialState, actions.rejected);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.loginUserError).toBe(actions.rejected.error.message);
      expect(newState.loginUserRequest).toBe(false);
    });
  });
  describe('тесты для асинхронного экшена getUser', () => {
    const actions = {
      pending: {
        type: getUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'Alexx2', email: 'alexx@mail.ru' } }
      },
      rejected: {
        type: getUser.rejected.type,
        error: { message: 'error' }
      }
    };
    test('тестирует состояние при синхронном экшене getUser.pending', () => {
      const newState = userSlice(initialState, actions.pending);
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.isAuthenticated).toBe(true)
      expect(newState.loginUserRequest).toBe(true);
    });
    
    test('тестирует состояние после синхронного экшена getUser.fulfilled', () => {
      const newState = userSlice(initialState, actions.fulfilled);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.data).toEqual(actions.fulfilled.payload.user);
      expect(newState.loginUserRequest).toBe(false);
    });
    
    test('тестирует состояние после синхронного экшена getUser.rejected', () => {
      const newState = userSlice(initialState, actions.rejected);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.loginUserError).toBe(actions.rejected.error.message);
      expect(newState.loginUserRequest).toBe(false);
    });
  });

  describe('тесты для асинхронного экшена registerUser', () => {
    const actions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'Alexx2', email: 'alexx@mail.ru' } }
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'error' }
      }
    };
    test('тестирует состояние при синхронном экшене registerUser.pending', () => {
      const newState = userSlice(initialState, actions.pending);
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.loginUserError).toBe(null);
      expect(newState.loginUserRequest).toBe(true);
    });

    test('тестирует состояние после синхронного экшена registerUser.fulfilled', () => {
      const newState = userSlice(initialState, actions.fulfilled);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.loginUserError).toBe(null);
      expect(newState.data).toEqual(actions.fulfilled.payload.user);
      expect(newState.loginUserRequest).toBe(false);
    });

    test('тестирует состояние после синхронного экшена registerUser.rejected', () => {
      const newState = userSlice(initialState, actions.rejected);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.loginUserRequest).toBe(false);
      expect(newState.loginUserError).toBe(actions.rejected.error.message);
      expect(newState.loginUserRequest).toBe(false);
    });
  });

  describe('тесты для асинхронного экшена logoutUser', () => {
    const actions = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'error' }
      }
    };
    test('тестирует состояние при синхронном экшене logoutUser.pending', () => {
      const newState = userSlice(initialState, actions.pending);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.loginUserError).toBe(null);
      expect(newState.loginUserRequest).toBe(true);
    });

    test('тестирует состояние после синхронного экшена logoutUser.fulfilled', () => {
      const newState = userSlice(initialState, actions.fulfilled);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.data).toEqual(actions.fulfilled.payload);
      expect(newState.loginUserError).toBe(null);
      expect(newState.loginUserRequest).toBe(false);
    });

    test('тестирует состояние после синхронного экшена logoutUser.rejected', () => {
      const newState = userSlice(initialState, actions.rejected);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.loginUserError).toBe(actions.rejected.error.message);
      expect(newState.loginUserRequest).toBe(false);
    });
  });

  describe('тесты для асинхронного экшена updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'Alexx2', email: 'alexx@mail.ru' } }
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'error' }
      }
    };
    
    test('тестирует состояние при синхронном экшене updateUser.pending', () => {
      const newState = userSlice(initialState, actions.pending);
      expect(newState.loginUserError).toBe(actions.pending.payload);
      expect(newState.loginUserRequest).toBe(true);
    });

    test('тестирует состояние после синхронного экшена updateUser.fulfilled', () => {
      const newState = userSlice(initialState, actions.fulfilled);
      expect(newState.data).toEqual(actions.fulfilled.payload.user);
      expect(newState.loginUserRequest).toBe(false);
      expect(newState.loginUserError).toBe(null);
    });

    test('тестирует состояние после синхронного экшена updateUser.rejected', () => {
      const newState = userSlice(initialState, actions.rejected);
      expect(newState.loginUserError).toBe(actions.rejected.error.message);
      expect(newState.loginUserRequest).toBe(false);
    });
  });

  describe('тесты для асинхронного экшена getOrdersAll', () => {
    const actions = {
      pending: {
        type: getOrdersAll.pending.type,
        payload: null
      },
      fulfilled: {
        type: getOrdersAll.fulfilled.type,
        payload: ['order1', 'order2']
      },
      rejected: {
        type: getOrdersAll.rejected.type,
        error: { message: 'error' }
      }
    };
    test('тестирует состояние при синхронном экшене getOrdersAll.pending', () => {
      const newState = userSlice(initialState, actions.pending);
      expect(newState.loginUserError).toBe(null);
      expect(newState.loginUserRequest).toBe(true);
    });

    test('тестирует состояние после синхронного экшена getOrdersAll.fulfilled', () => {
      const newState = userSlice(initialState, actions.fulfilled);
      expect(newState.loginUserError).toBe(null);
      expect(newState.loginUserRequest).toBe(false);
      expect(newState.userOrders).toEqual(actions.fulfilled.payload);
    });

    test('тестирует состояние после синхронного экшена getOrdersAll.rejected', () => {
      const newState = userSlice(initialState, actions.rejected);
      expect(newState.loginUserError).toBe(actions.rejected.error.message);
      expect(newState.loginUserRequest).toBe(false);
    });
  });
});
