"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
        params.delete("page");
      } else {
        params.delete("search");
      }

      const queryString = params.toString();
      const url = queryString ? `/?${queryString}` : "/";
      router.push(url);
    }, 2000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchValue, router, searchParams]);

  return (
    <div style={{ marginBottom: "3rem" }}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for a smartphone..."
        style={{
          width: "100%",
          padding: "0.75rem 0",
          border: "none",
          borderBottom: "1px solid var(--border-color)",
          fontSize: "0.875rem",
          outline: "none",
          backgroundColor: "transparent",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      />
    </div>
  );
}
