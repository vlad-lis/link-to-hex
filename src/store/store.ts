import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import squeezedLinksReducer from './squeezedLinksSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    squeezedLinks: squeezedLinksReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
