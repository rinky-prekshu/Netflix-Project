const MovieSkeleton = () => (
  <div className="overflow-hidden rounded-md bg-card">
    <div className="aspect-[2/3] w-full skeleton-pulse" />
  </div>
);

export const MovieGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {Array.from({ length: count }).map((_, i) => (
      <MovieSkeleton key={i} />
    ))}
  </div>
);

export default MovieSkeleton;
