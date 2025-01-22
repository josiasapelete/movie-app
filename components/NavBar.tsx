"use client";

import Link from "next/link";
import { ModeToggle } from "./Toggle";
import { useFilterContext } from "../context/FilterContext";

const genres = [
  "Tous",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

export default function NavBar() {
  const { searchTerm, setSearchTerm, genre, setGenre, year, setYear, type, setType } =
    useFilterContext();

  return (
    <div className="flex flex-col gap-4 py-4 px-6 bg-white dark:bg-black sticky top-0 z-30">
      <div className="flex items-center justify-between gap-3">
        <Link href="/">
          <div className="text-xl font-bold">Movie APP</div>
        </Link>
        
        <div className="relative flex  gap-3 ">
        <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white"
          />
        <div className="absolute inset-y-0 end-0 flex items-center p-3 pointer-events-none ">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
    </div>
        <ModeToggle />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white"
        >
          {genres.map((g) => (
            <option key={g} value={g === "Tous" ? "" : g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Tous les types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <input
          type="number"
          placeholder="Année"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-28 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>
  );
}
