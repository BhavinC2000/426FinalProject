import React from 'react';
import './App.css';
import Work from "./Work";
import Activities from "./Activities";
import Projects from "./Projects";
import Profile from "./Profile";


const App = () => {


  return (
    <div>
      <div className="column left">
        <Profile />
      </div>
      <div className="column right">
          <Work />
          <Activities />
          <Projects />
      </div>
    </div>
  );
}

export default App;
