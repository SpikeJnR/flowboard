import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
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
            <div className='header__right'>
              <button className='header__logo-button button-large button'>LOGIN</button>
            </div>

          </div>
        </header>
        <Outlet />
      </div>
    );
}

export default Layout;
