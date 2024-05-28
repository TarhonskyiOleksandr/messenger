/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

import {
  sendMessage,
  getAllConversations,
  getConversation
} from './thunks';

const initialState: any = {
  loading: false,
  error: '',
  data: {
    list: [],
    item: {},
  },
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.rejected, (state, payload) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.list = state.data.list.map((conversation: any) => {
          if (conversation.id === payload.conversationId) {
            return { ...conversation, lastMessage: payload };
          }
          return conversation;
        });
        state.data.item.messages = [...state.data.item.messages, payload];
      })
      .addCase(getAllConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllConversations.rejected, (state, payload) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getAllConversations.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.list = payload;
      })
      .addCase(getConversation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.item = payload;
      })
  },
});

export default conversationsSlice.reducer;
