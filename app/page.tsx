import type { MobilePhone } from '@/types/mobile';
import { MobilePhonesProvider } from '@/contexts/MobilePhonesContext';
import { MobilePhonesList } from '@/components/MobilePhonesList/MobilePhonesList';
import { Pagination } from '@/components/Pagination/Pagination';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import styles from './page.module.css';

export const revalidate = 60;

const ITEMS_PER_PAGE = 20;
const API_BASE_URL = process.env.API_BASE_URL!;
const API_KEY = process.env.API_KEY!;

interface HomeProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

async function getMobilePhones(params: {
  limit: number;
  offset: number;
  search: string;
}): Promise<MobilePhone[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('limit', params.limit.toString());
  queryParams.append('offset', params.offset.toString());
  if (params.search) {
    queryParams.append('search', params.search);
  }

  const response = await fetch(
    `${API_BASE_URL}/products?${queryParams.toString()}`,
    {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch phones: ${response.statusText}`);
  }

  return response.json();
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
      err instanceof Error ? err.message : 'Failed to fetch mobile phones';
    console.error('Error in Home page:', err);
  }

  return (
    <MobilePhonesProvider
      initialData={mobilePhones}
      error={error}
      currentPage={currentPage}
      itemsPerPage={ITEMS_PER_PAGE}
      searchQuery={searchQuery}
    >
      <div className={styles.container}>
        <SearchBar />
        <MobilePhonesList />
        <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </MobilePhonesProvider>
  );
}
