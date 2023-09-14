const apikey: string = '5a23141d3112537416160988dfbd1ef1';

export const now_playing_movies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const upcoming_movies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const popular_movies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;

export const base_image_path = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const search_movies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};

export const movie_details = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};

export const movie_cast_details = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
