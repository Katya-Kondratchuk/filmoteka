import { Loading } from 'notiflix';
import { fetchRandomFilm, fetchSearchFilm } from './fetch';
import { findGenres } from './gallery';
import { formRef, galleryRef } from './refs';
import { renderFilmList } from './renderFilmList';

const notifyRef = document.querySelector('.notify');

function handleSearchFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements['search-input'].value.trim();
  galleryRef.innerHTML = '';
  if (query === '') {
    notFound();
    return;
  }
  notifyRef.textContent = '';
  fetchSearchFilm(query).then(({ results }) => {
    if (!results.length) {
      notFound();
    }
    results.map(
      ({
        poster_path,
        original_title,
        title,
        genre_ids,
        release_date,
        backdrop_path,
        vote_average,
      }) => {
        Loading.arrows();
        renderFilmList(
          poster_path,
          original_title,
          title,
          genre_ids,
          release_date,
          backdrop_path,
          vote_average,
          findGenres
        );
        Loading.remove();
      }
    );
  });
}

function notFound() {
  notifyRef.textContent =
    'Search result not successful. Enter the correct movie name';
  fetchRandomFilm().then(({ results }) => {
    results.map(
      ({
        poster_path,
        original_title,
        title,
        genre_ids,
        release_date,
        backdrop_path,
        vote_average,
      }) => {
        renderFilmList(
          poster_path,
          original_title,
          title,
          genre_ids,
          release_date,
          backdrop_path,
          vote_average,
          findGenres
        );
      }
    );
  });
  return;
}

formRef.addEventListener('submit', handleSearchFormSubmit);
