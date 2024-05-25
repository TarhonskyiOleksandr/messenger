/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchMe,
  updateMe
} from './thunks';

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
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchMe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(updateMe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload.data;
      })
  },
});

export default userSlice.reducer;
