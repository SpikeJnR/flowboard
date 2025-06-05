import { auth } from '../../firebase.ts';
import { checkAuthAction } from '../../store/user-slice/user-api-actions.ts';
import { AppRoute, Theme } from '../../utils/const.ts';
import { useAppDispatch } from '../../hooks/hooks-selectors.ts';
import { Link, useNavigate } from 'react-router-dom';
import { type Dispatch } from 'react';
import useTheme from '../../hooks/useTheme.tsx';

type UserMenuProps = {
  userMenuOpen: boolean;
  setUserMenuOpen: Dispatch<React.SetStateAction<boolean>>;
};

const UserMenu = ({ setUserMenuOpen, userMenuOpen }: UserMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
  };

  return (
    <section className={`user-menu ${userMenuOpen ? 'open' : 'close'} `}>
      <span className='menu-item'>
        <div className='menu-item__wrapper' onClick={() => navigate(AppRoute.SETTINGS)}>
          <Link className='menu-item__title menu-item__account' to={AppRoute.SETTINGS}>
            Account settings
          </Link>
        </div>
      </span>
      <span className='menu-item menu-item__border'>
        <div className='menu-item__wrapper' onClick={() => navigate(AppRoute.BOARDS)}>
          <Link className='menu-item__title menu-item__account' to={AppRoute.BOARDS}>
            Boards
          </Link>
        </div>
      </span>
      <span className='menu-item menu-item__theme'>
        <div className='menu-item__wrapper' onClick={toggleTheme}>
          <span className='menu-item__title'> Change theme </span>
          <button
            className={`completed__button ${theme === Theme.DARK ? 'completed__button-active' : ''}`}
            value={'light'}
            type='button'
            onClick={toggleTheme}
          />
        </div>
      </span>
      <span className='menu-item menu-item__logout'>
        <div className='menu-item__wrapper'>
          <button className='user__button--logout' onClick={logout}>
            <span className='menu-item__title menu-item__title--logout'>Logout</span>
            <img className='user__button-arrow' src='/images/logout.svg' alt='Logout' />
          </button>
        </div>
      </span>
    </section>
  );
};

export default UserMenu;
