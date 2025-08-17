import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.listItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={styles.link}
          >
            <span className={styles.title}>{movie.title}</span>
            {movie.release_date && (
              <span className={styles.year}>
                {' '}
                ({new Date(movie.release_date).getFullYear()})
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
