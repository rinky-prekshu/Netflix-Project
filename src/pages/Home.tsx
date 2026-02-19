import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { MovieGridSkeleton } from "@/components/MovieSkeleton";
import { searchMovies, Movie } from "@/services/omdbService";
import { Search, Frown } from "lucide-react";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const fetchMovies = useCallback(async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    const { movies: data, error: err } = await searchMovies(searchTerm || "batman");
    setMovies(data);
    setError(err);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies("batman");
  }, [fetchMovies]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchMovies(value);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6">
        {/* Search */}
        <div className="my-8 flex items-center gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full rounded bg-secondary pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary/50 transition-shadow"
            />
          </div>
        </div>

        <h2 className="mb-5 text-xl font-semibold text-foreground">
          {query ? `Results for "${query}"` : "Popular Movies"}
        </h2>

        {/* Content */}
        {loading ? (
          <MovieGridSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <Frown size={48} className="mb-4" />
            <p className="text-lg">{error}</p>
            <p className="mt-1 text-sm">Try searching for something else</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
