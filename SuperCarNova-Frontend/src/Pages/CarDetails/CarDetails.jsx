
import { useEffect, useState } from "react";
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

import { getCarById, getSimilarCars } from "../../services/carsApi";
import { getCarImage } from "../../utils/getCarImage";

import "./CarDetails.css";

// Five images for each car.
// You can change these filenames whenever you want.
const carGallery = {
  Lamborghini: [
    "Car4.jpg",
    "Car5.jpg",
    "Car6.jpg",
    "Car7.jpg",
    "Car8.jpg",
  ],

  BMW: [
    "Car9.jpg",
    "Car10.jpg",
    "Car11.jpg",
    "Car12.jpg",
    "Car13.jpg",
  ],

  Mercedes: [
    "Car14.jpg",
    "Car15.jpg",
    "Car16.jpg",
    "Car17.jpg",
    "Car18.jpg",
  ],

  Audi: [
    "Car19.jpg",
    "Car20.jpg",
    "Car21.jpg",
    "Car22.jpg",
    "Car23.jpg",
  ],

  Porsche: [
    "Car20.jpg",
    "Car21.jpg",
    "Car22.jpg",
    "Car23.jpg",
    "Car24.jpg",
  ],

  "Range Rover": [
    "Car20.jpg",
    "Car21.jpg",
    "Car22.jpg",
    "Car23.jpg",
    "Car24.jpg",
  ],
};

function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  /* Load car details from API */
  useEffect(() => {
    let ignore = false;

    const loadCar = async () => {
      setLoading(true);
      setError("");
      setActiveImage(0);

      try {
        const [carResponse, similarResponse] = await Promise.all([
          getCarById(id),
          getSimilarCars(id).catch(() => ({ data: [] })),
        ]);

        if (!ignore) {
          setCar(carResponse.data);
          setSimilarCars(similarResponse.data || []);
        }
      } catch (err) {
        if (!ignore) {
          setCar(null);
          setSimilarCars([]);
          setError(err.message || "Unable to load car details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadCar();
    window.scrollTo(0, 0);

    return () => {
      ignore = true;
    };
  }, [id]);

  /* Automatically change the image every 3 seconds */
  useEffect(() => {
    if (!car) return;

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % 5);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [car]);

  /* Loading */
  if (loading) {
    return (
      <div className="car-not-found">
        <Navbar />

        <div className="not-found-content">
          <h1>Loading...</h1>
        </div>

        <Footer />
      </div>
    );
  }

  /* Car not found */
  if (!car) {
    return (
      <div className="car-not-found">
        <Navbar />

        <div className="not-found-content">
          <h1>Car Not Found</h1>

          <p>
            {error || "The car you are looking for does not exist."}
          </p>

          <Link to="/search-cars" className="back-cars-btn">
            Browse Cars
          </Link>
        </div>

        <Footer />
      </div>
    );
  }

  /* Find the gallery according to the car brand */
  const brandName = String(car.brand || "").toLowerCase();

  let galleryFiles = [];

  if (brandName.includes("lamborghini")) {
    galleryFiles = carGallery.Lamborghini;
  } else if (brandName.includes("bmw")) {
    galleryFiles = carGallery.BMW;
  } else if (brandName.includes("mercedes")) {
    galleryFiles = carGallery.Mercedes;
  } else if (brandName.includes("audi")) {
    galleryFiles = carGallery.Audi;
  } else if (brandName.includes("porsche")) {
    galleryFiles = carGallery.Porsche;
  } else if (brandName.includes("range rover")) {
    galleryFiles = carGallery["Range Rover"];
  }

  /* Resolve image filenames to imported image URLs */
  const galleryImages = galleryFiles
    .map((fileName) => getCarImage(fileName))
    .filter(Boolean);

  /* Use the original car image if gallery images are unavailable */
  const currentImage =
    galleryImages.length > 0
      ? galleryImages[activeImage % galleryImages.length]
      : getCarImage(car.image);

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  return (
    <div className="car-details-page">
      <Navbar />

      <div className="details-container">
        {/* Back button */}
        <Link to="/search-cars" className="back-link">
          <FaArrowLeft />
          Back to Cars
        </Link>

        {/* Main car details */}
        <section className="car-details-main">
          {/* Car image gallery */}
          <div className="car-image-container">
            <img
              src={currentImage}
              alt={`${car.brand} ${car.model}`}
              className="car-details-image"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getCarImage(car.image);
              }}
            />

            {/* Image navigation dots */}
            <div className="gallery-dots">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  className={`gallery-dot ${
                    activeImage === index ? "active" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Car information */}
          <div className="car-details-info">
            <span className="car-brand">{car.brand}</span>

            <h1>{car.model}</h1>

            {/* Rating */}
            <div className="car-rating">
              <FaStar />

              <span>{car.rating}</span>

              <span className="review-count">
                ({car.reviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="car-price">
              ₹{formatPrice(car.price)}
            </div>

            <p className="car-short-description">
              {car.description}
            </p>

            {/* Quick specifications */}
            <div className="quick-specs">
              <div className="quick-spec">
                <FaCalendarAlt />

                <div>
                  <span>Year</span>
                  <strong>{car.year}</strong>
                </div>
              </div>

              <div className="quick-spec">
                <FaTachometerAlt />

                <div>
                  <span>Mileage</span>

                  <strong>
                    {Number(car.mileage || 0).toLocaleString()} km
                  </strong>
                </div>
              </div>

              <div className="quick-spec">
                <FaGasPump />

                <div>
                  <span>Fuel</span>
                  <strong>{car.fuel}</strong>
                </div>
              </div>

              <div className="quick-spec">
                <FaCogs />

                <div>
                  <span>Transmission</span>
                  <strong>{car.transmission}</strong>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="details-actions">
              <button
                className="contact-dealer-btn"
                onClick={() => {
                  window.location.href = "tel:+910000000000";
                }}
              >
                <FaPhone />
                Contact Dealer
              </button>

              <button
                className="test-drive-btn"
                onClick={() =>
                  window.alert("Test drive booking coming soon!")
                }
              >
                Schedule Test Drive
              </button>
            </div>
          </div>
        </section>

        {/* Vehicle specifications */}
        <section className="vehicle-specifications">
          <div className="section-heading">
            <span>VEHICLE INFORMATION</span>
            <h2>Vehicle Specifications</h2>
          </div>

          <div className="specifications-grid">
            <div className="specification">
              <FaCarSide />

              <div>
                <span>Model</span>
                <strong>{car.model}</strong>
              </div>
            </div>

            <div className="specification">
              <FaCalendarAlt />

              <div>
                <span>Model Year</span>
                <strong>{car.year}</strong>
              </div>
            </div>

            <div className="specification">
              <FaTachometerAlt />

              <div>
                <span>Mileage</span>

                <strong>
                  {Number(car.mileage || 0).toLocaleString()} km
                </strong>
              </div>
            </div>

            <div className="specification">
              <FaGasPump />

              <div>
                <span>Fuel Type</span>
                <strong>{car.fuel}</strong>
              </div>
            </div>

            <div className="specification">
              <FaCogs />

              <div>
                <span>Engine</span>
                <strong>{car.engine}</strong>
              </div>
            </div>

            <div className="specification">
              <FaCogs />

              <div>
                <span>Power</span>
                <strong>{car.power}</strong>
              </div>
            </div>

            <div className="specification">
              <FaPalette />

              <div>
                <span>Exterior Color</span>
                <strong>{car.color}</strong>
              </div>
            </div>

            <div className="specification">
              <FaCarSide />

              <div>
                <span>Body Type</span>
                <strong>{car.bodyType}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="description-section">
          <div className="section-heading">
            <span>ABOUT THE VEHICLE</span>
            <h2>Description</h2>
          </div>

          <p>{car.description}</p>
        </section>

        {/* Similar cars */}
        {similarCars.length > 0 && (
          <section className="similar-cars">
            <div className="section-heading">
              <span>YOU MAY ALSO LIKE</span>
              <h2>Similar Cars</h2>
            </div>

            <div className="similar-cars-grid">
              {similarCars.map((item) => (
                <Link
                  key={item._id}
                  to={`/car-details/${item._id}`}
                  className="similar-car-card"
                >
                  <img
                    src={getCarImage(item.image)}
                    alt={`${item.brand} ${item.model}`}
                  />

                  <div className="similar-car-info">
                    <span>{item.brand}</span>
                    <h3>{item.model}</h3>

                    <strong>
                      ₹{formatPrice(item.price)}
                    </strong>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CarDetails;
