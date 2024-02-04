import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TAuthState = {
  isLoggedIn: boolean;
};

const initialState: TAuthState = {
  isLoggedIn: !!sessionStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
