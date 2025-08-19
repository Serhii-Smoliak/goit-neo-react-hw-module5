import '@/components/App/App.module.css';
import { Suspense, lazy } from 'react';

import { Routes, Route } from 'react-router-dom';

import Navigation from '@/components/Navigation/Navigation';

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('@/pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(
  () => import('@/pages/MovieDetailsPage/MovieDetailsPage')
);
const PersonDetailsPage = lazy(
  () => import('@/pages/PersonDetailsPage/PersonDetailsPage')
);
const MovieCast = lazy(() => import('@/components/MovieCast/MovieCast'));
const MovieReviews = lazy(
  () => import('@/components/MovieReviews/MovieReviews')
);
const PageNotFound = lazy(() => import('@/pages/PageNotFound/PageNotFound'));

function App() {
  return (
    <>
      <Navigation />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="/person/:personId" element={<PersonDetailsPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
