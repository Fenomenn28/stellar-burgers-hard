import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../../utils/burger-api';
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';

export type TConstructorState = {
  loading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

export const initialState: TConstructorState = {
  loading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'constructor/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  selectors: {
    getConstructorState: (state) => state
  },
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const id = nanoid();
      const ingredient = { ...action.payload, id };
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload
        );
    },
    setRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    resetModal: (state) => {
      state.orderModalData = null;
    },
    handleMoveUp: (state, action: PayloadAction<number>) => {
      const ingredients = state.constructorItems.ingredients;
      const index = action.payload;
      [ingredients[index - 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index - 1]
      ];
    },
    handleMoveDown: (state, action: PayloadAction<number>) => {
      const ingredients = state.constructorItems.ingredients;
      const index = action.payload;
      [ingredients[index + 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index + 1]
      ];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetModal,
  setRequest,
  handleMoveUp,
  handleMoveDown
} = constructorSlice.actions;
export const { getConstructorState } = constructorSlice.selectors;

export default constructorSlice.reducer;
