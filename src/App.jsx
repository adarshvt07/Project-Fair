
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Pnf from './components/Pnf'
import { tokenAuthContext } from './contexts/AuthContextAPI'
import { useContext, useEffect } from 'react'

function App() {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

  useEffect(() => {
      if(sessionStorage.getItem('token')){
        setIsAuthorized(true)
      }else{
        setIsAuthorized(false)
      }
  },[isAuthorized])
  
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      {
        isAuthorized && 
        <>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/projects' element={<Projects/>}/>
        </>
        }
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
      <Route path='/*' element={<Pnf/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
