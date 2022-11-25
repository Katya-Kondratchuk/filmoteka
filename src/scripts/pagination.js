import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchRandomFilm } from './fetch';
import { findGenres } from './gallery';
import { galleryRef } from './refs';

const container = document.getElementById('tui-pagination-container');
export const instance = new Pagination(container, {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
  currentPage: 1,
});

instance.on('afterMove', event => {
  currentPage = event.page;
  galleryRef.innerHTML = '';
  fetchRandomFilm(currentPage).then(({ results }) =>
    results.map(
      async ({
        poster_path,
        original_title,
        title,
        genre_ids,
        release_date,
        backdrop_path,
        vote_average,
      }) => {
        const genreaMarkup = await findGenres(genre_ids).then(data =>
          data.join(', ')
        );
        const poster = `https://image.tmdb.org/t/p/original/${
          poster_path || backdrop_path
        }`;
        galleryRef.innerHTML += `<li class="gallery-card">
      <img class = "poster"
        src= ${
          poster_path || backdrop_path !== undefined
            ? poster
            : '../images/gallery/default_img.jpg'
        }
        alt="poster to film ${original_title}"
      />
      <div class ="gallery_info">
        <span  class ="gallery_info-title">${title.toUpperCase()}</span>
        <span class ="gallery_info-genres">${
          genreaMarkup.length === 0 ? 'Genre not specified' : genreaMarkup
        }
        </span>
        <span class ="gallery_info-year">${
          release_date !== ''
            ? new Date(release_date).getFullYear()
            : 'Year not specified'
        }</span>
        <span class="gallery_info-rating">${vote_average}</span>
      </div>
     </li>`;
      }
    )
  );
});
