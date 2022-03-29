import './App.css';
import React from 'react';
import Home from './components/Home/Home';
//import Guesser from './components/Guesser/Guesser';
import Introduction from './components/Introduction/Introduction';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  
  return (
    

    <Router>
      <Routes>
        <Route path="/" exact element={<Introduction/>} />
      </Routes>
    </Router>

    
  )

}


export default App;
