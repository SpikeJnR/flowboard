import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth} from '../../firebase.ts';
import {useAppDispatch} from '../../hooks';
import {checkAuthAction} from '../../store/user-slice/user-api-actions.ts';
import {Link, useNavigate} from 'react-router-dom';
import { AppRoute} from '../../utils/const.ts';
import Gallery from "../../components/gallery";


const LoginScreen = () => {
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
    <section className='login login__screen'>
      <div className='login__logo-container'>
        <div className='login__left-section'>
          <Link to='/' className='login__logo logo'>
            <img className='task-list-icon' src='./public/images/task-list-icon.svg' width='50px' height='50px'/>
            <span className='logo-flow login__flow'>Flow</span>
            <span className='logo-board'>Board</span>
          </Link>

          <div className='login__form'>
            <h1 className='login__title'>Welcome Back!</h1>
            <h3 className='login__subtitle'>Please enter login details below</h3>

            <form className='login__form-group'>
              <label className='email__label' htmlFor='email__input'>Email</label>
              <input className='email__input input' type='email' placeholder='Enter the email' id='email__input' />

              <label className='password__label' htmlFor='password__input'>Password</label>
              <input className='password__input input' type='password' placeholder='Enter the password' id='password__input' />

              <button type='submit' className='button blue__button'>
                Sign in
              </button>
            </form>
          </div>

          <p className='login__divider'>Or continue</p>
          <button onClick={login} className='button  login__btn-google'>
              <img className='google_icon' src='./public/images/google-icon.svg' width='24px' height='24px'/>
              Log in with Google
          </button>

          <p className='login__signup-text'>
            Don't have an account? &nbsp;
            <Link to='/' className='login__signup-link'>
              Sign Up
            </Link>
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
