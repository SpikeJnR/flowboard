import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../utils/const.ts';
import type { UserState } from './user-types.ts';
import { checkAuthAction } from './user-api-actions.ts';

const initialState: UserState = {
  userPhoto: undefined,
  userName: undefined,
  userID: undefined,
  userEmail: undefined,
  authStatus: undefined,
  authorizationStatus: AuthorizationStatus.UNKNOWN
};

const userSLice = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string | undefined>) => {
      state.userEmail = action.payload;
    },
    setUserID: (state, action: PayloadAction<string | undefined>) => {
      state.userID = action.payload;
    },
    setUserName: (state, action: PayloadAction<string | undefined>) => {
      state.userName = action.payload;
    },
    setUserPhoto: (state, action: PayloadAction<string | undefined>) => {
      state.userPhoto = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.authorizationStatus = AuthorizationStatus.AUTH;
          state.userEmail = action.payload.email || undefined;
          state.userID = action.payload.uid;
          state.userName = action.payload.displayName || undefined;
          state.userPhoto = action.payload.photoURL || undefined;
        } else {
          state.authorizationStatus = AuthorizationStatus.NO_AUTH;
          state.userEmail = undefined;
          state.userID = undefined;
          state.userName = undefined;
          state.userPhoto = undefined;
        }
      })
      .addCase(checkAuthAction.rejected, state => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  }
});

export const { setUserEmail, setUserID, setUserName, setUserPhoto } = userSLice.actions;
export default userSLice.reducer;
