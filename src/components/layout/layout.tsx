import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const.ts';
import { useAppSelector } from '../../hooks/hooks-selectors.ts';
import { getAuthStatus, getUserName, getUserPhoto } from '../../store/user-slice/user-selectors.ts';
import { useState } from 'react';
import UserMenu from '../user-menu';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);
  const photoUrl = useAppSelector(getUserPhoto);
  const userName = useAppSelector(getUserName);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
              <div className='layout__nav-user-menu'>
                <img className='user__name-photo' src={photoUrl}></img>
                <p className='layout__name'>{userName}</p>
                <button className='user__button' onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <img className='user__button-arrow' src='../public/images/arrow-down.svg' />
                </button>
              </div>

              {userMenuOpen && <UserMenu setUserMenuOpen={setUserMenuOpen} />}
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
