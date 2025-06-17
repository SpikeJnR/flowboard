import { useAppSelector } from '../../hooks/hooks-selectors.ts';
import { getUserName, getUserPhoto } from '../../store/user-slice/user-selectors.ts';
import { auth } from '../../firebase.ts';
import { handleAddPassword, handleChangeEmail } from '../../store/user-slice/user-api-actions.ts';
import { type FormEvent, useEffect, useState } from 'react';
import { sendEmailVerification, onAuthStateChanged, deleteUser, type User } from 'firebase/auth';
import LoadingScreen from '../loading-screen';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/const.ts';

const COOLDOWN_DURATION = 60;

const UserScreen = () => {
  const photoUrl = useAppSelector(getUserPhoto);
  const userName = useAppSelector(getUserName);
  const navigate = useNavigate();

  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [authMethod, setAuthMethod] = useState<string>('');
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setIsLoadingUser(true);
      try {
        if (user) {
          await user.reload();
          setCurrentUser(user);
          const providers = user.providerData.map(p => p.providerId);
          setAuthMethod(providers.includes('google.com') ? 'google' : 'password');
        } else {
          setCurrentUser(null);
          setAuthMethod('');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const handlePasswordChange = (evt: FormEvent) => {
    evt.preventDefault();
    handleAddPassword(password);
  };

  const handleEmailChange = async (evt: FormEvent) => {
    evt.preventDefault();
    await handleChangeEmail('spike.kvs@gmail.com', 'polo2215', 'password');
  };

  const handleSendVerification = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!currentUser || cooldown > 0) return;

    setIsLoadingAction(true);
    try {
      await sendEmailVerification(currentUser);
      setCooldown(COOLDOWN_DURATION);
    } catch (error) {
      console.error('Error sending verification email:', error);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await deleteUser(user);
        navigate(AppRoute.LOGIN);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (isLoadingUser) {
    return <LoadingScreen />;
  }

  return (
    <section className='user-screen'>
      <div className='user-screen__wrapper'>
        <div className='user__screen--header'>
          <img className='user-screen--photo' src={photoUrl} alt={photoUrl} />
          <span className='user__screen--name'>{userName}</span>
        </div>

        {currentUser?.emailVerified || authMethod === 'google' ? (
          <>
            <h1 className='user__scree--title'>Account settings</h1>

            <form className='user-screen__email' onSubmit={handleEmailChange}>
              <label className='user__scree--subtitle' htmlFor='user-screen__email'>
                Change email address:
              </label>
              <div>
                <input
                  className='user__screen--input'
                  value={email}
                  onChange={evt => setEmail(evt.target.value)}
                  required
                  id='user-screen__email'
                />
                <button className='user-screen__submit' type='submit'>
                  Submit
                </button>
              </div>
            </form>

            <form className='user-screen__password' onSubmit={handlePasswordChange}>
              <label className='user__scree--subtitle' htmlFor='user-screen__password'>
                Change current password
              </label>
              <div>
                <input
                  className='user__screen--input'
                  type='password'
                  value={password}
                  onChange={evt => setPassword(evt.target.value)}
                  required
                  id='user-screen__password'
                />
                <button className='user-screen__submit' type='submit'>
                  Change
                </button>
              </div>
            </form>

            <button className='user-screen__delete' onClick={handleDeleteAccount}>
              Delete account
            </button>
          </>
        ) : (
          <div className='user__screen--verified'>
            <p>
              Confirm your email address to access your personal data
              <br /> Send the verification message again:
            </p>

            <button
              className='button__verification'
              type='button'
              onClick={handleSendVerification}
              disabled={cooldown > 0 || isLoadingAction}
            >
              Send
            </button>

            {cooldown > 0 && (
              <p style={{ marginTop: '10px' }}>
                The confirmation has been sent to your email. <br /> You can repeat the sending via:{' '}
                <strong>{cooldown}</strong> seconds.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserScreen;
