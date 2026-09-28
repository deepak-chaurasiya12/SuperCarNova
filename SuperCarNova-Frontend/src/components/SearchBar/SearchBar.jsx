import "./SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm }) {

  const handleSearch = () => {
    setSearchTerm(searchTerm.trim());
  };

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleSearch();
    }

  };


  return (
    <div className="search-bar">

      <div className="search-input-wrapper">

        <input
          type="text"
          placeholder="Search by brand, model or keyword..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyDown}
        />

      </div>


      <button
        type="button"
        className="search-button"
        onClick={handleSearch}
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;