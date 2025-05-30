import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase.ts';
import {useAppDispatch} from '../../hooks';
import {checkAuthAction} from '../../store/user-slice/user-api-actions.ts';
import {Link, useNavigate} from 'react-router-dom';
import { AppRoute} from '../../utils/const.ts';
import Gallery from '../../components/gallery';
import {useState} from 'react';
import { sendEmailVerification } from 'firebase/auth';
import LoginForm from "../../components/login-form";

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(() => {
        dispatch(checkAuthAction());
        navigate(AppRoute.BOARDS);
        const user = auth.currentUser;
        user && sendEmailVerification(user);
      })
      .catch((error) => {
        console.error('Ошибка входа через Google:', error.message);
      });
  }

  return (
    <section className='login login__screen'>
      <div className='login__logo-container'>
        <div className='login__left-section'>
          <Link to='/' className='login__logo logo'>
            <img className='task-list-icon' src='./public/images/task-list-icon.svg' width='50px' height='50px'/>
            <span className='logo-flow login__flow'>Flow</span>
            <span className='logo-board'>Board</span>
          </Link>

          <LoginForm isLogin={isLogin}/>

          <p className='login__divider'>Or continue</p>
          <button onClick={loginWithGoogle} className='button  login__btn-google'>
              <img className='google_icon' src='./public/images/google-icon.svg' width='24px' height='24px'/>
              Log in with Google
          </button>

          <p className='login__signup-text'>
            {isLogin ? 'Don\'t have an account? ' : 'Do you already have an account? '}

            <button
              className='login__signup-button'
              onClick={()=> setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

        </div>

        <div className='login__right-section'>
            <Gallery />
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
