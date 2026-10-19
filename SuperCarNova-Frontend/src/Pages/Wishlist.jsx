
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import "./Wishlist.css";

const Wishlist = () => {
  const [cars, setCars] = useState([]);

  const loadWishlist = () => {
    const savedCars = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    setCars(savedCars);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  return (
    <div className="wishlist-page">
      <h1><FaHeart /> My Wishlist</h1>
      <p>Your favourite cars in one place.</p>

      {cars.length === 0 ? (
        <div className="wishlist-empty">
          <FaHeart />
          <h2>Your wishlist is empty</h2>
          <p>Explore cars and click the heart to save your favourites.</p>
          <Link to="/" className="wishlist-browse-btn">
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {cars.map((car) => (
            <article className="wishlist-card" key={car.id}>
              <img src={car.image} alt={`${car.brand} ${car.model}`} />

              <div className="wishlist-card-info">
                <h3>{car.brand} {car.model}</h3>
                <p>{car.year} · {car.fuel}</p>
                <strong>
                  ₹{Number(car.price).toLocaleString("en-IN")}
                </strong>

                <div className="wishlist-actions">
                  <Link
                    to={`/car-details/${car.id}`}
                    className="wishlist-details-btn"
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeCar(car.id)}
                    aria-label="Remove from wishlist"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
