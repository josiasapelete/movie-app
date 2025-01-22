"use client";

import React, { createContext, useContext, useState } from "react";

interface FilterContextType {
  searchTerm: string;
  genre: string;
  year: string;
  type: string;
  setSearchTerm: (term: string) => void;
  setGenre: (genre: string) => void;
  setYear: (year: string) => void;
  setType: (type: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        genre,
        year,
        type,
        setSearchTerm,
        setGenre,
        setYear,
        setType,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext doit être utilisé dans un FilterProvider");
  }
  return context;
};
