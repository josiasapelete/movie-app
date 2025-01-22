import { MovieDetailsT } from "@/type/dataType";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search, page, genre, year, type } = req.query;

  if (!search) {
    return res.status(400).json({ message: "Veuillez fournir un paramètre de recherche." });
  }

  const apiKey = process.env.OMDB_API_KEY;

  try {
    // Construire l'URL pour l'appel principal
    const pageNumber = page ? parseInt(page as string, 10) : 1;
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(search as string)}&page=${pageNumber}`;
    if (type) url += `&type=${encodeURIComponent(type as string)}`;
    if (year) url += `&y=${encodeURIComponent(year as string)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      let filteredResults :MovieDetailsT[] = data.Search;

      // Filtrage détaillé par genre (nécessite un appel pour chaque film)
      if (genre) {
        const genreFilter = genre.toString().toLowerCase();
        const detailedResults = await Promise.all(
          filteredResults.map(async (movie) => {
            const detailsResponse = await fetch(
              `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
            );
            const details = await detailsResponse.json();
            return details;
          })
        );

        filteredResults = detailedResults.filter((movie) =>
          movie.Genre?.toLowerCase().includes(genreFilter)
        );
      }

      res.status(200).json({
        Search: filteredResults,
        totalResults: parseInt(data.totalResults, 10),
        currentPage: pageNumber,
      });
    } else {
      res.status(404).json({ message: data.Error });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
}
