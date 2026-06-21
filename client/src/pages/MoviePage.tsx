import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieGallery from "../components/moviePageComponents/movieGallery";
export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    async function getMovie(movieId: string | undefined) {
      if (!movieId) return;
      try {
        const response = await fetch(
          "http://localhost:8000/api/movies/" + movieId,
        );
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed:", error);
      }
    }

    getMovie(id);
  }, [id]);

  if (!movie) {
    return <div className="p-8 text-white">Loading Movie...</div>;
  }
  console.log("movie json: ", movie);
  return (
    <div className="flex flex-col">
      <section
        className="flex flex-col px-20 md:flex-row gap-8 p-8 bg-movie-surface/60 text-white rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="w-64 h-96 object-cover rounded-lg shadow-xl"
        />
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl font-bold">
            {movie.original_title}
            <span className="text-2xl text-gray-400 font-normal ml-2">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>

          <div className="flex items-center gap-3 text-sm">
            <span>
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <span className="font-bold text-yellow-500">
              {movie.vote_average.toFixed(1)} ⭐
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-movie-highlight px-6 py-2 rounded font-bold hover:bg-movie-highlight/80 cursor-pointer active:bg-movie-highlight">
              Play Now
            </button>
            <button className="bg-movie-accent px-6 py-2 rounded cursor-pointer hover:bg-movie-accent/80 active:bg-movie-accent/60">
              WatchList
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl my-10 mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
            Summary
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {movie.overview}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Information
            </h2>
            <div className="flex flex-col gap-3">
              <h3>
                <span className="text-gray-400 font-semibold">Status: </span>
                {movie.status}
              </h3>
              <h3>
                <span className="text-gray-400 font-semibold">Budget: </span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(movie.budget)}
              </h3>
              <h3>
                <span className="text-gray-400 font-semibold">Revenue: </span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(movie.revenue)}
              </h3>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Production
            </h2>
            <p className="text-gray-300 text-sm">
              {movie.production_companies.map((c) => c.name).join(", ")}
            </p>
          </div>
        </div>
      </section>
      <MovieGallery category="popular" currentMovieId={id as string} />
    </div>
  );
}
