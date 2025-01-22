"use client";

import { FilterContextProvider } from "@/context/FilterContext";


export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return <FilterContextProvider>{children}</FilterContextProvider>;
}
