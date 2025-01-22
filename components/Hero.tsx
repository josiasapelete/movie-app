"use client"
import { MovieDetailsT } from '@/type/dataType';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function Hero() {
    const [data,setData]= useState<MovieDetailsT>()
      async function fetchMovieDetail(id: string) {
        const response = await fetch(`/api/movie/${encodeURIComponent(id)}`);
        const result = await response.json();
      
        if (!response.ok) {
          console.error(result.message);
          return [];
        }
        console.log(" resultat ",result)
        setData(result)
        console.log("result ",result)
        return result; // Liste des films
      }
    
      useEffect(()=>{
        fetchMovieDetail("tt1375666")
      },[])
  return (
    <div className="h-[400px] w-full relative">
        <Image src={data?.Poster} alt={data?.Title} fill className="object-cover object-center"/>
    </div>
  )
}

export default Hero