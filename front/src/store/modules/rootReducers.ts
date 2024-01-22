// import { combineReducers } from '@reduxjs/toolkit';

// import usersReducer from './usersSlice';
// import tasksReducer from './tasksSlice';
// import userReducer from './userSlice';

// export default combineReducers({
//   usersReducer,
//   userReducer,
//   tasksReducer
// });

import { combineReducers } from '@reduxjs/toolkit';

import tasksReducer from './tasksSlice';
import logedUserReducer from './userSlice';
import userReducer from './usersSlice';

export default combineReducers({
  tasksReducer,
  logedUserReducer,
  userReducer
});