import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Details from './components/Details';
import './App.css';
import './App2.css';
import Update from './components/Update';
import Image from './components/Image';
import SignUp from './user/Signup';
import SignIn from './user/Signin';
import About from './user/About';
import Navbar from './user/Navbar';
import Home from './user/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/* <Route path='/update/:username' element={<Update />} /> */}
          <Route path='/update/:_id' element={<Update />} />
          <Route path='/add' element={<Add />} />
          <Route path='/details' element={<Details />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Home />} />
          
          {/* <Route path='/' element={<Image />} /> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
