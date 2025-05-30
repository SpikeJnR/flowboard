import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { checkAuthAction } from '../store/user-slice/user-api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../utils/const';
import { useAppDispatch } from './hooks-selectors.ts';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const register = async (email: string, password: string) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredentials.user);
    dispatch(checkAuthAction());
    navigate(AppRoute.ROOT);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(checkAuthAction());

    navigate(AppRoute.BOARDS);
  };

  return { login, register };
};

export default useAuth;
