import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.style.css";

const Navigation = () => {
  const links = [
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
      <div className="navigation-bar">
        {links.map(({ title, path }) => (
          <Link className="navigation-title" to={path}>
            {title}
          </Link>
        ))}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;