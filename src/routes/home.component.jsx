import '../App.css';
import { Link } from "react-router-dom";
import './home.style.css';

import React from "react";

function Home() {
  return (
    <div className="container">
    <div className="column left">
      <header className="App-header">
        <h1>Welcome to my personal website!</h1>
        <section className="section">
          <p>
            I am a software engineer who enjoys
          </p>
          <ul>
            <li>solving problems,</li>
            <li><Link to="/projects" className="link">building tools,</Link></li>
            <li>learning new ideas,</li>
            <li>and <Link to="/game" className="link">playing games</Link></li>
          </ul>
        </section>
        <section className="section">
          <p>In my spare time, I like to</p>
          <ul>
            <li>meet new friends,</li>
            <li>and travel with friends and family</li>
            <li>play games,</li>
            <li>read interesting books</li>
          </ul>
        </section>
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
