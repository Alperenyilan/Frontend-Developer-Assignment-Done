import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

interface SearchState {
  searchProducts: any[]; // Arama ürünleri veri yapısına uygun bir tür belirtin
  searchProductsStatus: string;
}

const initialState: SearchState = {
  searchProducts: [],
  searchProductsStatus: STATUS.IDLE,
};

export const fetchAsyncSearchProduct = createAsyncThunk(
  "product-search/fetch",
  async (searchTerm: string) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncSearchProduct.pending, (state) => {
        state.searchProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
        state.searchProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncSearchProduct.rejected, (state) => {
        state.searchProductsStatus = STATUS.FAILED;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export const getSearchProducts = (state) => state.search.searchProducts;
export const getSearchProductsStatus = (state) =>
  state.search.searchProductsStatus;

export default searchSlice.reducer;
