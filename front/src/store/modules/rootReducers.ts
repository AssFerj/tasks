import { combineReducers } from '@reduxjs/toolkit';

import usersReducer from './usersSlice';
import tasksReducer from './tasksSlice';
import userReducer from './userSlice';

export default combineReducers({
  usersReducer,
  userReducer,
  tasksReducer
});