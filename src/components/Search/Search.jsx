import { useState } from 'react';
import styles from './Search.module.css';

export default function Search({ onSubmit, query = '', compact = false }) {
  const [searchQuery, setSearchQuery] = useState(query || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSubmit) {
      onSubmit(searchQuery.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? styles.compactForm : styles.searchForm}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies..."
        className={compact ? styles.compactInput : styles.searchInput}
      />
      <button
        type="submit"
        className={compact ? styles.compactButton : styles.searchButton}
      >
        Search
      </button>
    </form>
  );
}
