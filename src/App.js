import './App.css';
import React, {  } from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import useUser, { } from './context/UserContext';
import NotFound from './components/NotFound.jsx/NotFound';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Preloader from './components/Preloader/Preloader';

function App() {

  const { currentUser, isPreloader } = useUser();
  
  if(isPreloader){
    return <Preloader/>
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={currentUser ? <Navigate to="/" /> : <SignIn />} />
      <Route path='/signup' element={currentUser ? <Navigate to="/" /> : <SignUp />} />
      <Route path='/resetpassword' element={<ResetPassword />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
