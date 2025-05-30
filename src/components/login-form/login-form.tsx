import * as React from "react";
import {createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase.ts";
import {checkAuthAction} from "../../store/user-slice/user-api-actions.ts";
import {AppRoute} from "../../utils/const.ts";
import {useState} from "react";
import {useAppDispatch} from "../../hooks";
import {useNavigate} from "react-router-dom";

type LoginFormProps = {
  isLogin: boolean;
}

const LoginForm = (isLogin : LoginFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterFormSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      await sendEmailVerification(user);
      dispatch(checkAuthAction());
      navigate(AppRoute.ROOT);
    }catch (error) {
      console.error(error);
    }
  }

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password__input') as HTMLInputElement;
    const passwordIcon = document.getElementById('password__icon') as HTMLImageElement;
    if(passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordIcon.src = './public/images/password-visibility.svg';
    } else {
      passwordInput.type = 'password';
      passwordIcon.src = './public/images/password-visibility-off.svg';
    }
  }

  const signIn = async (evt: React.FormEvent) =>  {
    evt.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(checkAuthAction())
        console.log(auth.currentUser);
        navigate(AppRoute.BOARDS);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <div className='login__form'>
      <h1 className='login__title'>{ isLogin ? 'Welcome Back!' : 'Create your account' }</h1>
      <h3 className='login__subtitle'>{isLogin ? 'Please enter login details below' : 'Fill in the form to start using FlowBoard'}</h3>

      <form className='login__form-group' onSubmit={isLogin ? signIn : handleRegisterFormSubmit}>
        <input className='email__input input' type='email' placeholder='Enter the email' id='email__input' onChange={(evt) => setEmail(evt.target.value)} required/>
        <label className='email__label' htmlFor='email__input'>Email</label>

        <input className='password__input input' type='password' placeholder='Enter the password' id='password__input' onChange={(evt) => setPassword(evt.target.value)} required pattern={'^[A-Za-z0-9]{8,30}$'}  title="Пароль должен иметь длинну от 8 до 30 символов. И содержать только латинские цифры и букы"/>
        <label className='password__label' htmlFor='password__input'>Password</label>

        <button className='password__toggle' type='button' aria-label='show password' onClick={togglePasswordVisibility}>
          <img className='password__icon' src='./public/images/password-visibility.svg' width='24px' height='24px' id="password__icon"/>
        </button>

        <button type='submit' className='button blue__button'>
          { isLogin ? 'Sign in' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
