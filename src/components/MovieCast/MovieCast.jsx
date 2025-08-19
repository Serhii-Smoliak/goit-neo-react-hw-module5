import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { getMovieCast, getImagePath } from '@/api';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [movieId]);

  return (
    <>
      {isLoading && <div className={styles.loadingMessage}>Loading...</div>}
      {cast.length && !isLoading && !error.length ? (
        <ul className={styles.list}>
          {cast.map((actor) => (
            <li key={actor.id} className={styles.castItem}>
              <Link to={`/person/${actor.id}`} className={styles.actorLink}>
                <img
                  src={
                    actor.profile_path
                      ? getImagePath(actor.profile_path, 200)
                      : '/no-image.webp'
                  }
                  alt={`Actor: ${actor.original_name}`}
                />
                <p className={styles.actorName}>{actor.original_name}</p>
                {actor.character && (
                  <p className={styles.character}>as {actor.character}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
