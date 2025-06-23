import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom';
import Add from './Pages/Add/Add';
import List from './Pages/List/List';
import Orders from './Pages/Orders/Orders';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
            <Route path="/add" element={<Add/>}></Route>
            <Route path="/list" element={<List/>}></Route>
            <Route path="/orders" element={<Orders/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
