import { combineReducers } from "@reduxjs/toolkit";

import { meReducer } from '@/entities/me';
import { conversationsReducer } from "@/entities/conversations";
import { websocketReducer } from "@/entities/websocket";
import { searchReducer } from "@/entities/search";

const reducers = combineReducers({
  me: meReducer,
  conversations: conversationsReducer,
  websocket: websocketReducer,
  search: searchReducer,
});

export default reducers;
