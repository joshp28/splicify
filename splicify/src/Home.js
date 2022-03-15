import spliced from './AlbumSpliced.png';
import './Home.css';
import React from 'react';
import Introduction from './Introduction';

class Home extends React.Component {
  
  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <Introduction text="Welcome to Splicify"/>
          <img src={spliced} className="Home-logo" alt="spliced" />
          <Introduction text="Welcome to Splicify"/>
        </header>
        
        
        
        

      </div>
      
    );
  }
}



// function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
        
  //     </header>
  //   </div>
    
  // );
// }

export default Home;
