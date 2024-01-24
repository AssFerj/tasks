import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LogedUserType from '../../types/LoggedUserType';
import { login } from '../../services/api.service';

export const loginAction = createAsyncThunk('logedUser/login', async (props: LogedUserType) => {
  const result = await login(props);
  return result;
})

const userSlice = createSlice({
  name: 'logedUser',
  initialState: {} as LogedUserType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, () => {
      console.log('Login started');
      
    })
    builder.addCase(loginAction.fulfilled, (_, action) => {
      console.log('Login ended');
      return action.payload.data;
    })
  }
});

export default userSlice.reducer;