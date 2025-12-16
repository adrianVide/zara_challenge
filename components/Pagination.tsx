"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMobilePhones } from "@/contexts/MobilePhonesContext";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
}

export function Pagination({ currentPage, itemsPerPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mobilePhones } = useMobilePhones();

  const endIndex = currentPage * itemsPerPage;
  const hasItemsInContextForNextPage = mobilePhones.length > endIndex;
  const lastFetchWasFull = mobilePhones.length % itemsPerPage === 0 && mobilePhones.length > 0;
  const hasNextPage = hasItemsInContextForNextPage || lastFetchWasFull;
  const hasPreviousPage = currentPage > 1;

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `/?${queryString}` : "/";
    router.push(url);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        margin: "3rem 0",
      }}
    >
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPreviousPage}
        style={{
          padding: "0.5rem 1.5rem",
          border: "1px solid var(--foreground)",
          backgroundColor: "transparent",
          color: "var(--foreground)",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          cursor: hasPreviousPage ? "pointer" : "not-allowed",
          opacity: hasPreviousPage ? 1 : 0.3,
        }}
      >
        PREVIOUS
      </button>

      <span style={{ fontSize: "0.75rem" }}>PAGE {currentPage}</span>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNextPage}
        style={{
          padding: "0.5rem 1.5rem",
          border: "1px solid var(--foreground)",
          backgroundColor: "transparent",
          color: "var(--foreground)",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          cursor: hasNextPage ? "pointer" : "not-allowed",
          opacity: hasNextPage ? 1 : 0.3,
        }}
      >
        NEXT
      </button>
    </div>
  );
}
