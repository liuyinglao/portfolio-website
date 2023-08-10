import '../App.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
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
  );
}

export default Home;
