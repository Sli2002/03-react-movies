import axios from "axios";
import type { Movie } from "../types/movie";
import type { AxiosResponse } from "axios";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!TOKEN) {
  console.error("❌ Missing API token: VITE_TMDB_TOKEN is not set");
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  params: FetchMoviesParams
): Promise<MoviesResponse> {
  const config = {
    params: {
      query: params.query,
      page: params.page ?? 1,
      include_adult: params.include_adult ?? false,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  const response: AxiosResponse<MoviesResponse> = await axios.get(
    `${BASE_URL}/search/movie`,
    config
  );

  return response.data;
}
