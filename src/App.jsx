import './App.css'
import Home from './pages/Home/home'

import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import Reader from './pages/Reader/Reader';
import axios from 'axios';
import UserProvider from './providers/UserProvider';
import Dashboard from './pages/Dashboard/Dashboard';
import Spaces from './pages/Dashboard/Spaces/Spaces';
import DashboardLayout from 'pages/Dashboard/DashboardLayout';
import SingleSpace from 'pages/Dashboard/Spaces/SingleSpace';
import { CreateSpace } from 'pages/Dashboard/Spaces/CreateSpace';
import { InvitationJoin } from 'pages/InvitationJoin';
import { FlashDeck } from 'pages/Dashboard/Spaces/FlashDeck';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000/api';


function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/dashboard'>
              <Route path='/dashboard/' element={<DashboardLayout children={<Dashboard />} />} />
              <Route path='/dashboard/reader' element={<DashboardLayout children={<Reader />} />} />
              <Route path='/dashboard/reader/:location' element={<DashboardLayout children={<Reader />} />} />
              <Route path='/dashboard/your-spaces' element={<DashboardLayout children={<Spaces />} />} />
              <Route path='/dashboard/your-spaces/create' element={<DashboardLayout children={<CreateSpace />} />} />
              <Route path='/dashboard/spaces/:id' element={<DashboardLayout children={<SingleSpace />} />} />
              <Route path='/dashboard/flashdecks/:id' element={<DashboardLayout children={<FlashDeck />} />} />
              {/* <Route path='/dashboard/else' element={<> this is an else page new page</>} /> */}
            </Route>

            <Route path='/invitation/join/:invitation_code' element={<DashboardLayout children={<InvitationJoin />} />} />
          </Routes>

        </BrowserRouter>
        <Toaster />
      </UserProvider>;

    </>
  )
}

export default App
