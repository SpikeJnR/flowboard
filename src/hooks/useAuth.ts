import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { checkAuthAction } from '../store/user-slice/user-api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../utils/const';
import { useAppDispatch } from './hooks-selectors.ts';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeNickname = async (nickname: string) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: nickname
      });
    }
  };

  const changeUserPhoto = async (photo: string) => {
    if (!photo) {
      photo = '/images/user-icon.png';
    }
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        photoURL: photo
      });
    }
  };

  const register = async (email: string, password: string, nickname: string, photo: string) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredentials.user);
    await changeNickname(nickname);
    await changeUserPhoto(photo);
    dispatch(checkAuthAction());
    navigate(AppRoute.BOARDS);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(checkAuthAction());
    navigate(AppRoute.BOARDS);
  };

  return { login, register };
};

export default useAuth;
