import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSimilarMovies, getImagePath } from '@/api';
import styles from './SimilarMovies.module.css';

export default function SimilarMovies({ movieId }) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movieId) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        const data = await getSimilarMovies(movieId);
        if (data && data.results) {
                  const moviesWithImages = data.results.filter(movie => movie.poster_path);
        setSimilarMovies(moviesWithImages.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching similar movies:', error);
        setError('Failed to load similar movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  if (isLoading) {
    return <div className={styles.loading}>Loading similar movies...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (similarMovies.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h4>Similar Movies</h4>
      <ul className={styles.list}>
        {similarMovies.map((movie) => (
          <li key={movie.id} className={styles.listItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={styles.link}
            >
              <img
                src={getImagePath(movie.poster_path)}
                alt={movie.title}
                className={styles.poster}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className={styles.title}>{movie.title}</span>
              {movie.release_date && (
                <span className={styles.year}>
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
