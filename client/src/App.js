import React, { useEffect } from 'react';
import './App.css';
import { Header, Home, Profile, Registration } from './components'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { loadUser } from './actions/authActions'
import { getNotes, getNotesForUser, getFollowedNotes } from './actions/noteActions'
import { getUsers } from './actions/userActions'

const App = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector(state => state.auth)

  useEffect(() => {
    if (token) {
      if(!user) dispatch(loadUser())
    }
  }, [token])

  useEffect(()=>{
    if(token && user){
      dispatch(getUsers())
      dispatch(getNotes())
      dispatch(getNotesForUser(user['_id']))
      dispatch(getFollowedNotes(user['_id']))
    }
  },[token, user])


  return (
    <Router>
      <div className="App">
        <Header />
        {/* <Route path="/">
            {isAuthenticated
              ? <Redirect to="/profile" />
              : <Redirect to="/" />}
          </Route> */}
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
