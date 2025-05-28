import {createAsyncThunk} from '@reduxjs/toolkit';
import {type User} from 'firebase/auth';
import {auth} from '../../firebase';

export const checkAuthAction = createAsyncThunk<User | null>(
  'user/checkAuthAction',
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise<User | null>((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        });
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
