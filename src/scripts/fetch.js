import axios from 'axios';
import {
  BASE_URL,
  API_KEY,
  search_point,
  discover_point,
  genre_point,
} from './api';

let currentPage = 1;

async function fetchRandomFilm(currentPage = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${discover_point}?api_key=${API_KEY}&page=${currentPage}&sort_by=popularity.desc`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchGenre() {
  try {
    const response = await axios.get(
      `${BASE_URL}/${genre_point}?api_key=${API_KEY}`
    );
    localStorage.setItem('genres', JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}

async function fetchSearchFilm(query, page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${search_point}?api_key=${API_KEY}&page=${page}&query=${query}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export { fetchSearchFilm, fetchGenre, fetchRandomFilm };
