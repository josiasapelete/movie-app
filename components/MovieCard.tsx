import Image from "next/image";
import Link from "next/link";
import React from "react";

type MovieCardProps = {
  id: string;
  cover: string; 
  title: string; 
  description: string; 
};

const MovieCard: React.FC<MovieCardProps> = ({ id,cover, title, description }) => {
  const validCover = cover !== "N/A" ? cover : "/placeholder.png"; 
  return (
    <Link  href={`/${id}`} className="relative group w-full h-96 cursor-pointer dark:border dark:border-white rounded-lg">
      {/* Image de couverture */}
      <Image
        src={validCover}
        alt={title}
        fill
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />

      {/* Overlay pour la description */}
      <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm mt-2">{description}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
