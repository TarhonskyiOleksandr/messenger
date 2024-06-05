export const selectConversations = (state: RootState) => state.conversations;
export const selectLastMessage = (state: RootState) => {
  const messages = state.conversations.data.item?.messages;
  if (!messages?.length) return {};
  return messages[messages.length - 1];
};
