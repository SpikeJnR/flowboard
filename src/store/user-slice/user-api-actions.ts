import { createAsyncThunk } from '@reduxjs/toolkit';
import { GoogleAuthProvider, sendEmailVerification, type User } from 'firebase/auth';
import {
  reauthenticateWithPopup,
  linkWithCredential,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { auth } from '../../firebase';
import { verifyBeforeUpdateEmail } from 'firebase/auth';

export const checkAuthAction = createAsyncThunk<User | null>(
  'user/checkAuthAction',
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise<User | null>(resolve => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
        });
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleAddPassword = async (password: string) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    await reauthenticateWithPopup(user, new GoogleAuthProvider());

    const credential = EmailAuthProvider.credential(user.email, password);

    await linkWithCredential(user, credential);
    console.log('work');
  } catch (error) {
    console.error(error);
  }
};

export const handleChangeEmail = async (
  newEmail: string,
  currentPassword: string,
  authMethod: string
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user.');

    if (authMethod === 'google') {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
    } else {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
    }
    await verifyBeforeUpdateEmail(user, newEmail);
    await sendEmailVerification(user);
  } catch (error) {
    console.error('Error updating email:', error);
  }
};
