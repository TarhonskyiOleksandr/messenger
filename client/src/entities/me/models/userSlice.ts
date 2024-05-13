/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

import { fetchMe } from './thunks';

const initialState: any = {
  loading: false,
  error: '',
  data: {},
};

export const userSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.rejected, (state, payload) => {
        state.error = payload;
      })
      .addCase(fetchMe.fulfilled, (state, payload) => {
        state.data = payload;
      })
  },
});

export default userSlice.reducer;
