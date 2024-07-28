/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from "axios";
import { api } from '@/shared/api';

interface ISendMessagePayload {
  receiverId: string;
  message: string;
}

export const sendMessage = createAsyncThunk(
  'conversations/send-message',
  async ({ receiverId, message }: ISendMessagePayload, { rejectWithValue }) => {
  try {
    const res = await api.post(`/messages/send/${receiverId}`, { message });
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response?.statusText);
  }
});

export const getAllConversations = createAsyncThunk(
  'conversations/all',
  async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/conversations/all');
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response?.statusText);
  }
});

export const getConversation = createAsyncThunk(
  'conversations/get',
  async (id: string, { rejectWithValue } ) => {
  try {
    const res = await api.get(`/conversations/${id}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response?.statusText);
  }
});

export const readMessage = createAsyncThunk(
  'conversations/read-message',
  async (data: any, { rejectWithValue } ) => {
  try {
    const res = await api.put('/messages/read', data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response?.statusText);
  }
});

export const deleteMessage = createAsyncThunk(
  'messages/delete',
  async (id: string, { rejectWithValue } ) => {
  try {
    const res = await api.delete(`/messages/delete/${id}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error?.response?.statusText);
  }
});
