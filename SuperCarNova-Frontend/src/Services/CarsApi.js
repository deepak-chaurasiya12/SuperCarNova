// Base URL of your backend.
// Add VITE_API_URL=http://localhost:5000 to your frontend .env file
// (when you deploy, set it to your live backend URL).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  const json = await response.json().catch(() => ({}));

  if (!response.ok || json.success === false) {
    throw new Error(json.message || "Something went wrong. Please try again.");
  }

  return json;
}

/*
  getCars({ search, brand, fuel, transmission, bodyType, color,
            minPrice, maxPrice, minYear, maxYear, maxMileage,
            sort, page, limit })
  Empty values are skipped automatically.
  Returns { success, total, count, page, pages, data }
*/
export function getCars(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  return request(`/api/cars?${query.toString()}`);
}

// Returns { success, data: car }
export function getCarById(id) {
  return request(`/api/cars/${id}`);
}

// Returns { success, data: [car, car, car] }
export function getSimilarCars(id) {
  return request(`/api/cars/${id}/similar`);
}

// Returns { success, data: { brands, fuels, transmissions, bodyTypes, colors, minPrice, maxPrice } }
export function getFilterOptions() {
  return request("/api/cars/filters");
}