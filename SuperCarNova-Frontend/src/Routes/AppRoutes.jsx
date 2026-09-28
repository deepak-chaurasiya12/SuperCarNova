import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "../pages/Home/Home";
import SearchCars from "../pages/SearchCars/SearchCars";
import CarDetails from "../pages/CarDetails/CarDetails";
import About from "../pages/About/About";
import Contact from "../Pages/Contact/ContactUs";

function AppRoutes (){
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/search-cars"
          element={<SearchCars />}
        />

        <Route
          path="/car-details/:id"
          element={<CarDetails />}
        />
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/Contact"
          element={<Contact />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;