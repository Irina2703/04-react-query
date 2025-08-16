import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieSearchResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const link = "https://api.themoviedb.org/3/search/movie";

export async function getMovies({
    query,
    page = 1,
}: {
    query: string;
    page?: number;
}): Promise<MovieSearchResponse> {
    const response = await axios.get<MovieSearchResponse>(link, {
        params: {
            api_key: TMDB_KEY, // ✅ тепер ключ використовується
            query,
            include_adult: false,
            language: "en-US",
            page,
        },
    });

    return response.data;
}
