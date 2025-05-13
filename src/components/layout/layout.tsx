import {Link, Outlet, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/user-slice/user-selectors.ts';
import {auth} from '../../firebase.ts';
import {checkAuthAction} from '../../store/user-slice/user-api-actions.ts';

const Layout = () => {

    const navigate = useNavigate();
    const authStatus = useAppSelector(getAuthStatus);

    const dispatch = useAppDispatch();

    const logout = async () => {
      try {
        await auth.signOut();
        dispatch(checkAuthAction());
        navigate(AppRoute.ROOT);
      } catch (error) {
        console.log(error);
      }
    }

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
              ? (
                <div className='header__right'>
                  <button onClick={logout} className='header__logo-button button-large button'>LOGOUT</button>
                </div>
              )
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
