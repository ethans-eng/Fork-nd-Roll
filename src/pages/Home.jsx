import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid.jsx";
import movies from "../data/movies.js";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Thriller", "Animation"];
  const featuredMovie = Array.isArray(movies) ? (movies.find((movie) => movie.featured) || movies[0]) : { title: "", description: "" };

  // Combined Search and Genre Filter Logic
  const filteredMovies = Array.isArray(movies) 
    ? movies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === "All" || movie.genre.toLowerCase() === selectedGenre.toLowerCase();
        return matchesSearch && matchesGenre;
      })
    : [];

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

      {/* Genre Filter Buttons UI */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px 0', flexWrap: 'wrap' }}>
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

      <MovieGrid movies={filteredMovies} />
    </>
  );
}

export default Home;