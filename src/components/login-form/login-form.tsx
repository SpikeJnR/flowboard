import * as React from 'react';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth.ts';
import NicknameInputField from '../nickname-input-field';
import ImageUploader from '../image-uploader';
import useValidate from '../../hooks/useValidate.tsx';

type LoginFormProps = {
  isLogin: boolean;
};

const LoginForm = ({ isLogin }: LoginFormProps) => {
  const { register, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState<string>('');
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [isEmailError, setIsEmailError] = useState<string | null>(null);
  const [isPasswordError, setIsPasswordError] = useState<string | null>(null);
  const { validateEmail, validatePassword } = useValidate;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!email) {
        setIsEmailError(null);
        return;
      }
      const error = validateEmail(email);
      setIsEmailError(error);
    }, 300);

    return () => clearTimeout(timeout);
  }, [email]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!password) {
        setIsPasswordError(null);
        return;
      }
      const error = validatePassword(password);
      setIsPasswordError(error);
    }, 300);

    return () => clearTimeout(timeout);
  }, [password]);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, nickname, photo);
      }
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
            className={`email__input input ${isEmailError && 'input__error'}`}
            type='email'
            placeholder='Enter the email'
            id='email__input'
            onChange={evt => setEmail(evt.target.value)}
            required
            value={email}
            aria-invalid={!!isEmailError}
            aria-describedby='email-error'
          />
          <label className='email__label input__label' htmlFor='email__input'>
            Email
          </label>
          {isEmailError && <p className='input__error--message'>{isEmailError}</p>}
        </div>

        <div className='password__input--wrapper'>
          <input
            className={`password__input input ${isPasswordError && 'input__error'}`}
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter the password'
            id='password__input'
            onChange={evt => setPassword(evt.target.value)}
            value={password}
            required
            aria-invalid={!!isPasswordError}
            aria-describedby='password-error'
          />

          <label className='password__label input__label' htmlFor='password__input'>
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
                  ? '/images/password-visibility.svg'
                  : '/images/password-visibility-off.svg'
              }
              width='24px'
              height='24px'
              id='password__icon'
              alt={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            />
          </button>
          {isPasswordError && <p className='input__error--message'>{isPasswordError}</p>}
        </div>

        {!isLogin && <NicknameInputField setNickname={setNickname} />}
        {!isLogin && <ImageUploader setPhoto={setPhoto} setIsLoadingPhoto={setIsLoadingPhoto} />}
        <button
          type='submit'
          className={`button blue__button ${isLoadingPhoto ? 'button__login--disabled' : ''}`}
          disabled={isLoadingPhoto || !!isEmailError}
        >
          {isLogin ? 'Sign in' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
