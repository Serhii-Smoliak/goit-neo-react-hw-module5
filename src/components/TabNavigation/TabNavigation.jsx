import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './TabNavigation.module.css';

export default function TabNavigation({ movieId, location, onTabChange }) {
  const [activeTab, setActiveTab] = useState('similar');
  const currentLocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Определяем активный таб на основе текущего пути
    const path = currentLocation.pathname;
    let newActiveTab = 'similar'; // По умолчанию
    
    if (path.includes('/cast')) {
      newActiveTab = 'cast';
    } else if (path.includes('/reviews')) {
      newActiveTab = 'reviews';
    } else if (path === `/movies/${movieId}` || path === `/movies/${movieId}/`) {
      newActiveTab = 'similar';
    }
    
    setActiveTab(newActiveTab);
    if (onTabChange) {
      onTabChange(newActiveTab);
    }
  }, [currentLocation.pathname, movieId, onTabChange]);

  const handleTabClick = (tabName) => {
    // Запоминаем текущую позицию скролла
    const currentScrollY = window.scrollY;
    
    setActiveTab(tabName);
    if (onTabChange) {
      onTabChange(tabName);
    }
    
    // Восстанавливаем позицию скролла после смены таба
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  };

  const handleSimilarClick = () => {
    // Запоминаем текущую позицию скролла
    const currentScrollY = window.scrollY;
    
    handleTabClick('similar');
    if (currentLocation.pathname !== `/movies/${movieId}`) {
      navigate(`/movies/${movieId}`);
    }
    
    // Восстанавливаем позицию скролла после навигации
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 100);
  };

  return (
    <div className={styles.tabContainer}>
      <h4>Additional information</h4>
      <div className={styles.tabs} data-active-tab={activeTab}>
        <button
          className={`${styles.tab} ${activeTab === 'similar' ? styles.activeTab : ''}`}
          onClick={handleSimilarClick}
          type="button"
        >
          Similar
        </button>
        <NavLink
          to={`/movies/${movieId}/cast`}
          className={`${styles.tab} ${activeTab === 'cast' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('cast')}
          state={location}
        >
          Cast
        </NavLink>
        <NavLink
          to={`/movies/${movieId}/reviews`}
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
          onClick={() => handleTabClick('reviews')}
          state={location}
        >
          Reviews
        </NavLink>
      </div>
    </div>
  );
}
