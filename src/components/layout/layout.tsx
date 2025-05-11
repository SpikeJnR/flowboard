import {Link, Outlet, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const.ts';
import {useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/user-slice/user-selectors.ts';

const Layout = () => {

    const navigate = useNavigate();
    const authStatus = useAppSelector(getAuthStatus);

    return(
      <div className='page page__gray page__main'>
        <header className='header'>
          <div className='header__container'>
            <div className='header__left'>
                <Link className='header__logo header__logo-link' to='/'>
                  <p className='header__logo-text'>
                    <span className='logo-flow'>Flow</span>
                    <span className='logo-board'>Board</span>
                  </p>
                </Link>
            </div>
            { authStatus === AuthorizationStatus.AUTH
              ? <p> user info</p>
              : (
                <div className='header__right'>
                  <button onClick={() => navigate(AppRoute.LOGIN)} className='header__logo-button button-large button'>LOGIN</button>
                </div>
              )
            }

          </div>
        </header>
        <Outlet />
      </div>
    );
}

export default Layout;
