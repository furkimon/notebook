import React, { useEffect } from 'react';
import './App.css';
import { Header, Home, Registration} from './components'
// import { loadUser } from './actions/authActions'
import {clearErrors} from './actions/errorActions'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const { token} = useSelector(state => state.auth)
  
  useEffect(()=>{
    if(token) dispatch(clearErrors())
  }, [token])
  
  return (
    <div className="App">
      <Header />
      
      <Home />
      <Registration/>
    </div>
  );
}

export default App;
