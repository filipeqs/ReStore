import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Product } from '../../app/models/products';
import agent from '../../app/api/agent';
import { RootState } from '../../app/store/configureStore';

const productAdapter = createEntityAdapter<Product>();

export const fetchProductAsync = createAsyncThunk<Product[]>(
  'catalog/fetchProductAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProducAsync = createAsyncThunk<Product, number>(
  'catalog/fetchProducAsync',
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productAdapter.getInitialState({
    productLoaded: false,
    status: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = 'pendingFetchProducts';
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.productLoaded = true;
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
    builder.addCase(fetchProducAsync.pending, (state) => {
      state.status = 'pendingFetchProduct';
    });
    builder.addCase(fetchProducAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchProducAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalog
);
