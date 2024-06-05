/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from "axios";
import { api } from '@/shared/api';

export const login = createAsyncThunk(
  'me/login',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post('/user/login', data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error?.response);
    }
  },
);

export const logout = createAsyncThunk('me/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/user/logout');
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response);
  }
});

export const fetchMe = createAsyncThunk('me/get', async (_, { rejectWithValue }) =>
  {
    try {
      const res = await api.get('/user/me');
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error?.response);
    }
  },
  {
    condition: (_, { getState }) => {
      const { me }: any = getState();
      if (Object.keys(me.data).length) return false;
    },
  }
);

export const updateMe = createAsyncThunk(
  'me/patch',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.patch('/user/me/update', data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error?.response);
    }
  }
);
