import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchMovies, getMoviesByGenre } from '@/api';
import MovieList from '@/components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import Search from '@/components/Search/Search.jsx';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get('query') ?? '';
  const genreId = searchParams.get('genre') ?? '';
  const genreName = searchParams.get('genreName') ?? '';
  const currentSearch = query || genreName;

  useEffect(() => {
    setMovies([]);
    setError('');

    if (query) {
      setIsLoading(true);
      searchMovies(query)
        .then((data) => setMovies(data.results))
        .catch((e) => setError(e.message))
        .finally(() => setIsLoading(false));
    } else if (genreId) {
      setIsLoading(true);
      getMoviesByGenre(genreId)
        .then((data) => setMovies(data.results))
        .catch((e) => setError(e.message))
        .finally(() => setIsLoading(false));
    } else {
      setMovies([]);
    }
  }, [searchParams, query, genreId]);

  const onSubmit = (searchQuery) => {
    if (!searchQuery.length) return;

    const updatedParams = new URLSearchParams();
    updatedParams.set('query', searchQuery);
    setSearchParams(updatedParams);
  };

  return (
    <div className={styles.container}>
      <Search onSubmit={onSubmit} query={query} />
      {currentSearch && (
        <h2 className={styles.searchTitle}>
          {query
            ? `Search results for: "${query}"`
            : `Movies in genre: ${genreName}`}
        </h2>
      )}

      {isLoading && <div className={styles.loadingMessage}>Loading...</div>}

      {movies.length && !error.length && !isLoading ? (
        <div className={styles.movieList}>
          <MovieList movies={movies} />
        </div>
      ) : null}
    </div>
  );
}
