import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from "axios"
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../contexts/userContexts'
import Dashboard from './pages/Dashboard'
import Profile from './pages/profile'
import Admin from './pages/admin'
import EditUser from './pages/admin-editUser'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Toaster position='bottom-right' toastOptions={{duration:2000}} />
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/loadEditUser" element={<EditUser />} /> {/* Edit user route */}
          
        </Routes>

      </UserContextProvider>
    </>
  )
}

export default App
