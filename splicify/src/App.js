import './App.css';
import React from 'react';
import Home from './components/Home/Home';
import Guesser from './components/Guesser/Guesser';
import Introduction from './components/Introduction/Introduction';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Results from './components/Results/Results';

function App() {

  
  
  return (
    

    <Router>
      <Routes>
        <Route path="/" exact element={<Introduction/>} />
        <Route path="/guesser" exact element={<Guesser/>} />
        <Route path="/results" exact element={<Results/>} />
      </Routes>
    </Router>

    

    
  )

}


export default App;
