"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMobilePhones } from "@/contexts/MobilePhonesContext";
import styles from './Pagination.module.css';

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
    <div className={styles.container}>
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPreviousPage}
        className={styles.button}
      >
        PREVIOUS
      </button>

      <span className={styles.pageNumber}>PAGE {currentPage}</span>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNextPage}
        className={styles.button}
      >
        NEXT
      </button>
    </div>
  );
}
