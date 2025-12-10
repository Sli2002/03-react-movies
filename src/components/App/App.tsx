import { useState } from "react";
import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import toast, { Toaster } from "react-hot-toast";

import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(null);
    setLoading(true);

    try {
      const data = await fetchMovies({ query });

      if (!data.results || data.results.length === 0) {
        toast("No movies found for your request.");
        setMovies([]);
      } else {
        setMovies(data.results);
      }
    } catch {
      setError("There was an error");
      toast.error("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  };
  const searchAction = async (formData: FormData) => {
    const query = formData.get("query")?.toString().trim() ?? "";

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    await handleSearch(query);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar action={searchAction} />

      {loading && <Loader />}
      {error && <ErrorMessage />}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {!loading && !error && movies.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 20 }}></p>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
