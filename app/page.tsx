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

async function fetchUniquePhones(
  targetCount: number,
  offset: number,
  searchQuery: string
): Promise<MobilePhone[]> {
  const allPhones: MobilePhone[] = [];
  const seenIds = new Set<string>();
  let currentOffset = offset;
  let fetchLimit = targetCount;
  const maxAttempts = 5;
  let attempts = 0;

  while (allPhones.length < targetCount && attempts < maxAttempts) {
    attempts++;

    const batch = await getMobilePhones({
      limit: fetchLimit,
      offset: currentOffset,
      search: searchQuery,
    });

    if (batch.length === 0) {
      break;
    }

    let duplicatesInBatch = 0;

    for (const phone of batch) {
      if (!seenIds.has(phone.id)) {
        seenIds.add(phone.id);
        allPhones.push(phone);
        if (allPhones.length === targetCount) {
          break;
        }
      } else {
        duplicatesInBatch++;
      }
    }

    if (allPhones.length < targetCount && duplicatesInBatch > 0) {
      currentOffset += batch.length;
      fetchLimit = duplicatesInBatch;
    } else {
      break;
    }
  }

  return allPhones;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || '';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let mobilePhones: MobilePhone[] = [];
  let error: string | null = null;

  try {
    mobilePhones = await fetchUniquePhones(ITEMS_PER_PAGE, offset, searchQuery);
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
      <div style={{ padding: "3rem 4rem" }}>
        <SearchBar />
        <MobilePhonesList />
        <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </MobilePhonesProvider>
  );
}
