import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import "./ContactUs.css";

import Navbar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ==============================
  // HANDLE INPUT CHANGES
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ==============================
  // SUBMIT CONTACT FORM
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to Node.js backend
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // ==============================
      // SUCCESS
      // ==============================

      if (response.ok) {
        alert(
          "Thank you! Your message has been submitted successfully."
        );

        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }

      // ==============================
      // BACKEND ERROR
      // ==============================

      else {
        alert(
          data.message ||
            "Failed to submit your message."
        );
      }
    }

    // ==============================
    // SERVER CONNECTION ERROR
    // ==============================

    catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      alert(
        "Unable to connect to the server. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">

        {/* ================= HERO ================= */}

        <section className="contact-hero">

          <div className="contact-hero-overlay">

            <div className="contact-hero-content">

              <span className="contact-small-title">
                CONTACT SUPERCARNOVA
              </span>

              <h1>
                Let's Talk About
                <span> Your Next Car</span>
              </h1>

              <p>
                Have a question about a vehicle or need help finding
                the right car? Our team is here to help.
              </p>

            </div>

          </div>

        </section>


        {/* ================= CONTACT INFORMATION ================= */}

        <section className="contact-info-section">

          <div className="contact-section-heading">

            <span className="contact-section-label">
              GET IN TOUCH
            </span>

            <h2>
              We'd Love To
              <span> Hear From You</span>
            </h2>

            <p>
              Whether you have a question, feedback, or simply want
              to know more about our cars, feel free to contact us.
            </p>

          </div>


          <div className="contact-info-grid">

            {/* Phone */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <FaPhoneAlt />
              </div>

              <h3>Call Us</h3>

              <p>
                +91 98765 43210
              </p>

              <span>
                Mon - Sat, 9:00 AM - 6:00 PM
              </span>

            </div>


            {/* Email */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <FaEnvelope />
              </div>

              <h3>Email Us</h3>

              <p>
                support@supercarnova.com
              </p>

              <span>
                We usually reply within 24 hours
              </span>

            </div>


            {/* Address */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <FaMapMarkerAlt />
              </div>

              <h3>Visit Us</h3>

              <p>
                New Delhi, India
              </p>

              <span>
                Visit us for more information
              </span>

            </div>


            {/* Working Hours */}

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <FaClock />
              </div>

              <h3>Working Hours</h3>

              <p>
                9:00 AM - 6:00 PM
              </p>

              <span>
                Monday - Saturday
              </span>

            </div>

          </div>

        </section>


        {/* ================= CONTACT FORM ================= */}

        <section className="contact-form-section">

          <div className="contact-form-wrapper">

            {/* Left Side */}

            <div className="contact-form-intro">

              <span className="contact-section-label">
                SEND US A MESSAGE
              </span>

              <h2>
                Have Questions?
                <span> We're Here To Help.</span>
              </h2>

              <p>
                Fill out the form and our team will get back to you
                as soon as possible.
              </p>

              <div className="contact-form-note">

                <FaEnvelope />

                <div>

                  <strong>
                    Quick Response
                  </strong>

                  <span>
                    Our team will review your message and get back
                    to you shortly.
                  </span>

                </div>

              </div>

            </div>


            {/* Right Side */}

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="subject">
                    Subject
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-group">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>


              <button
                type="button"
                className="contact-submit-button"
                 onClick={handleSubmit}
              >
                Send Message
              </button>

            </form>

          </div>

        </section>


        {/* ================= MAP ================= */}

        <section className="contact-map-section">

          <div className="contact-map">

            <div className="map-placeholder">

              <FaMapMarkerAlt />

              <h3>
                SuperCarNova
              </h3>

              <p>
                New Delhi, India
              </p>

              <span>
                Map integration can be added here later.
              </span>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="contact-cta">

          <div className="contact-cta-content">

            <span className="contact-small-title">
              FIND YOUR DREAM CAR
            </span>

            <h2>
              Your Next Adventure
              <span> Starts Here.</span>
            </h2>

            <p>
              Explore our collection of vehicles and find the one
              that is right for you.
            </p>

            <a
              href="/search-cars"
              className="contact-cta-button"
            >
              Explore Cars
            </a>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Contact;