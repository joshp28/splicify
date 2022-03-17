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
            text2="Splicify is an interactive experience that can visualize your top played songs. The form of art that we hope to produce is a collage of album covers from the songs that are listened to the most by a particular user
            While we are creating a form of internet art, the purpose of the final product is to also serve as a form of data visualization on a web browserInspiration came from an NFT by Time, they took different magazine pages and put them together. Each person would have a different Time slice so that every cover created was different."
            text3="While we are creating a form of internet art, the purpose of the final product is to also serve as a form of data visualization on a web browser."
            text4="Inspiration came from an NFT by Time, they took different magazine pages and put them together. Each person would have a different Time slice so that every cover created was different."
            step1="Step 1: Log into your account."
            step2="Step 2: Share your created quiz link with your friends."
            step3="Step 3: Compete with your friends to guess the top 5 songs in your album list."/>
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
