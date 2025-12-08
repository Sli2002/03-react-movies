import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => {
        const imgSrc = m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";
        return (
          <li key={m.id}>
            <div
              className={css.card}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(m)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelect(m);
              }}
            >
              <img
                className={css.image}
                src={imgSrc}
                alt={m.title}
                loading="lazy"
              />
              <h2 className={css.title}>{m.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
