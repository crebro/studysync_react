import './App.css'
import Home from './pages/home'

import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import axios from 'axios';
import UserProvider from './providers/UserProvider';

axios.defaults.baseURL = 'http://localhost:8000/api';

function ProviderWrapper(props) {
  return
}

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>;

    </>
  )
}

export default App
