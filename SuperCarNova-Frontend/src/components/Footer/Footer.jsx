import { Link } from "react-router-dom";
import { FaCarSide, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <FaCarSide className="footer-logo-icon" />
            <span>SuperCarNova</span>
          </Link>

          <p className="footer-description">
            Your destination for premium cars, exceptional
            service and a smarter way to find your dream car.
          </p>

          {/* Social Media */}
          <div className="footer-socials">

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

          </div>

        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/search-cars">Search Cars</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

          </ul>

        </div>


        {/* Services */}
        <div className="footer-column">

          <h3>Our Services</h3>

          <ul>

            <li>
              <Link to="/search-cars">Buy a Car</Link>
            </li>

            <li>
              <Link to="/sell-car">Sell Your Car</Link>
            </li>

            <li>
              <Link to="/compare">Compare Cars</Link>
            </li>

            <li>
              <Link to="/financing">Car Financing</Link>
            </li>

          </ul>

        </div>


        {/* Contact */}
        <div className="footer-column footer-contact">

          <h3>Contact Us</h3>

          <p>
            <strong>Email</strong>
            <br />
            support@supercarnova.com
          </p>

          <p>
            <strong>Phone</strong>
            <br />
            +91 98765 43210
          </p>

          <p>
            <strong>Location</strong>
            <br />
            New Delhi, India
          </p>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} SuperCarNova. All rights reserved.
        </p>

        <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;