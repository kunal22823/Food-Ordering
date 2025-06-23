import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
const App = () => {
  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/order' element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/MyOrders' element={<MyOrders/>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
