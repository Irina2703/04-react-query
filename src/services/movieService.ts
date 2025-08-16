import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieSearchResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN; // Bearer токен
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
            query,
            include_adult: false,
            language: "en-US",
            page,
        },
        headers: {
            Authorization: `Bearer ${TMDB_BEARER_TOKEN}`, // Важливо!
        },
    });

    return response.data;
}
