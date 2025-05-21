import { FC, Fragment } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./navigation.style.css";

interface NavLink {
  title: string;
  path: string;
}

const Navigation: FC = () => {
  const location = useLocation();
  const links: NavLink[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Projects",
      path: "/projects",
    },
    {
      title: "Game",
      path: "/game",
    },
  ];
  
  return (
    <Fragment>
      <nav className="navigation-bar">
        <div className="navigation-container">
          <Link to="/" className="navigation-logo">
            Portfolio
          </Link>
          <div className="navigation-links">
            {links.map(({ title, path }) => (
              <Link 
                key={title} 
                className={`navigation-title ${location.pathname === path ? 'active' : ''}`} 
                to={path}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation; 