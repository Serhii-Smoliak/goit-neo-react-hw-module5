import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';
import Search from '@/components/Search/Search.jsx';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMovieDetailsPage = location.pathname.startsWith('/movies/');
  const isHomePage = location.pathname === '/';

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery.length) return;
    navigate(`/movies?query=${encodeURIComponent(searchQuery)}`);
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

        {(isMovieDetailsPage || isHomePage) && (
          <div className={styles.searchContainer}>
            <Search onSubmit={handleSearchSubmit} compact={true} />
          </div>
        )}
      </nav>
    </header>
  );
}
