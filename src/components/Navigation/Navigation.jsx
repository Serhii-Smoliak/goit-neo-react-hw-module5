import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
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
      </nav>
    </header>
  );
}
