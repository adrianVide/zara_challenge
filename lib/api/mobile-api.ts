import type { MobilePhone } from '@/types/mobile';

const API_BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

export class MobileApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'MobileApiError';
  }
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new MobileApiError(
      `API request failed: ${response.statusText}`,
      response.status,
      errorData
    );
  }

  return response.json();
}

export interface GetMobilePhonesParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getMobilePhones(params?: GetMobilePhonesParams): Promise<MobilePhone[]> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.search) {
      queryParams.append('search', params.search);
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.offset !== undefined) {
      queryParams.append('offset', params.offset.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    const data = await fetchWithAuth(endpoint);
    return data;
  } catch (error) {
    console.error('Error fetching mobile phones:', error);
    throw error;
  }
}

export async function getMobilePhoneById(id: string): Promise<MobilePhone> {
  try {
    const data = await fetchWithAuth(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching mobile phone ${id}:`, error);
    throw error;
  }
}
