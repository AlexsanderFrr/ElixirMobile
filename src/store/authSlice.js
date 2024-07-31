import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user : null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  
});

// Action creators sao gerados para cada função reducer
export const { login, logout } = authSlice.actions

export default authSlice.reducer;