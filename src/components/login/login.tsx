import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '..//../firebase';

const Login = () => {
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Вход через Google успешен:', result.user);
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
