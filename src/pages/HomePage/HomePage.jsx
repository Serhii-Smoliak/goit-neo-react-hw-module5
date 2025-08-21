import { useEffect, useState } from 'react';

import { getTrendingMovies } from '@/api';
import MovieList from '@/components/MovieList/MovieList';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTrendingMovies();
        if (data) {
          setTrends(data.results);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      {trends.length > 0 && !error ? (
        <div className={styles.movieList}>
          <MovieList movies={trends} />
        </div>
      ) : null}
    </div>
  );
}
