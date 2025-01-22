import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Récupère l'ID
  const apiKey = process.env.OMDB_API_KEY;

  if (req.method === 'GET') {
    try {
      if (!id) {
        res.status(400).json({ message: 'ID manquant' });
        return;
      }

      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
      const data = await response.json();

      if (data.Response === 'True') {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: data.Error });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails :', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
