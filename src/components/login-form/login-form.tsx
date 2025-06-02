import * as React from 'react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth.ts';
import NicknameInputField from '../nickname-input-field';

type LoginFormProps = {
  isLogin: boolean;
};

const LoginForm = ({ isLogin }: LoginFormProps) => {
  const { register, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    try {
      isLogin ? await login(email, password) : await register(email, password, nickname);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login__form'>
      <h1 className='login__title'>{isLogin ? 'Welcome Back!' : 'Create your account'}</h1>
      <h3 className='login__subtitle'>
        {isLogin ? 'Please enter login details below' : 'Fill in the form to start using FlowBoard'}
      </h3>

      <form className='login__form-group' onSubmit={handleSubmit}>
        <div className='email__input--wrapper'>
          <input
            className='email__input input'
            type='email'
            placeholder='Enter the email'
            id='email__input'
            onChange={evt => setEmail(evt.target.value)}
            required
          />
          <label className='email__label' htmlFor='email__input'>
            Email
          </label>
        </div>

        <div className='password__input--wrapper'>
          <input
            className='password__input input'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter the password'
            id='password__input'
            onChange={evt => setPassword(evt.target.value)}
            required
            pattern={'^[A-Za-z0-9]{8,30}$'}
            title='Пароль должен иметь длинну от 8 до 30 символов. И содержать только латинские цифры и букы'
          />

          <label className='password__label' htmlFor='password__input'>
            Password
          </label>

          <button
            className='password__toggle'
            type='button'
            aria-label='show password'
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              className='password__icon'
              src={
                showPassword
                  ? './public/images/password-visibility.svg'
                  : './public/images/password-visibility-off.svg'
              }
              width='24px'
              height='24px'
              id='password__icon'
            />
          </button>
        </div>

        {!isLogin && <NicknameInputField setNickname={setNickname} />}

        <button type='submit' className='button blue__button'>
          {isLogin ? 'Sign in' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
