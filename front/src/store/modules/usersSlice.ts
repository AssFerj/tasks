import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';
import { RootState } from '../store';

const adapter = createEntityAdapter<UserType>({
  selectId: item => item.email
});

export const { selectAll, selectById: selectByEmail } = adapter.getSelectors((state: RootState) => state.usersReducer);

const usersSlice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState(),
  reducers: {
    addUser: adapter.addOne,
    updateUser: adapter.updateOne
  }
});

export const { addUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;