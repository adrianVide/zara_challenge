"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from './SearchBar.module.css';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastNavigatedSearchRef = useRef(searchParams.get("search") || "");

  const handleSearchChange = useCallback((value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const trimmedValue = value.trim();

      if (trimmedValue !== lastNavigatedSearchRef.current) {
        lastNavigatedSearchRef.current = trimmedValue;

        const params = new URLSearchParams(window.location.search);

        if (trimmedValue) {
          params.set("search", trimmedValue);
          params.delete("page");
        } else {
          params.delete("search");
        }

        const queryString = params.toString();
        const url = queryString ? `/?${queryString}` : "/";
        router.push(url);
      }
    }, 500);
  }, [router]);

  useEffect(() => {
    handleSearchChange(searchValue);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchValue, handleSearchChange]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for a smartphone..."
        className={styles.input}
      />
    </div>
  );
}
