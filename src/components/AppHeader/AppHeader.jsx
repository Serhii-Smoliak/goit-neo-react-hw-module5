import { NavLink } from 'react-router-dom';
import css from './AppHeader.module.css';

export default function AppHeader() {
  return (
    <header className={css.header}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        <li>
          <NavLink to="/Products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
      </ul>
    </header>
  );
}
