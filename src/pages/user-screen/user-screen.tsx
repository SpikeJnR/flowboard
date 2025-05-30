import {useAppSelector} from "../../hooks/hooks-selectors.ts";
import {getUserName, getUserPhoto} from "../../store/user-slice/user-selectors.ts";
import {auth} from "../../firebase.ts";
import {handleAddPassword, handleChangeEmail} from "../../store/user-slice/user-api-actions.ts";
import {type FormEvent, useEffect, useState} from "react";
import {sendEmailVerification, onAuthStateChanged} from "firebase/auth";
import LoadingScreen from "../loading-screen";

const UserScreen = () => {
  const photoUrl = useAppSelector(getUserPhoto);
  const userName = useAppSelector(getUserName);

  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [authMethod, setAuthMethod] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoadingUser(true);

      try {
        if (user) {
          await user.reload();

          const updatedUser = { ...user };
          setCurrentUser(updatedUser);

          const providers = updatedUser.providerData.map(p => p.providerId);
          setAuthMethod(providers.includes('google.com') ? 'google' : 'password');
        } else {
          setCurrentUser(null);
          setAuthMethod('');
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePasswordChange = (evt: FormEvent) => {
    evt.preventDefault();
    handleAddPassword(password);
  }

  const handleEmailChange = async (evt: FormEvent) => {
    evt.preventDefault();
    await handleChangeEmail('spike.kvs@gmail.com', 'polo2215', 'password');
    // handleChangeEmail(email, 'polo2215', authMethod);
  }

  const handleSendVerification = async (evt) => {
    evt.preventDefault();
    if (!currentUser) return;

    setIsLoadingAction(true);
    try {
      await sendEmailVerification(currentUser);
    } finally {
      setIsLoadingAction(false);
    }
  }

  if(isLoadingAction || isLoadingUser) {
    return <LoadingScreen />
  }


  return (
    <section className='user-screen'>
      <div className='user-screen__wrapper'>
        {
          currentUser?.emailVerified || authMethod === 'google' ?
            (
              <>
                <div className='layout__nav-user-menu'>
                  <img className='user__name-photo' src={photoUrl}></img>
                  <p className='layout__name'>{userName}</p>
                </div>

                <h1>Account settings</h1>

                <form className='user-screen__email' onSubmit={handleEmailChange}>
                  <h3>Email address</h3>
                  <input value={email} onChange={(evt) => setEmail(evt.target.value)} required></input>
                  <button type='submit'>Submit </button>
                </form>

                <form className='user-screen__password' onSubmit={handlePasswordChange}>
                <h3>Password</h3>
                <input type='password' placeholder='At least 6 characters' value={password} onChange={(evt) => setPassword(evt.target.value)} required></input>
                <button type='submit'>Change</button>
                </form>

                <button> Delete account </button>
              </>
            ): (
              <div>
                <p>Confirm your email address to have access to change user data.</p>
                <p>send the verification message again: </p>
                <button type='submit' onClick={handleSendVerification}>Send</button>
              </div>
            )
        }
      </div>
    </section>
  );
}

export default UserScreen
