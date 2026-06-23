import './App.css'
import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/' Component={HomePage}/>
      </Routes>
    </div>
  )
}

export default App
