"use client";

import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import { MovieT } from "@/type/dataType";
import { useFilterContext } from "@/context/FilterContext";

export default function Home() {
  const { searchTerm, genre, year, type } = useFilterContext();
  const [data, setData] = useState<MovieT[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const moviesPerPage = 10; // OMDb API limite à 10 résultats par page

  // Fonction pour récupérer les films
  async function fetchMovies() {
    setIsLoading(true);
    setError(null);

    try {
      let url = `/api/movie?search=${encodeURIComponent(searchTerm)}&page=${currentPage}`;
      if (genre) url += `&genre=${encodeURIComponent(genre)}`;
      if (year) url += `&year=${encodeURIComponent(year)}`;
      if (type) url += `&type=${encodeURIComponent(type)}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        setData(result.Search || []);
        setTotalResults(result.totalResults || 0); 
        setError(" ")
      } else {
        setError(result.message || "Une erreur est survenue.");
      }
    } catch {
      setError("Erreur de chargement des données.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (searchTerm.trim() !== "") fetchMovies();
  }, [searchTerm, genre, year, type, currentPage]);

  const totalPages = Math.ceil(totalResults / moviesPerPage);

  return (
    <div>
      {isLoading && <p className="text-center">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {data.length > 0 ? (
        <>
          {/* Grille des films */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                id={movie.imdbID}
                cover={movie.Poster}
                title={movie.Title}
                description={movie.Type}
              />
            ))}
          </div>

          {/* Pagination simple */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Précédent
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Suivant
            </button>
          </div>
        </>
      ) : (
        !isLoading && <p className="text-center">Aucun résultat trouvé.</p>
      )}
    </div>
  );
}
