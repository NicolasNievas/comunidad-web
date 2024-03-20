// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Root from './components/Root/Root';
import Route1 from './components/Route1/Route1';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path='root' element={<Root />} />
          <Route path="/route1" element={<Route1 />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
