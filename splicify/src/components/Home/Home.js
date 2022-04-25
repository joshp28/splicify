import './Home.css';
import React from 'react';
import Introduction from '../Introduction/Introduction';

function Home() {

  

  return (
    <div className="Home">
      <header className="Home-header">
        <Introduction
          welcome="Welcome to"
          title="Splicify"
          intro1="Your top 5 albums will be spliced onto this cube."
          intro2="Try to guess your top albums and see if your friends can guess them right!"
        />
      </header>

    </div>

  );

}


export default Home;
