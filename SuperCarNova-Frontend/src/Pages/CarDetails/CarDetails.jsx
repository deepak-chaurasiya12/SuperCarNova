import { useParams, Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaStar,
  FaGasPump,
  FaTachometerAlt,
  FaCogs,
  FaCarSide,
  FaCalendarAlt,
  FaPalette,
  FaPhone,
} from "react-icons/fa";

import Navbar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";

import cars from "../../data/cars";

import "./CarDetails.css";


function CarDetails() {

  const { id } = useParams();

  const car = cars.find(
    (item) => item.id === Number(id)
  );


  /* Car not found */
  if (!car) {
    return (

      <div className="car-not-found">

        <Navbar />

        <div className="not-found-content">

          <h1>
            Car Not Found
          </h1>

          <p>
            The car you are looking for does not exist.
          </p>

          <Link
            to="/search-cars"
            className="back-cars-btn"
          >
            Browse Cars
          </Link>

        </div>

        <Footer />

      </div>

    );
  }


  return (

    <div className="car-details-page">

      {/* Navigation */}
      <Navbar />


      {/* Back Button */}
      <div className="details-container">

        <Link
          to="/search-cars"
          className="back-link"
        >

          <FaArrowLeft />

          Back to Cars

        </Link>


        {/* Main Details */}
        <section className="car-details-main">


          {/* Car Image */}
          <div className="car-image-container">

            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="car-details-image"
            />

          </div>


          {/* Car Information */}
          <div className="car-details-info">


            <span className="car-brand">
              {car.brand}
            </span>


            <h1>
              {car.model}
            </h1>


            {/* Rating */}
            <div className="car-rating">

              <FaStar />

              <span>
                {car.rating}
              </span>

              <span className="review-count">
                ({car.reviews} Reviews)
              </span>

            </div>


            {/* Price */}
            <div className="car-price">

              ₹{car.price.toLocaleString("en-IN")}

            </div>


            <p className="car-short-description">
              {car.description}
            </p>


            {/* Quick Specifications */}
            <div className="quick-specs">


              <div className="quick-spec">

                <FaCalendarAlt />

                <div>

                  <span>
                    Year
                  </span>

                  <strong>
                    {car.year}
                  </strong>

                </div>

              </div>


              <div className="quick-spec">

                <FaTachometerAlt />

                <div>

                  <span>
                    Mileage
                  </span>

                  <strong>
                    {car.mileage.toLocaleString()} km
                  </strong>

                </div>

              </div>


              <div className="quick-spec">

                <FaGasPump />

                <div>

                  <span>
                    Fuel
                  </span>

                  <strong>
                    {car.fuel}
                  </strong>

                </div>

              </div>


              <div className="quick-spec">

                <FaCogs />

                <div>

                  <span>
                    Transmission
                  </span>

                  <strong>
                    {car.transmission}
                  </strong>

                </div>

              </div>


            </div>


            {/* Actions */}
            <div className="details-actions">

              <button className="contact-dealer-btn">

                <FaPhone />

                Contact Dealer

              </button>


              <button className="test-drive-btn">

                Schedule Test Drive

              </button>

            </div>

          </div>

        </section>


        {/* Vehicle Specifications */}
        <section className="vehicle-specifications">

          <div className="section-heading">

            <span>
              VEHICLE INFORMATION
            </span>

            <h2>
              Vehicle Specifications
            </h2>

          </div>


          <div className="specifications-grid">


            <div className="specification">

              <FaCarSide />

              <div>

                <span>
                  Model
                </span>

                <strong>
                  {car.model}
                </strong>

              </div>

            </div>


            <div className="specification">

              <FaCalendarAlt />

              <div>

                <span>
                  Model Year
                </span>

                <strong>
                  {car.year}
                </strong>

              </div>

            </div>


            <div className="specification">

              <FaTachometerAlt />

              <div>

                <span>
                  Mileage
                </span>

                <strong>
                  {car.mileage.toLocaleString()} km
                </strong>

              </div>

            </div>


            <div className="specification">

              <FaGasPump />

              <div>

                <span>
                  Fuel Type
                </span>

                <strong>
                  {car.fuel}
                </strong>

              </div>

            </div>


            <div className="specification">

              <FaCogs />

              <div>

                <span>
                  Engine
                </span>

                <strong>
                  {car.engine}
                </strong>

              </div>

            </div>


            <div className="specification">

              <FaCogs />

              <div>

                <span>
                  Power
                </span>

                <strong>
                  {car.power}
                </strong>

              </div>

            </div>


            <div className="specification">

              <FaPalette />

              <div>

                <span>
                  Exterior Color
                </span>

                <strong>
                  {car.color}
                </strong>

              </div>

            </div>


            <div className="specification">

              <FaCarSide />

              <div>

                <span>
                  Body Type
                </span>

                <strong>
                  {car.bodyType}
                </strong>

              </div>

            </div>


          </div>

        </section>


        {/* Description */}
        <section className="description-section">

          <div className="section-heading">

            <span>
              ABOUT THE VEHICLE
            </span>

            <h2>
              Description
            </h2>

          </div>


          <p>
            {car.description}
          </p>

        </section>


        {/* Similar Cars */}
        <section className="similar-cars">

          <div className="section-heading">

            <span>
              YOU MAY ALSO LIKE
            </span>

            <h2>
              Similar Cars
            </h2>

          </div>


          <div className="similar-cars-grid">

            {cars
              .filter((item) => item.id !== car.id)
              .slice(0, 3)
              .map((item) => (

                <Link
                  key={item.id}
                  to={`/car/${item.id}`}
                  className="similar-car-card"
                >

                  <img
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                  />

                  <div className="similar-car-info">

                    <span>
                      {item.brand}
                    </span>

                    <h3>
                      {item.model}
                    </h3>

                    <strong>
                      ₹{item.price.toLocaleString("en-IN")}
                    </strong>

                  </div>

                </Link>

              ))}

          </div>

        </section>

      </div>


      {/* Footer */}
      <Footer />

    </div>
  );
}

export default CarDetails;