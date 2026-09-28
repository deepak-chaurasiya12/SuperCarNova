import { Link } from "react-router-dom";
import {
  FaStar,
  FaTachometerAlt,
  FaGasPump,
  FaCogs,
  FaHeart,
} from "react-icons/fa";

import "./CarCard.css";


const CarCard = ({ car }) => {

  return (

    <article className="car-card">

      {/* Car Image */}
      <div className="car-image-container">

        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="car-image"
        />

        <button
          className="favorite-btn"
          aria-label="Add to favorites"
        >
          <FaHeart />
        </button>

        <span className="car-year">
          {car.year}
        </span>

      </div>


      {/* Car Information */}
      <div className="car-card-content">

        {/* Brand + Model */}
        <div className="car-title-row">

          <div>

            <span className="car-brand">
              {car.brand}
            </span>

            <h3 className="car-model">
              {car.model}
            </h3>

          </div>

          <div className="car-rating">

            <FaStar />

            <span>
              {car.rating}
            </span>

          </div>

        </div>


        {/* Reviews */}
        <p className="car-reviews">
          {car.reviews} verified reviews
        </p>


        {/* Car Specifications */}
        <div className="car-specs">

          <div className="car-spec">

            <FaTachometerAlt />

            <span>
              {car.mileage.toLocaleString("en-IN")} km
            </span>

          </div>


          <div className="car-spec">

            <FaGasPump />

            <span>
              {car.fuel}
            </span>

          </div>


          <div className="car-spec">

            <FaCogs />

            <span>
              {car.transmission}
            </span>

          </div>

        </div>


        {/* Bottom Section */}
        <div className="car-card-bottom">

          <div className="car-price">

            <span>
              Starting from
            </span>

            <strong>
              ₹{car.price.toLocaleString("en-IN")}
            </strong>

          </div>


          <Link
            to={`/car-details/${car.id}`}
            className="details-btn"
          >
            View Details
          </Link>

        </div>

      </div>

    </article>

  );
};


export default CarCard;