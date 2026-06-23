import './App.css'
import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/' Component={HomePage}/>
      </Routes>
    </>
  )
}

export default App
