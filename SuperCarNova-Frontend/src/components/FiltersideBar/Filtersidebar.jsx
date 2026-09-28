import "./FilterSidebar.css";

function FilterSidebar({
  filters,
  setFilters,
  onClearFilters,
}) {

  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brand:
        prev.brand.includes(brand)
          ? prev.brand.filter((item) => item !== brand)
          : [...prev.brand, brand],
    }));
  };


  const handleFuelChange = (fuel) => {
    setFilters((prev) => ({
      ...prev,
      fuel:
        prev.fuel === fuel
          ? ""
          : fuel,
    }));
  };


  const handleTransmissionChange = (transmission) => {
    setFilters((prev) => ({
      ...prev,
      transmission:
        prev.transmission === transmission
          ? ""
          : transmission,
    }));
  };


  const handleBodyTypeChange = (bodyType) => {
    setFilters((prev) => ({
      ...prev,
      bodyType:
        prev.bodyType === bodyType
          ? ""
          : bodyType,
    }));
  };


  return (
    <aside className="filter-sidebar">

      {/* Header */}
      <div className="filter-header">

        <h3>
          Filters
        </h3>

        <button
          type="button"
          onClick={onClearFilters}
        >
          Clear All
        </button>

      </div>


      {/* Brand */}
      <div className="filter-group">

        <h4>
          Brand
        </h4>

        <div className="filter-options">

          {[
            "Lamborghini",
            "BMW",
            "Mercedes-Benz",
            "Audi",
            "Porsche",
            "Range Rover",
          ].map((brand) => (

            <label
              className="filter-checkbox"
              key={brand}
            >

              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />

              <span>
                {brand}
              </span>

            </label>

          ))}

        </div>

      </div>


      {/* Price */}
      <div className="filter-group">

        <h4>
          Price Range
        </h4>

        <div className="price-inputs">

          <div className="price-input">

            <span>
              ₹
            </span>

            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: event.target.value,
                }))
              }
            />

          </div>


          <span className="price-separator">
            -
          </span>


          <div className="price-input">

            <span>
              ₹
            </span>

            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: event.target.value,
                }))
              }
            />

          </div>

        </div>

      </div>


      {/* Year */}
      <div className="filter-group">

        <h4>
          Year
        </h4>

        <select
          value={filters.year}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              year: event.target.value,
            }))
          }
        >

          <option value="">
            Any Year
          </option>

          <option value="2024">
            2024
          </option>

          <option value="2023">
            2023
          </option>

          <option value="2022">
            2022
          </option>

          <option value="2021">
            2021
          </option>

          <option value="2020">
            2020
          </option>

        </select>

      </div>


      {/* Fuel */}
      <div className="filter-group">

        <h4>
          Fuel Type
        </h4>

        <div className="filter-options">

          {["Petrol", "Diesel"].map((fuel) => (

            <label
              className="filter-radio"
              key={fuel}
            >

              <input
                type="radio"
                name="fuel"
                checked={filters.fuel === fuel}
                onChange={() => handleFuelChange(fuel)}
              />

              <span>
                {fuel}
              </span>

            </label>

          ))}

        </div>

      </div>


      {/* Transmission */}
      <div className="filter-group">

        <h4>
          Transmission
        </h4>

        <div className="filter-options">

          {["Automatic", "Manual"].map((transmission) => (

            <label
              className="filter-radio"
              key={transmission}
            >

              <input
                type="radio"
                name="transmission"
                checked={
                  filters.transmission === transmission
                }
                onChange={() =>
                  handleTransmissionChange(transmission)
                }
              />

              <span>
                {transmission}
              </span>

            </label>

          ))}

        </div>

      </div>


      {/* Body Type */}
      <div className="filter-group">

        <h4>
          Body Type
        </h4>

        <div className="filter-options">

          {["Coupe", "SUV", "Sportback"].map((bodyType) => (

            <label
              className="filter-radio"
              key={bodyType}
            >

              <input
                type="radio"
                name="bodyType"
                checked={filters.bodyType === bodyType}
                onChange={() =>
                  handleBodyTypeChange(bodyType)
                }
              />

              <span>
                {bodyType}
              </span>

            </label>

          ))}

        </div>

      </div>


      {/* Rating */}
      <div className="filter-group">

        <h4>
          Rating
        </h4>

        <select
          value={filters.rating}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              rating: event.target.value,
            }))
          }
        >

          <option value="">
            Any Rating
          </option>

          <option value="4.5">
            ⭐ 4.5 & above
          </option>

          <option value="4">
            ⭐ 4.0 & above
          </option>

          <option value="3.5">
            ⭐ 3.5 & above
          </option>

        </select>

      </div>

    </aside>
  );
}

export default FilterSidebar;