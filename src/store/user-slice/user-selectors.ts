import type { RootState } from '../store.ts';
import { NameSpace } from '../../utils/const.ts';

export const getUserEmail = (state: RootState) => state[NameSpace.USER].userEmail;
export const getUserID = (state: RootState) => state[NameSpace.USER].userID;
export const getUserName = (state: RootState) => state[NameSpace.USER].userName;
export const getUserPhoto = (state: RootState) => state[NameSpace.USER].userPhoto;
export const getAuthStatus = (state: RootState) => state[NameSpace.USER].authorizationStatus;
