import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPersonDetails, getPersonMovies, getImagePath } from '@/api';
import MovieList from '@/components/MovieList/MovieList';
import styles from './PersonDetailsPage.module.css';

export default function PersonDetailsPage() {
  const { personId } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        setIsLoading(true);

        const [personData, moviesData] = await Promise.all([
          getPersonDetails(personId),
          getPersonMovies(personId),
        ]);

        setPerson(personData);

        const actorMovies = moviesData.cast
          .filter((movie) => movie.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);

        setMovies(actorMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonData();
  }, [personId]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Person not found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link
        to="#"
        onClick={() => window.history.back()}
        className={styles.backLink}
      >
        ← Go back
      </Link>

      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <img
            src={getImagePath(person.profile_path, 400)}
            alt={person.name}
            className={styles.profileImage}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{person.name}</h1>

          {person.birthday && (
            <p className={styles.detail}>
              <strong>Born:</strong>{' '}
              {new Date(person.birthday).toLocaleDateString('en-US')}
              {person.place_of_birth && ` in ${person.place_of_birth}`}
            </p>
          )}

          {person.known_for_department && (
            <p className={styles.detail}>
              <strong>Known for:</strong> {person.known_for_department}
            </p>
          )}

          {person.biography && (
            <div className={styles.biography}>
              <h3>Biography</h3>
              <p>{person.biography}</p>
            </div>
          )}
        </div>
      </div>

      {movies.length > 0 && (
        <div className={styles.moviesSection}>
          <h2>Known for</h2>
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
}
