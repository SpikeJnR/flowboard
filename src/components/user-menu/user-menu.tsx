import {auth} from '../../firebase.ts';
import {checkAuthAction} from '../../store/user-slice/user-api-actions.ts';
import {AppRoute, Theme} from '../../utils/const.ts';
import {useAppDispatch} from '../../hooks/hooks-selectors.ts';
import {Link, useNavigate} from 'react-router-dom';
import {type Dispatch} from 'react';
import useTheme from '../../hooks/use-theme.tsx';


type UserMenuProps = {
  setUserMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu = ({setUserMenuOpen}: UserMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {theme, toggleTheme} = useTheme()

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('theme');
      document.documentElement.setAttribute('data-theme', Theme.LIGHT);
      dispatch(checkAuthAction());
      navigate(AppRoute.ROOT);
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  }

  return (
    <section className='user-menu'>
      <span>
        <Link to={AppRoute.SETTINGS}> Account settings </Link>
      </span>
      <span>
        <p> Change theme </p>
        <button
          className={`completed__button ${theme === Theme.DARK ? 'completed__button-active' : ''}`}
          value={'light'}
          type='button'
          onClick={toggleTheme}
        />
      </span>
      <button className='user__button' onClick={logout}>
        LOGOUT
        <img className='user__button-arrow' src='../public/images/logout.svg' alt='Logout'/>
      </button>
    </section>
  );
}

export default UserMenu
