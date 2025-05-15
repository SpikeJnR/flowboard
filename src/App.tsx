import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/layout';
import {Fragment, useEffect} from 'react';
import {AppRoute, AuthorizationStatus} from './utils/const.ts';
import {useAppDispatch, useAppSelector} from './hooks';
import {checkAuthAction} from './store/user-slice/user-api-actions.ts';
import {getAuthStatus} from './store/user-slice/user-selectors.ts';
import LoginScreen from './pages/login-screen';



function App() {

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.UNKNOWN) {
      dispatch(checkAuthAction());
    }
  }, [authStatus, dispatch]);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path = {AppRoute.ROOT} element = {<Layout />}>
            <Route path = {AppRoute.LOGIN} element = {<LoginScreen />}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
