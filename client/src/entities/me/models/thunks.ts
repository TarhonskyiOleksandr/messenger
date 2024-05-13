import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from "axios";
import { api } from '@/shared/api';

export const fetchMe = createAsyncThunk('me/get', async (_,{ rejectWithValue }) => {
  try {
    const res = await api.get('/user/me');
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response?.statusText);
  }
});
