import { combineReducers } from "@reduxjs/toolkit";

import { meReducer } from '@/entities/me';
import { conversationsReducer } from "@/entities/conversations";

const reducers = combineReducers({
  me: meReducer,
  conversations: conversationsReducer
});

export default reducers;
