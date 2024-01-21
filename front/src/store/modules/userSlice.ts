import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import LogedUserType from '../../types/LoggedUserType';

const initialState: LogedUserType = {
  email: '',
  password: '',
  remember: false
};

const userSlice = createSlice({
  name: 'logedUser',
  initialState,
  reducers: {
    logedUser(_, action: PayloadAction<LogedUserType>) {
      return action.payload;
    }
  }
});

export const { logedUser } = userSlice.actions;
export default userSlice.reducer;