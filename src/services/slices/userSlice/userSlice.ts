import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { TOrder, TUser } from '@utils-types';
import {
  TLoginData,
  loginUserApi,
  getUserApi,
  registerUserApi,
  TRegisterData,
  logoutApi,
  updateUserApi,
  getOrdersApi
} from '../../../utils/burger-api';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
  userOrders: TOrder[];
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
  userOrders: []
};

export const loginUser = createAsyncThunk(
  'user',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const registerUser = createAsyncThunk(
  'user/regUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const getOrdersAll = createAsyncThunk('user/ordersUser', getOrdersApi);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetError: (state) => {
      state.loginUserError = null;
    }
  },
  selectors: {
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError = action.error.message as string;
        state.loginUserRequest = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload.user;
        state.loginUserError = null;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError = action.error.message as string;
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.data = null;
        state.loginUserError = null;
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.loginUserError = action.error.message as string;
        state.loginUserRequest = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError = action.error.message as string;
        state.loginUserRequest = false;
      })
      .addCase(getOrdersAll.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.loginUserError = null;
        state.loginUserRequest = false;
        state.userOrders = action.payload;
      })
      .addCase(getOrdersAll.rejected, (state, action) => {
        state.loginUserError = action.error.message as string;
        state.loginUserRequest = false;
      });
  }
});

export const { getUserState } = userSlice.selectors;
export const { resetError } = userSlice.actions;

export default userSlice.reducer;
