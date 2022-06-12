import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './CommentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});
 