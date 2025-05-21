import '../App.css';
import { FC } from "react";
import { Link } from "react-router-dom";
import './home.style.css';

const Home: FC = () => {
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
        <header className="App-header">
          <h1>Engineer Morale</h1>
          <section className="section">
            <p>Core Values:</p>
            <ul>
              <li>Be a builder, not a maintainer</li>
              <li>Be responsible for what you built</li>
              <li>Embrace continuous learning</li>
              <li>Focus on user experience</li>
            </ul>
          </section>
          <section className="section">
            <p>Daily Practices:</p>
            <ul>
              <li>Write clean, maintainable code</li>
              <li>Test thoroughly before deployment</li>
              <li>Document your work clearly</li>
              <li>Collaborate effectively with team</li>
            </ul>
          </section>
        </header>
      </div>
    </div>
  );
};

export default Home; 