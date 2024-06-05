import { combineReducers } from "@reduxjs/toolkit";

import { meReducer } from '@/entities/me';
import { conversationsReducer } from "@/entities/conversations";
import { websocketReducer } from "@/entities/websocket";

const reducers = combineReducers({
  me: meReducer,
  conversations: conversationsReducer,
  websocket: websocketReducer,
});

export default reducers;
