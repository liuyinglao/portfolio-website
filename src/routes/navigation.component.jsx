import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.style.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation-bar">
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/projects" >
          <div>Projects</div>
        </Link>
        <Link to="/game" >
          <div>Game</div>
        </Link>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
