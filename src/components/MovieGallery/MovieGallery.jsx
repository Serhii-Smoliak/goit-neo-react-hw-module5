import { useState, useEffect } from 'react';
import { getMovieImages, getImagePath } from '@/api';
import styles from './MovieGallery.module.css';

export default function MovieGallery({ movieId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getMovieImages(movieId);
        if (data && data.backdrops) {
          setImages(data.backdrops.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching movie images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchImages();
    }
  }, [movieId]);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className={styles.galleryContainer}>
        <div className={styles.loading}>Загрузка изображений...</div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className={styles.galleryContainer}>
        <div className={styles.noImages}>
          Изображения для этого фильма не найдены
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.galleryContainer}>
        <h3 className={styles.title}>Галерея изображений</h3>
        <div className={styles.galleryGrid}>
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.imageContainer}
              onClick={() => openModal(image)}
            >
              <img
                src={getImagePath(image.file_path, 300)}
                alt={`Кадр из фильма ${index + 1}`}
                className={styles.galleryImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <img
              src={getImagePath(selectedImage.file_path, 780)}
              alt="Увеличенное изображение"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
}
