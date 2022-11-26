import { fetchGenre, fetchRandomFilm } from './fetch';
import { renderFilmList } from './renderFilmList';

import { Loading } from 'notiflix/build/notiflix-loading-aio';

function markupRandomFilms() {
  fetchRandomFilm().then(({ results }) =>
    results.map(
      ({
        poster_path,
        backdrop_path,
        original_title,
        title,
        genre_ids,
        release_date,
        vote_average,
      }) =>
        renderFilmList(
          poster_path,
          backdrop_path,
          original_title,
          title,
          genre_ids,
          release_date,
          vote_average,

          findGenres
        )
    )
  );
}

markupRandomFilms();

export async function findGenres(genre_ids) {
  if (!localStorage.getItem('genres')) {
    await fetchGenre();
  }
  try {
    const genresObj = JSON.parse(localStorage.getItem('genres'));
    const { genres } = genresObj;
    return genres
      .filter(({ id }) => genre_ids.includes(id))
      .map(({ name }) => name || 'No genres');
  } catch (error) {
    console.log(error);
  }
}

//============= Кнопка Watched ====================================

//============= Кнопка  queue ====================================
