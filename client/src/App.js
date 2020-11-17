import React, { useEffect } from 'react';
import './App.css';
import { Header, Home, Profile, Registration } from './components'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { clearErrors } from './actions/errorActions'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const { token, isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (token) dispatch(clearErrors())
  }, [token])

  return (
    <Router>
      <div className="App">
        <Header />
          <Route path="/">
            {isAuthenticated
              ? <Redirect to="/profile" />
              : <Redirect to="/" />}
          </Route>
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
