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
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by brand or name..."
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      />
      {searchValue && (
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
          Searching for: "{searchValue}"
        </p>
      )}
    </div>
  );
}
