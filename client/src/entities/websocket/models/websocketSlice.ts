/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import newMessageSound from '@/shared/assets/audio/new_message.wav';

const initialState: any = {
  ws: null,
  usersOnline: [],
};

export const connectWs = createAsyncThunk('websocket/connect', async (payload: any, { dispatch, rejectWithValue }) => {
  try {
    const ws = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: payload,
      },
    });
    ws.on('message', (message: any) => {
      dispatch({ type: 'conversations/send-message/fulfilled', payload: message });
      const audio = new Audio(newMessageSound);
      audio.play();
    })
    return ws;
  } catch (err) {
    return rejectWithValue(err);
  }
})

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    disconnect: (state) => {
      state.ws?.close();
      state.ws = null;
    },
    getUsersOnline: (state) => {
      state.ws?.on('user:get_users_online', (data: any) => state.usersOnline === data);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(connectWs.fulfilled, (state, { payload }) => {
      state.ws = payload;
    })
  }
});

export const { disconnect, getUsersOnline } = websocketSlice.actions

export default websocketSlice.reducer;
