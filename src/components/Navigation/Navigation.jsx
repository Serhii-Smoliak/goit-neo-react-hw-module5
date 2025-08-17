
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMovieDetailsPage = location.pathname.startsWith('/movies/');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();

    if (!query.length) return;

    navigate(`/movies?query=${encodeURIComponent(query)}`);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to="/movies"
            >
              Movies
            </NavLink>
          </li>
        </ul>
        
        {isMovieDetailsPage && (
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                type="text"
                name="query"
                placeholder="Search movies..."
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
            </form>
          </div>
        )}
      </nav>
    </header>
  );
}
