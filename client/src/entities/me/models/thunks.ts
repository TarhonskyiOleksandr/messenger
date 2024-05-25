/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from "axios";
import { api } from '@/shared/api';

export const fetchMe = createAsyncThunk('me/get', async (_,{ rejectWithValue }) => {
  try {
    const res = await api.get('/user/me');
    return res.data?.user;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response?.statusText);
  }
});

export const updateMe = createAsyncThunk(
  'me/patch',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.patch('/user/me/update', data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error?.response?.statusText);
    }
  }
);
