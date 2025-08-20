import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './TabNavigation.module.css';

export default function TabNavigation({ movieId, location, onTabChange }) {
  const [activeTab, setActiveTab] = useState('similar');
  const currentLocation = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (currentLocation.pathname.includes('/cast')) {
      setActiveTab('cast');
    } else if (currentLocation.pathname.includes('/reviews')) {
      setActiveTab('reviews');
    } else {
      setActiveTab('similar');
    }
  }, [currentLocation.pathname, movieId]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  return (
    <div className={styles.tabContainer}>
      <h4>Additional information</h4>
      <div className={styles.tabs} data-active-tab={activeTab}>
        <button
          className={`${styles.tab} ${activeTab === 'similar' ? styles.activeTab : ''}`}
          onClick={() => {
            handleTabClick('similar');
            navigate(`/movies/${movieId}`);
          }}
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
