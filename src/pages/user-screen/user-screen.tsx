import {useAppSelector} from "../../hooks";
import {getUserName, getUserPhoto} from "../../store/user-slice/user-selectors.ts";

const UserScreen = () => {
  const photoUrl = useAppSelector(getUserPhoto);
  const userName = useAppSelector(getUserName);

  return (
    <section className='user-screen'>
      <div className='layout__nav-user-menu'>
        <img className='user__name-photo' src={photoUrl}></img>
        <p className='layout__name'>{userName}</p>
      </div>

      <h1>Account settings</h1>

      <form className='user-screen__email' >
        <h3>Email address</h3>
        <button type='submit'>Submit </button>
      </form>

      <form className='user-screen__password'>
        <h3>Password</h3>
        <input placeholder='********'></input>
        <button>Change</button>
      </form>

      <button> Delete account </button>
    </section>
  );
}

export default UserScreen
