import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/layout';
import {Fragment, useEffect} from 'react';
import {AppRoute, Theme} from './utils/const.ts';
import {useAppDispatch} from './hooks';
import {checkAuthAction} from './store/user-slice/user-api-actions.ts';
import LoginScreen from './pages/login-screen';
import MainScreen from './pages/main-screen';
import BoardsScreen from './pages/boards-screen';
import PrivateRoute from './components/private-route';
import TaskProvider from './contexts/task-context.tsx';
import useTheme from "./hooks/use-theme.tsx";
import {auth} from "./firebase.ts";
import UserScreen from "./pages/user-screen";

function App() {
  const dispatch = useAppDispatch();
  const { initTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      await dispatch(checkAuthAction());
      initTheme();

      if(!user) {
        document.documentElement.setAttribute('data-theme', Theme.LIGHT);
        localStorage.removeItem('theme');
      }
    });

    return () => unsubscribe();
  }, [dispatch, initTheme]);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path = {AppRoute.ROOT} element = {<Layout />}>
            <Route index element={<MainScreen />}></Route>
            <Route path = {AppRoute.BOARDS}
              element = {
                <PrivateRoute>
                  <TaskProvider>
                    <BoardsScreen />
                  </TaskProvider>
                </PrivateRoute>
              }>
            </Route>
            <Route path = {AppRoute.LOGIN} element = {<LoginScreen />}></Route>
            <Route path = {AppRoute.SETTINGS} element = {<UserScreen />}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
