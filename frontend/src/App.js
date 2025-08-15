import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import Login from './Components/NewLogin';

function App() {


  return (
     <Router>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
       </Routes>
     </Router>
  );
}

export default App;