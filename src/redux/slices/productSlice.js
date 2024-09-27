// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (page = 1) => {
  const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
  const data = await response.json();
  return { products: data.products, total: data.total };
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    currentPage: 1,
    totalProducts: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
