import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid.jsx";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [selectedGenre, setSelectedGenre] = useState("All");
  
  // Problem 2: State to manage the sorting option
  const [sortBy, setSortBy] = useState("default"); 

  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Thriller", "Animation"];
  const featuredMovie = Array.isArray(movies) ? (movies.find((movie) => movie.featured) || movies[0]) : { title: "", description: "" };

  // Combined Search and Genre Filter Logic
  let filteredMovies = Array.isArray(movies) 
    ? movies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === "All" || movie.genre.toLowerCase() === selectedGenre.toLowerCase();
        return matchesSearch && matchesGenre;
      })
    : [];

  // Problem 2: Sorting Logic implementation
  if (sortBy === "highToLow") {
    filteredMovies = [...filteredMovies].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "lowToHigh") {
    filteredMovies = [...filteredMovies].sort((a, b) => a.rating - b.rating);
  }

  function handleSearchChange(event) {
    const value = event.target.value;
    if (value.trim() === "") {
      setSearchParams({});
      return;
    }
    setSearchParams({ search: value });
  }

  return (
    <>
      {featuredMovie && (
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Featured Movie</p>
            <h1>{featuredMovie.title}</h1>
            <p className="description">{featuredMovie.description}</p>
            <Link to={`/movies/${featuredMovie.id}`} className="btn-primary">
              View Details
            </Link>
          </div>
        </section>
      )}

      {/* Control Panel Layout: Filters & Sorting Row */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', margin: '20px 0' }}>
        
        {/* Genre Filter Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedGenre === genre ? '#007bff' : '#e0e0e0',
                color: selectedGenre === genre ? '#fff' : '#333',
                fontWeight: 'bold'
              }}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Problem 2: Rating Sort Dropdown UI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="sort-select" style={{ fontWeight: 'bold', color: '#fff' }}>Sort By Rating:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              color: '#333',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <option value="default">Select Option</option>
            <option value="highToLow">Highest rating → Lowest rating</option>
            <option value="lowToHigh">Lowest rating → Highest rating</option>
          </select>
        </div>

      </div>

      <MovieGrid movies={filteredMovies} />
    </>
  );
}

export default Home;