// import spliced from './AlbumSpliced.png';
import './Home.css';
import React from 'react';
import Introduction from './Introduction';

class Home extends React.Component {
  

  
  render() {
    let introStr = "This is in line 1.\nThis is in line 2.";
    return (
      <div className="Home">
        <header className="Home-header">
          <Introduction text="Welcome to Splicify" 
            text2="Welcome to Splicify, this is an interactive experience that can visualize your top played songs."
            text3="B:"/>
        </header>
        
        
        
        

      </div>
      
    );
  }
}

// OG version from Figma.
// class Home extends React.Component {
  
//   render() {
//     return (
//       <div className="Home">
//         <header className="Home-header">
//           <Introduction text="Welcome to Splicify"/>
//           <img src={spliced} className="Home-logo" alt="spliced" />
//           <Introduction text="Welcome to Splicify"/>
//         </header>
        
        
        
        

//       </div>
      
//     );
//   }
// }



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
