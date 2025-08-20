import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchMovies, getMoviesByGenre, getTopRatedMovies } from '@/api';
import MovieList from '@/components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import Search from '@/components/Search/Search.jsx';
import GenreSelector from '@/components/GenreSelector/GenreSelector.jsx';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

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
      // По умолчанию загружаем топ 40 фильмов
      setIsLoading(true);
      getTopRatedMovies()
        .then((data) => setMovies(data.results.slice(0, 40)))
        .catch((e) => setError(e.message))
        .finally(() => setIsLoading(false));
    }
  }, [searchParams, query, genreId]);

  const onSubmit = (searchQuery) => {
    if (!searchQuery.length) return;

    const updatedParams = new URLSearchParams();
    updatedParams.set('query', searchQuery);
    setSearchParams(updatedParams);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    
    if (genre) {
      const updatedParams = new URLSearchParams();
      updatedParams.set('genre', genre.id);
      updatedParams.set('genreName', genre.name);
      setSearchParams(updatedParams);
    } else {
      // Сбрасываем параметры для показа топ 40
      setSearchParams(new URLSearchParams());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftSection}>
          <GenreSelector 
            onGenreSelect={handleGenreSelect} 
            selectedGenre={selectedGenre} 
          />
        </div>
        
        <div className={styles.rightSection}>
          <Search onSubmit={onSubmit} query={query} />
        </div>
      </div>

      {currentSearch && (
        <h2 className={styles.searchTitle}>
          {query
            ? `Search results for: "${query}"`
            : `Movies in genre: ${genreName}`}
        </h2>
      )}

      {!currentSearch && (
        <h2 className={styles.defaultTitle}>🏆 Top 40 Movies</h2>
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
