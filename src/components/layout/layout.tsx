import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/user-slice/user-selectors.ts';
import {auth} from '../../firebase.ts';
import {checkAuthAction} from '../../store/user-slice/user-api-actions.ts';

const Layout = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authStatus = useAppSelector(getAuthStatus);



    const logout = async () => {
      try {
        await auth.signOut();
        dispatch(checkAuthAction());
        navigate(AppRoute.ROOT);
      } catch (error) {
        console.error('Ошибка выхода:', error);
      }
    }

    if (pathname === '/login') {
      return <Outlet />;
    }

    return(
      <div className='layout'>
        <header className='layout__header'>
          <Link to="/" className="layout__logo logo">
            <span className="logo-flow">Flow</span>
            <span className="logo-board">Board</span>
          </Link>
          <div className='layout__nav'>
            {
              authStatus === AuthorizationStatus.AUTH
                ? <button onClick={logout} className='layout__button button-large button'>LOGOUT</button>
                : <button onClick={() => navigate(AppRoute.LOGIN)} className='layout__button button-large button'>LOGIN</button>
            }
          </div>
        </header>

        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    );
}

export default Layout;
