import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Nav";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";
import CarCard from "../../components/CarCard/CarCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";

import "./SearchCars.css";
import cars from "../../data/cars";

function SearchCars() {
  // ==========================================
  // SEARCH STATE
  // ==========================================

  const [searchTerm, setSearchTerm] = useState("");


  // ==========================================
  // FILTER STATE
  // ==========================================

  const [filters, setFilters] = useState({
    brand: [],
    minPrice: "",
    maxPrice: "",
    year: "",
    fuel: "",
    transmission: "",
    bodyType: "",
    rating: "",
  });


  // ==========================================
  // SORT STATE
  // ==========================================

  const [sortOption, setSortOption] = useState("featured");


  // ==========================================
  // PAGINATION STATE
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);

  const carsPerPage = 4;


  // ==========================================
  // RESET PAGE WHEN SEARCH/FILTER/SORT CHANGES
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortOption]);


  // ==========================================
  // FILTER CARS
  // ==========================================

  const filteredCars = cars.filter((car) => {
    // Search
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      car.brand.toLowerCase().includes(search) ||
      car.model.toLowerCase().includes(search);


    // Brand
    const matchesBrand =
      filters.brand.length === 0 ||
      filters.brand.includes(car.brand);


    // Minimum Price
    const matchesMinPrice =
      !filters.minPrice ||
      car.price >= Number(filters.minPrice);


    // Maximum Price
    const matchesMaxPrice =
      !filters.maxPrice ||
      car.price <= Number(filters.maxPrice);


    // Year
    const matchesYear =
      !filters.year ||
      car.year === Number(filters.year);


    // Fuel Type
    const matchesFuel =
      !filters.fuel ||
      car.fuel === filters.fuel;


    // Transmission
    const matchesTransmission =
      !filters.transmission ||
      car.transmission === filters.transmission;


    // Body Type
    const matchesBodyType =
      !filters.bodyType ||
      car.bodyType === filters.bodyType;


    // Rating
    const matchesRating =
      !filters.rating ||
      car.rating >= Number(filters.rating);


    // Final filtering result
    return (
      matchesSearch &&
      matchesBrand &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesYear &&
      matchesFuel &&
      matchesTransmission &&
      matchesBodyType &&
      matchesRating
    );
  });


  // ==========================================
  // SORT CARS
  // ==========================================

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return b.year - a.year;

      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "rating":
        return b.rating - a.rating;

      case "featured":
      default:
        return a.id - b.id;
    }
  });


  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(
    sortedCars.length / carsPerPage
  );

  const startIndex =
    (currentPage - 1) * carsPerPage;

  const endIndex =
    startIndex + carsPerPage;

  const currentCars =
    sortedCars.slice(startIndex, endIndex);


  // ==========================================
  // CLEAR ALL FILTERS
  // ==========================================

  const handleClearFilters = () => {
    setFilters({
      brand: [],
      minPrice: "",
      maxPrice: "",
      year: "",
      fuel: "",
      transmission: "",
      bodyType: "",
      rating: "",
    });
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

              {currentCars.length > 0 ? (

                currentCars.map((car) => (

                  <CarCard
                    key={car.id}
                    car={car}
                  />

                ))

              ) : (

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