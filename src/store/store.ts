import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import squeezedLinksReducer from './squeezedLinksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    squeezedLinks: squeezedLinksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
