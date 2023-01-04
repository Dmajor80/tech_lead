// import logo from './logo.svg';
// import './App.css';
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import PreviewPage from './pages/PreviewPage';
import NotFound from './pages/NotFound'
import Login from './pages/Login';
import {  useState } from 'react';
import { UserContext } from './Context';

function App() {
  

  const [session,setSession]=useState({
    user_city:"",
    user_state:''
  })
  return (
    <div className='App'>
      <UserContext.Provider value={session}>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />

        <Route path='/preview' element={<PreviewPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App;
