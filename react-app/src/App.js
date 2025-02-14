import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpPage from './components/auth/SignUpPage';
import PortfolioPage from './components/PortfolioPage'
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Stock from './components/StockPage';
import Menu from './components/MenuBar/menu.js';
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)


  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const Homepage = () => {
    if(!user){
      return(
        <LandingPage/>
      )
    }
    return(
      <>
        <Menu />
        <PortfolioPage />
      </>
    )
  }

  //<NavBar />
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpPage />
        </Route>

        <ProtectedRoute path='/stocks/:symbol' exact={true}>
          <Menu />
          <Stock />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <Homepage/>
        </Route>
        <Route path='/about' exact={true}>
          <About />
        </Route>
        <Route path='/' exact={true}>
          <LoginForm/>
        </Route>
        <Route path='/'>
          <ErrorPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
