import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";

import "./Nav.css";

const Navbar = () => {
  return (
    <header className="navbar">

      {/* Logo */}
      <div className="logo">

        <FaCarSide className="logo-icon" />

        <h2>SuperCarNova</h2>

      </div>


      {/* Navigation */}
      <nav>

        <ul>

          <li>
            <Link to="/">
              Home
            </Link>
          </li>

          <li>
            <Link to="/search-cars">
              Search Cars
            </Link>
          </li>

          <li>
            <Link to="/about">
              About
            </Link>
          </li>

          <li>
            <Link to="/Contact">
              Contact
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;