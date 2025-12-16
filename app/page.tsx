import { getMobilePhones } from "@/lib/api/mobile-api";
import type { MobilePhone } from "@/types/mobile";
import { MobilePhonesProvider } from "@/contexts/MobilePhonesContext";
import { MobilePhonesList } from "@/components/MobilePhonesList";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";

export const revalidate = 60;

const ITEMS_PER_PAGE = 20;

interface HomeProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || '';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let mobilePhones: MobilePhone[] = [];
  let error: string | null = null;

  try {
    mobilePhones = await getMobilePhones({
      limit: ITEMS_PER_PAGE,
      offset,
      search: searchQuery,
    });
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch mobile phones";
    console.error("Error in Home page:", err);
  }

  return (
    <MobilePhonesProvider
      initialData={mobilePhones}
      error={error}
      currentPage={currentPage}
      itemsPerPage={ITEMS_PER_PAGE}
      searchQuery={searchQuery}
    >
      <div style={{ padding: "2rem", fontFamily: "monospace" }}>
        <h1>Mobile Phones Catalog</h1>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          {searchQuery
            ? `Search results for: "${searchQuery}" | Page ${currentPage}`
            : `All phones | Page ${currentPage}`}
        </p>
        <SearchBar />
        <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
        <MobilePhonesList />
        <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </MobilePhonesProvider>
  );
}
