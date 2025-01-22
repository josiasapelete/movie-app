"use client";

import { MovieDetailsT } from "@/type/dataType";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = useState<MovieDetailsT | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  async function fetchMovieDetail(id: string) {
    try {
      const response = await fetch(`/api/movie/${encodeURIComponent(id)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Une erreur est survenue.");
      }

      setData(result);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des données.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieDetail(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <p className="text-lg">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg text-red-500">Données non trouvées</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center dark:bg-gray-900 p-6 rounded-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section Image */}
        <div className="col-span-1 flex justify-center">
          <div className="relative w-full h-[500px] max-w-sm rounded-lg overflow-hidden shadow-lg">
            <Image
              src={data.Poster !== "N/A" ? data.Poster : "/placeholder.png"}
              alt={data?.Title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section Détails */}
        <div className="col-span-2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold border-b border-gray-700 pb-2">
            {data.Title} ({data.Year})
          </h1>

          <p className="text-lg leading-7">{data.Plot}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Genre</p>
              <p>{data.Genre}</p>
            </div>
            <div>
              <p className="font-semibold">Durée</p>
              <p>{data.Runtime}</p>
            </div>
            <div>
              <p className="font-semibold">Note</p>
              <p>{data.imdbRating}/10</p>
            </div>
            <div>
              <p className="font-semibold">Langue</p>
              <p>{data.Language}</p>
            </div>
            <div>
              <p className="font-semibold">Pays</p>
              <p>{data.Country}</p>
            </div>
            <div>
              <p className="font-semibold">Réalisateur</p>
              <p>{data.Director}</p>
            </div>
            <div>
              <p className="font-semibold">Acteurs</p>
              <p>{data.Actors}</p>
            </div>
            <div>
              <p className="font-semibold">Production</p>
              <p>{data.Production}</p>
            </div>
            <div>
              <p className="font-semibold">Sortie</p>
              <p>{data.Released}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
