import { combineReducers } from "@reduxjs/toolkit";

import { meReducer } from '@/entities/me';

const reducers = combineReducers({
  me: meReducer,
});

export default reducers;
