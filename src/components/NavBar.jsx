import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "",
    color: isActive ? "#E53935" : "",
  });

  return (
    <ul className="navbar">
      <li>
        <NavLink to="/" style={isActiveStyle} className="nav-item">
          Income
        </NavLink>
      </li>
      <li>
        <NavLink to="/expenses" style={isActiveStyle} className="nav-item">
          Expense
        </NavLink>
      </li>
      <li>
        <NavLink to="/saving" style={isActiveStyle} className="nav-item">
          Saving
        </NavLink>
      </li>
      <li>
        <NavLink to="/report" style={isActiveStyle} className="nav-item">
          Report
        </NavLink>
      </li>
    </ul>
  );
};

export { Navbar };
