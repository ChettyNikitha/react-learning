import React from 'react';

import AuthForm from './AuthForm.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepageview from './view/homepageview.jsx';





function App() {

  return (

    <div id="app"  >


      
      <Router>
        <Routes>
        <Route path="/" element={<AuthForm/>} />
        <Route path="/home" element={<Homepageview />} />
        </Routes>
      </Router>






    </div>
  );
}

export default App;
