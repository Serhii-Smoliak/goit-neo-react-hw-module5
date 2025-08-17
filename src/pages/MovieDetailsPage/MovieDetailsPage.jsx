import { useEffect, useState, useRef } from 'react';

import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';

import styles from './MovieDetailsPage.module.css';

import { getMovieDetails, getImagePath, getMovieVideos } from '@/api';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const releaseYear = movie?.release_date.split('-')[0];
  const [error, setError] = useState('');
  const backLocation = useRef(location.state);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(movieId);
        if (data) {
          setMovie(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchVideos = async () => {
      try {
        const data = await getMovieVideos(movieId);
        if (data) {
          const trailers = data.results.filter(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          );
          setVideos(trailers);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchMovie();
    fetchVideos();
  }, [movieId]);

  const mainTrailer = videos.length > 0 ? videos[0] : null;

  const getRatingClass = (rating) => {
    if (rating >= 75) return styles.ratingHigh;
    if (rating >= 50) return styles.ratingMedium;
    return styles.ratingLow;
  };

  const userScore = (movie?.vote_average * 10).toFixed(0);

  return (
    movie &&
    !error.length && (
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        <Link
          to={backLocation.current || '/movies'}
          className={styles.backLink}
        >
          ← Go back
        </Link>
        <div className={`${styles.container} ${mainTrailer ? styles.containerWithTrailer : ''}`}>
          <div className={styles.imageWrapper}>
            <img
              src={getImagePath(movie.poster_path, 300)}
              alt={`${movie.original_title} image`}
            />
          </div>

          <div className={styles.textContent}>
            <h1>
              {movie.original_title} ({releaseYear})
            </h1>
            <p>
              User score: <span className={getRatingClass(userScore)}>{userScore}%</span>
            </p>

            <section className="section">
              <h4>Overview</h4>
              <p>{movie.overview}</p>
            </section>

            <section className="section">
              <h4>Genres</h4>
              <ul className={styles.genresList}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>
                    <Link
                      to={`/movies?genre=${genre.id}&genreName=${encodeURIComponent(genre.name)}`}
                      className={styles.genreLink}
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {mainTrailer && (
            <div className={styles.trailerSection}>
              <h4>Trailer</h4>
              <div className={styles.trailerWrapper}>
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube-nocookie.com/embed/${mainTrailer.key}?rel=0&modestbranding=1&playsinline=1`}                  title={mainTrailer.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <hr />
        <h4>Additional information</h4>
        <ul className={styles.additionalInfoList}>
          <li>
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    )
  );
}
