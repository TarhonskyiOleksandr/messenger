/* eslint-disable @typescript-eslint/no-explicit-any */
declare type RootState = ReturnType<typeof import('./store').store.getState>
declare type AppDispatch = typeof import('./store').store.dispatch

export interface IMessage {
  _id: string;
  senderId: string;
  conversationId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}
