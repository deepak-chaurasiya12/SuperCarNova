import { Link } from "react-router-dom";
import {
  FaStar,
  FaTachometerAlt,
  FaGasPump,
  FaCogs,
  FaHeart,
} from "react-icons/fa";
import { useWishlist, toggleWishlist } from "../../utils/wishlist";
import "./CarCard.css";

const CarCard = ({ car }) => {
  // Shared wishlist: updates here, in the Navbar and on the Wishlist page together
  const wishlist = useWishlist();

  const isFavorite = wishlist.some(
    (savedCar) => String(savedCar.id) === String(car.id)
  );

  const handleWishlistClick = () => {
    toggleWishlist(car);
  };

  return (
    <article className="car-card">
      <div className="car-image-container">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="car-image"
        />

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFavorite}
          onClick={handleWishlistClick}
        >
          <FaHeart />
        </button>

        <span className="car-year">{car.year}</span>
      </div>

      <div className="car-card-content">
        <div className="car-title-row">
          <div>
            <span className="car-brand">{car.brand}</span>
            <h3 className="car-model">{car.model}</h3>
          </div>

          <div className="car-rating">
            <FaStar />
            <span>{car.rating}</span>
          </div>
        </div>

        <p className="car-reviews">
          {car.reviews} verified reviews
        </p>

        <div className="car-specs">
          <div className="car-spec">
            <FaTachometerAlt />
            <span>{car.mileage.toLocaleString("en-IN")} km</span>
          </div>

          <div className="car-spec">
            <FaGasPump />
            <span>{car.fuel}</span>
          </div>

          <div className="car-spec">
            <FaCogs />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="car-card-bottom">
          <div className="car-price">
            <span>Starting from</span>
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