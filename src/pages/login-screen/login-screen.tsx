import { GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase.ts';
import { useAppDispatch } from '../../hooks/hooks-selectors.ts';
import { checkAuthAction } from '../../store/user-slice/user-api-actions.ts';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/const.ts';
import Gallery from '../../components/gallery';
import { useState } from 'react';
import LoginForm from '../../components/login-form';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
      }
      dispatch(checkAuthAction());
      navigate(AppRoute.BOARDS);
    } catch (error) {
      console.error('Ошибка входа через Google:', (error as Error).message);
    }
  };

  return (
    <section className='login login__screen'>
      <div className='login__logo-container'>
        <div className='login__left-section'>
          <Link to='/' className='login__logo logo'>
            <img
              className='task-list-icon'
              src='/images/task-list-icon.svg'
              width='50px'
              height='50px'
            />
            <span className='logo-flow login__flow'>Flow</span>
            <span className='logo-board'>Board</span>
          </Link>

          <LoginForm isLogin={isLogin} />

          <p className='login__divider'>Or continue</p>
          <button onClick={loginWithGoogle} className='button  login__btn-google'>
            <img className='google_icon' src='/images/google-icon.svg' width='24px' height='24px' />
            Log in with Google
          </button>

          <p className='login__signup-text'>
            {isLogin ? "Don't have an account? " : 'Do you already have an account? '}
            <button className='login__signup-button' onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        <Gallery />
      </div>
    </section>
  );
};

export default LoginScreen;
