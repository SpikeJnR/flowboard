import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const.ts';
import { useAppSelector } from '../../hooks/hooks-selectors.ts';
import {
  getAuthStatus,
  getUserEmail,
  getUserName,
  getUserPhoto
} from '../../store/user-slice/user-selectors.ts';
import { useEffect, useRef, useState } from 'react';
import UserMenu from '../user-menu';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);
  const photoUrl = useAppSelector(getUserPhoto);
  const userName = useAppSelector(getUserName);
  const userEmail = useAppSelector(getUserEmail);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      const target = evt.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (pathname === '/login') {
    return <Outlet />;
  }

  return (
    <div className='layout'>
      <header className='layout__header'>
        <Link to='/' className='layout__logo logo'>
          <span className='logo-flow'>Flow</span>
          <span className='logo-board'>Board</span>
        </Link>
        <div className='layout__nav'>
          {authStatus === AuthorizationStatus.AUTH ? (
            <div className='user-menu__wrapper'>
              <div className='layout__nav-user-menu' ref={userMenuRef}>
                <button className='user__button' onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <img className='user__button-arrow' src='/images/menu.svg' />
                </button>
                <span className='layout__name'>
                  <p className='user-menu__name'>{userName}</p>
                  <p className='user-menu__email'>({userEmail})</p>
                </span>
                <img className='user__name-photo' src={photoUrl} width='50px' height='50px'></img>
              </div>

              {userMenuOpen && (
                <UserMenu setUserMenuOpen={setUserMenuOpen} userMenuOpen={userMenuOpen} />
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate(AppRoute.LOGIN)}
              className='layout__button button-large button'
            >
              LOGIN
            </button>
          )}
        </div>
      </header>

      <main className='layout__content'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
