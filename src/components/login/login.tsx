import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '..//../firebase';
import {useAppDispatch} from '../../hooks';
import {checkAuthAction} from '../../store/user-slice/user-api-actions.ts';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../utils/const.ts';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        dispatch(checkAuthAction());
        navigate(AppRoute.ROOT);
      })
      .catch((error) => {
        console.error('Ошибка входа через Google:', error.message);
      });
  }

  return (
      <button onClick={login} className='login__google'>Google</button>
  );
}

export default Login;
