import { Movie } from "@/services/omdbService";
import { Film } from "lucide-react";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const hasImage = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="group card-hover relative overflow-hidden rounded-md bg-card cursor-pointer animate-fade-in">
      <div className="aspect-[2/3] w-full overflow-hidden">
        {hasImage ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <Film size={48} className="text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background via-background/95 to-transparent p-3 pt-8 transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {movie.Title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.Year}</span>
          <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary">
            {movie.Type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
