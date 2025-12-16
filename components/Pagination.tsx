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
        gap: "0.5rem",
        alignItems: "center",
        margin: "1rem 0",
      }}
    >
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPreviousPage}
      >
        Previous
      </button>

      <span>Page {currentPage}</span>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
}
