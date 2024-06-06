/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { api } from "@/shared/api";

export const search = createAsyncThunk(
  'search/query',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post('/users/search', data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error?.response);
    }
  },
);
