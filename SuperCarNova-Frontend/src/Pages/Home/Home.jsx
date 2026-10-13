import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../../Components/Navbar/Nav";
import Footer from "../../Components/Footer/Footer";
import heroCar from "../../assets/Images/Car1.jpg";
import { getCars } from "../../services/carsApi";
import { getCarImage } from "../../utils/getCarImage";

function Home() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load the 3 top-rated cars from the database
  useEffect(() => {
    let ignore = false;

    const loadFeaturedCars = async () => {
      try {
        const response = await getCars({ limit: 3, sort: "rating-desc" });

        if (!ignore) {
          setFeaturedCars(response.data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadFeaturedCars();

    // Prevents state updates if the user leaves the page mid-request
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroCar})` }}
      >
        <div className="overlay"></div>

        <Navbar />

        <div className="hero-content">
          <h1>Find Your Dream Car</h1>
          <p>Buy • Sell • Compare Premium Cars</p>

          <Link to="/search-cars" className="hero-btn">
            Explore Cars
          </Link>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars">
        <div className="featured-heading">
          <span>FEATURED CARS</span>
          <h2>Handpicked For You</h2>
        </div>

        {loading && <p className="featured-message">Loading cars...</p>}

        {!loading && error && (
          <p className="featured-message">{error}</p>
        )}

        {!loading && !error && featuredCars.length === 0 && (
          <p className="featured-message">No cars available right now.</p>
        )}

        {!loading && !error && featuredCars.length > 0 && (
          <div className="featured-grid">
            {featuredCars.map((car) => (
              <Link
                key={car._id}
                to={`/car/${car._id}`}
                className="featured-card"
              >
                <img
                  src={getCarImage(car.image)}
                  alt={`${car.brand} ${car.model}`}
                />

                <div className="featured-card-info">
                  <span className="featured-brand">{car.brand}</span>
                  <h3>{car.model}</h3>

                  <div className="featured-meta">
                    <span>{car.year}</span>
                    <span>{car.fuel}</span>
                    <span>{car.transmission}</span>
                  </div>

                  <strong className="featured-price">
                    ₹{car.price.toLocaleString("en-IN")}
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="featured-footer">
          <Link to="/search-cars" className="view-all-btn">
            View All Cars
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;