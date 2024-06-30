/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import newMessageSound from '@/shared/assets/audio/new_message.wav';

const initialState: any = {
  ws: null,
  usersOnline: {},
};

export const connectWs = createAsyncThunk('websocket/connect', async (payload: any, { dispatch, rejectWithValue }) => {
  try {
    const ws = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: payload,
      },
    });
    ws.on('message:new', (message: any) => {
      dispatch({ type: 'conversations/send-message/fulfilled', payload: message });
      const audio = new Audio(newMessageSound);
      audio.play();
    })

    ws.on('user:update_status', (data) => dispatch(updateUsers(data)));

    ws.on('users:remove', ({ id }) => dispatch(removeUser(id)));

    return ws;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    disconnect: (state) => {
      state.ws?.close();
      state.ws = null;
    },
    updateUsers: (state, { payload }) => {
      state.usersOnline = { ...state.usersOnline, ...payload };
    },
    removeUser: (state, { payload: { userId, sub } }) => {
      delete state.usersOnline[userId];
      state.ws?.emit('user:remove_sub', { userId, sub });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectWs.fulfilled, (state, { payload }) => {
      state.ws = payload;
    })
  }
});

export const { disconnect, updateUsers, removeUser } = websocketSlice.actions;

export default websocketSlice.reducer;
