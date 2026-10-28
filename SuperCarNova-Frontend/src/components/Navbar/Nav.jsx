import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import { useWishlist } from "../../utils/wishlist";

import "./Nav.css";

const Navbar = () => {
  // Re-renders automatically whenever a car is added to or removed from the wishlist
  const wishlist = useWishlist();
  const wishlistCount = wishlist.length;

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
          
          <li>
            <Link to="/wishlist">
              ❤️ Wishlist
              {wishlistCount > 0 && (
                <span className="wishlist-badge">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;