/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

import { search } from './thunks';

const initialState: any = {
  loading: false,
  error: '',
  data: {},
};

export const userSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.data = {};
      state.loading = false;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.loading = true;
      })
      .addCase(search.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(search.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = '';
        state.data = payload;
      })
  },
});

export const { clearResults } = userSlice.actions;

export default userSlice.reducer;
