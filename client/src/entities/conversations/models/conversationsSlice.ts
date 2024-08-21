/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

import {
  sendMessage,
  getAllConversations,
  getConversation,
  readMessage,
  deleteMessage
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
        state.data.item.messages = [...state.data.item.messages, payload];
        if (payload.conversation) {
          state.data.list = [...state.data.list, payload.conversation];
          return;
        }
        state.data.list = state.data.list.map((conversation: any) => {
          if (conversation.id === payload.conversationId) {
            return { ...conversation, lastMessage: payload };
          }
          return conversation;
        });
      })
      .addCase(readMessage.fulfilled, (state, { payload: { messages } }) => {
        const conversationData = state.data.item;
        conversationData.messages = conversationData.messages.map((message: any) => {
          const isUpdated = messages.includes(message._id);
          if (isUpdated) return { ...message, isSeen: true };
          return message;
        });
      })
      .addCase(deleteMessage.fulfilled, (state, { payload: { id } }) => {
        state.data.item.messages = state.data.item?.messages.filter((item: any) => item._id !== id);
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
