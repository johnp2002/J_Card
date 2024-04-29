import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='h-screen'
    style={{
      background:"url('gl.jpg')",
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover'
  }}
    >
      
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Dashboard />} />
        <Route path='/john' element={<h1>John PAGE</h1>} />
        <Route path='/home' element={<Home />} />
        <Route path='/alex' element={<h1>Alex PAGE</h1>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </div>
  )
}

export default App