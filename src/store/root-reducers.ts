import {NameSpace} from '../utils/const.ts';
import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './user-slice/user-slice.ts';

export const rootReducers = combineReducers({
  [NameSpace.USER]: userSlice,
})
