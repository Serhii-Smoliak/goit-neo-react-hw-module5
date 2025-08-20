import { useState, useEffect, useRef } from 'react';
import { getGenres } from '@/api';
import styles from './GenreSelector.module.css';

export default function GenreSelector({ onGenreSelect, selectedGenre }) {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      try {
        const data = await getGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGenreSelect = (genre) => {
    onGenreSelect(genre);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getSelectedGenreName = () => {
    if (!selectedGenre) return 'Top 40 Movies';
    return selectedGenre.name;
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading genres...</div>;
  }

  return (
    <div className={styles.genreSelector} ref={dropdownRef}>
      <button
        className={styles.selectorButton}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={styles.selectedText}>{getSelectedGenreName()}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem} onClick={() => handleGenreSelect(null)}>
            🏆 Top 40 Movies
          </div>
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={styles.dropdownItem}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
