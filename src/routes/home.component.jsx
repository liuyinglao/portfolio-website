import '../App.css';
import { Link } from "react-router-dom";
import './home.style.css';

import React from "react";
// import "./App.css";

// function TwoColumnLayout() {
//   return (
//     <div className="container">
//       <div className="column left">
//         <h2>Left Column</h2>
//         <p>This is the content of the left column.</p>
//       </div>
//       <div className="column right">
//         <h2>Right Column</h2>
//         <p>This is the content of the right column.</p>
//       </div>
//     </div>
//   );
// }

// export default TwoColumnLayout;


function Home() {
  return (
    <div className="container">
    <div className="column left">
      <header className="App-header">
        <h1>Welcome to my personal website!</h1>
        <p>
          I am a software engineer who enjoys
          <ul>
            <li>solving problems,</li>
            <li><Link to="/projects" className="link">building tools,</Link></li>
            <li>learning new ideas,</li>
            <li>making friends,</li>
            <li>and <Link to="/game" className="link">playing games</Link></li>
          </ul>
        </p>
        <p>
          In my spare time, I like to
          <ul>
            <li>meet new friends, </li>
            <li>play games,</li>
            <li>and travel with friends and family</li>
          </ul>
        </p>
      </header>
    </div>
    <div className="column right">
        <h2>Engineer Morale</h2>
        <p>Be a builder, not a maintainer</p>
        <p>Be responsible for what you built</p>
      </div>
    </div>
  );
}

export default Home;
