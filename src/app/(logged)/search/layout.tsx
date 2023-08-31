"use client";

import { SearchContextProvider } from "@/context/SearchContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SearchContextProvider>{children}</SearchContextProvider>;
}
