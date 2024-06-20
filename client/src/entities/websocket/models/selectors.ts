export const selectWS = (state: RootState) => state.websocket.ws;
export const selectIsOnline = (state: RootState, id: string) => state.websocket?.usersOnline[id] === 'online';
export const selectUsers = (state: RootState) => state.websocket?.usersOnline;
