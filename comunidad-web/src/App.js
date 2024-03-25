import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Accesorios from './pages/Indumentaria/Accesorios/Accesorios';
import Remeras from './pages/Indumentaria/Remeras/Remeras';
import Pantalones from './pages/Indumentaria/Pantalones/Pantalones';
import Buzos from './pages/Indumentaria/Buzos/Buzos';
import Add from './pages/Indumentaria/Add/Add';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='/remeras' element={<Remeras />} />
          <Route path='/pantalones' element={<Pantalones />} />
          <Route path='/buzos' element={<Buzos />} />
          <Route path='/accesorios' element={<Accesorios />} />
          <Route path='/add' element={<Add />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
