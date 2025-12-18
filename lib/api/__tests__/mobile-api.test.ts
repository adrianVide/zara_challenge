import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getMobilePhones,
  getMobilePhoneById,
  MobileApiError,
} from '../mobile-api';
import { mockMobilePhones, mockProductDetail } from '@/test-utils/mock-data';

describe('mobile-api', () => {
  const API_BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
  const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getMobilePhones', () => {
    it('fetches phones successfully', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockMobilePhones,
      } as Response);

      const result = await getMobilePhones();

      expect(fetchMock).toHaveBeenCalledWith(
        `${API_BASE_URL}/products`,
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-api-key': API_KEY,
          }),
        })
      );
      expect(result).toEqual(mockMobilePhones);
    });

    it('includes query parameters', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => [],
      } as Response);

      await getMobilePhones({ search: 'iPhone', limit: 10 });

      expect(fetchMock).toHaveBeenCalledWith(
        `${API_BASE_URL}/products?search=iPhone&limit=10`,
        expect.any(Object)
      );
    });

    it('throws MobileApiError on failure', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Not found' }),
      } as Response);

      await expect(getMobilePhones()).rejects.toThrow(MobileApiError);
    });
  });

  describe('getMobilePhoneById', () => {
    it('fetches phone by ID successfully', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockProductDetail,
      } as Response);

      const result = await getMobilePhoneById('1');

      expect(fetchMock).toHaveBeenCalledWith(
        `${API_BASE_URL}/products/1`,
        expect.any(Object)
      );
      expect(result).toEqual(mockProductDetail);
    });

    it('throws MobileApiError on 404', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Product not found' }),
      } as Response);

      await expect(getMobilePhoneById('999')).rejects.toThrow(MobileApiError);
    });
  });
});
