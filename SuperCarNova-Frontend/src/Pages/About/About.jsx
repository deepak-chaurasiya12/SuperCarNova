import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import { FaCarSide, FaShieldAlt, FaTags, FaHeadset } from "react-icons/fa";
import Navbar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <div className="about-page">
        <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <span className="about-subtitle">ABOUT SUPERCARNOVA</span>

            <h1>
              Your Journey Starts
              <span> With the Right Car</span>
            </h1>

            <p>
              We make buying your dream car simple, transparent, and
              enjoyable. Discover quality vehicles and find the perfect
              car for your journey.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-intro">
        <div className="about-intro-image">
          <img
            src="/images/about-car.jpg"
            alt="Luxury car"
          />
        </div>

        <div className="about-intro-content">
          <span className="section-label">WHO WE ARE</span>

          <h2>
            More Than Just a
            <span> Car Website</span>
          </h2>

          <p>
            SuperCarNova is a modern car marketplace created for people
            who are passionate about finding the right vehicle. We bring
            together a wide range of cars and provide an easy way for
            customers to explore, compare, and choose their next car.
          </p>

          <p>
            Our goal is to make the car-buying experience convenient,
            reliable, and transparent. Whether you are looking for a
            powerful performance car, a comfortable family vehicle, or
            your everyday ride, we are here to help you find it.
          </p>

          <Link to="/search-cars" className="about-button">
            Explore Our Cars
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="about-features">
        <div className="section-heading">
          <span className="section-label">WHY SUPERCARNOVA</span>

          <h2>
            Everything You Need To Find
            <span> Your Perfect Car</span>
          </h2>

          <p>
            We focus on making every step of your car search easier.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <FaCarSide />
            </div>

            <h3>Wide Selection</h3>

            <p>
              Explore a variety of cars from different models, years,
              and price ranges.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>

            <h3>Trusted Vehicles</h3>

            <p>
              We aim to provide reliable vehicle information so you can
              make confident decisions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaTags />
            </div>

            <h3>Fair Pricing</h3>

            <p>
              Find vehicles across different budgets with clear and
              straightforward pricing.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaHeadset />
            </div>

            <h3>Customer Support</h3>

            <p>
              Our team is here to assist you throughout your car-search
              journey.
            </p>
          </div>

        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="mission-content">
          <span className="section-label">OUR MISSION</span>

          <h2>
            Making Car Buying
            <span> Simple & Exciting</span>
          </h2>

          <p>
            At SuperCarNova, we believe finding a car should be an
            exciting experience rather than a complicated process.
            We are building a platform where technology, great cars,
            and customer experience come together.
          </p>

          <div className="mission-stats">
            <div>
              <strong>100+</strong>
              <span>Cars Listed</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Car Models</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>
      </section>
    <Footer/>

    </div>
  );
};

export default About;