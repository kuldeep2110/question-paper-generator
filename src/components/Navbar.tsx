import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => {
          return { color: isActive ? "coral" : "grey" };
        }}
      >
        Home
      </NavLink>
      <br />
      <NavLink
        to="/dashboard"
        style={({ isActive }) => {
          return { color: isActive ? "coral" : "grey" };
        }}
      >
        DashBoard
      </NavLink>
      <br />
      <NavLink
        to="/login"
        style={({ isActive }) => {
          return { color: isActive ? "coral" : "grey" };
        }}
      >
        Login
      </NavLink>
      <br />

      {/* <Link to="/">Home</Link>
      <br />
      <Link to="/dashboard">DashBoard</Link>
      <br />
      <Link to="/login">Login</Link>
      <br /> */}
    </nav>
  );
};

export default Navbar;
