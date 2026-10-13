import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";
import CarCard from "../../components/CarCard/CarCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";

import { getCars } from "../../services/carsApi";
import { getCarImage } from "../../utils/getCarImage";

import "./SearchCars.css";

// Cars shown on each page
const CARS_PER_PAGE = 4;

// Sort dropdown value -> sort option understood by the API
const SORT_MAP = {
  featured: "featured",
  newest: "year-desc",
  "price-low": "price-asc",
  "price-high": "price-desc",
  rating: "rating-desc",
};

const EMPTY_FILTERS = {
  brand: [],
  minPrice: "",
  maxPrice: "",
  year: "",
  fuel: "",
  transmission: "",
  bodyType: "",
  rating: "",
};

function SearchCars() {
  // ==========================================
  // SEARCH STATE
  // ==========================================

  const [searchTerm, setSearchTerm] = useState("");


  // ==========================================
  // FILTER STATE
  // ==========================================

  const [filters, setFilters] = useState(EMPTY_FILTERS);


  // ==========================================
  // SORT STATE
  // ==========================================

  const [sortOption, setSortOption] = useState("featured");


  // ==========================================
  // PAGINATION STATE
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);


  // ==========================================
  // DATA STATE (comes from the database)
  // ==========================================

  const [cars, setCars] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // RESET PAGE WHEN SEARCH/FILTER/SORT CHANGES
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortOption]);


  // ==========================================
  // LOAD CARS FROM THE API
  // Waits 300ms after the last change, so typing
  // does not send a request for every keystroke.
  // ==========================================

  useEffect(() => {
    let ignore = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getCars({
          search: searchTerm.trim(),
          brand: filters.brand.join(","),
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          minYear: filters.year,
          maxYear: filters.year,
          fuel: filters.fuel,
          transmission: filters.transmission,
          bodyType: filters.bodyType,
          minRating: filters.rating,
          sort: SORT_MAP[sortOption] || "featured",
          page: currentPage,
          limit: CARS_PER_PAGE,
        });

        if (!ignore) {
          setCars(response.data);
          setTotalPages(response.pages);
        }
      } catch (err) {
        if (!ignore) {
          setCars([]);
          setTotalPages(0);
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }, 300);

    // Cancels the old request when something changes again
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [searchTerm, filters, sortOption, currentPage]);


  // ==========================================
  // SEARCH BUTTON / ENTER KEY
  // (results already update as you type)
  // ==========================================

  const handleSearch = () => {
    setCurrentPage(1);
  };


  // ==========================================
  // CLEAR ALL FILTERS
  // ==========================================

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
  };


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="search-cars-page">

      {/* =====================================
          NAVBAR
      ===================================== */}

      <Navbar />


      {/* =====================================
          SEARCH HERO
      ===================================== */}

      <section className="search-hero">

        <div className="search-hero-content">

          <span className="search-eyebrow">
            EXPLORE OUR COLLECTION
          </span>

          <h1>
            Find Your Perfect Car
          </h1>

          <p>
            Discover premium cars that match your style,
            budget and lifestyle.
          </p>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />

        </div>

      </section>


      {/* =====================================
          CARS SECTION
      ===================================== */}

      <section className="cars-section">

        {/* ===================================
            SECTION HEADER
        =================================== */}

        <div className="cars-section-header">

          <div>

            <span className="section-label">
              OUR COLLECTION
            </span>

            <h2>
              Available Cars
            </h2>

          </div>


          {/* =================================
              SORT
          ================================= */}

          <div className="sort-container">

            <label htmlFor="sort">
              Sort By
            </label>

            <select
              id="sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
            >

              <option value="featured">
                Featured
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

            </select>

          </div>

        </div>


        {/* ===================================
            CARS LAYOUT
        =================================== */}

        <div className="cars-layout">

          {/* =================================
              FILTER SIDEBAR
          ================================= */}

          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onClearFilters={handleClearFilters}
          />


          {/* =================================
              CARS CONTENT
          ================================= */}

          <div className="cars-content">

            {/* =================================
                CARS GRID
            ================================= */}

            <div className="cars-grid">

              {/* Error */}
              {error && (

                <div className="no-results">

                  <h3>
                    Something Went Wrong
                  </h3>

                  <p>
                    {error}
                  </p>

                </div>

              )}


              {/* Loading (first load) */}
              {!error && loading && cars.length === 0 && (

                <div className="no-results">

                  <h3>
                    Loading Cars...
                  </h3>

                </div>

              )}


              {/* No results */}
              {!error && !loading && cars.length === 0 && (

                <div className="no-results">

                  <h3>
                    No Cars Found
                  </h3>

                  <p>
                    We couldn't find any cars matching
                    your criteria.
                  </p>

                </div>

              )}


              {/* Cars
                  id and image are converted so CarCard works
                  without any changes: id -> database _id,
                  image -> the real image from src/assets/Images */}
              {!error && cars.map((car) => (

                <CarCard
                  key={car._id}
                  car={{
                    ...car,
                    id: car._id,
                    image: getCarImage(car.image),
                  }}
                />

              ))}

            </div>


            {/* =================================
                PAGINATION
            ================================= */}

            {totalPages > 1 && (

              <div className="pagination">

                {/* Previous Button */}

                <button
                  type="button"
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                  Previous
                </button>


                {/* Page Numbers */}

                <div className="pagination-pages">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (

                    <button
                      type="button"
                      key={page}
                      className={`pagination-page ${
                        currentPage === page
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                    >
                      {page}
                    </button>

                  ))}

                </div>


                {/* Next Button */}

                <button
                  type="button"
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
                  Next
                </button>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================
          FOOTER
      ===================================== */}

      <Footer />

    </div>
  );
}

export default SearchCars;