import axios from "axios";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "5d68a0b7";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface OMDBResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export const searchMovies = async (query: string): Promise<{ movies: Movie[]; error: string | null }> => {
  try {
    const { data } = await axios.get<OMDBResponse>(BASE_URL, {
      params: { s: query, apikey: API_KEY },
    });

    if (data.Response === "True" && data.Search) {
      return { movies: data.Search, error: null };
    }
    return { movies: [], error: data.Error || "No results found" };
  } catch {
    return { movies: [], error: "Failed to fetch movies. Please try again." };
  }
};
