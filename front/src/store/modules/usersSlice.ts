import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';
import { createUser } from '../../services/api.service';

export const createUserAction = createAsyncThunk('tasks/create', async (props: UserType) => {
  const result = await createUser(props);
  return result;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as UserType[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserAction.pending, () => {
      console.log('Create user started');
      
    })
    builder.addCase(createUserAction.fulfilled, (_, action) => {
      console.log('Create user ended');
      return action.payload.data;
    })
  }
});

export default usersSlice.reducer;