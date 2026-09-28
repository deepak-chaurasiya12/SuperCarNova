import "./Home.css";
import Navbar from "../../Components/Navbar/Nav";
import heroCar from "../../assets/Images/40047.jpg";
import Footer from "../../Components/Footer/Footer";

function Home() {
  return (
    <>
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroCar})` }}
    >
      <div className="overlay"></div>

      <Navbar />

      <div className="hero-content">
        <h1>Find Your Dream Car</h1>
        <p>Buy • Sell • Compare Premium Cars</p>

        <button className="hero-btn">
          Explore Cars
        </button>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Home;