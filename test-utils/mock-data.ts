import type {
  MobilePhone,
  ProductDetail,
  CartItem,
  ColorOption,
  StorageOption,
  Specs,
  SimilarProduct,
} from '@/types/mobile';

export const mockMobilePhone: MobilePhone = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15 Pro',
  basePrice: 999,
  imageUrl: 'https://example.com/iphone-15-pro.jpg',
};

export const mockMobilePhones: MobilePhone[] = [
  mockMobilePhone,
  {
    id: '2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    basePrice: 899,
    imageUrl: 'https://example.com/galaxy-s24.jpg',
  },
  {
    id: '3',
    brand: 'Google',
    name: 'Pixel 8 Pro',
    basePrice: 799,
    imageUrl: 'https://example.com/pixel-8-pro.jpg',
  },
];

export const mockColorOptions: ColorOption[] = [
  {
    name: 'Midnight Black',
    hexCode: '#000000',
    imageUrl: 'https://example.com/iphone-black.jpg',
  },
  {
    name: 'Silver',
    hexCode: '#C0C0C0',
    imageUrl: 'https://example.com/iphone-silver.jpg',
  },
  {
    name: 'Gold',
    hexCode: '#FFD700',
    imageUrl: 'https://example.com/iphone-gold.jpg',
  },
];

export const mockStorageOptions: StorageOption[] = [
  { capacity: '128GB', price: 999 },
  { capacity: '256GB', price: 1099 },
  { capacity: '512GB', price: 1299 },
];

export const mockSpecs: Specs = {
  brand: 'Apple',
  screen: '6.1"',
  resolution: '2556x1179',
  processor: 'A17 Pro',
  mainCamera: '48MP',
  selfieCamera: '12MP',
  battery: '3274 mAh',
  os: 'iOS 17',
  screenRefreshRate: '120Hz',
};

export const mockSimilarProducts: SimilarProduct[] = [
  {
    id: '2',
    brand: 'Apple',
    name: 'iPhone 15',
    basePrice: 799,
    imageUrl: 'https://example.com/iphone-15.jpg',
  },
  {
    id: '4',
    brand: 'Apple',
    name: 'iPhone 14 Pro',
    basePrice: 899,
    imageUrl: 'https://example.com/iphone-14-pro.jpg',
  },
];

export const mockProductDetail: ProductDetail = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15 Pro',
  description:
    'The most advanced iPhone ever with titanium design and A17 Pro chip',
  basePrice: 999,
  rating: 4.8,
  specs: mockSpecs,
  colorOptions: mockColorOptions,
  storageOptions: mockStorageOptions,
  similarProducts: mockSimilarProducts,
};

export const mockCartItem: CartItem = {
  id: '1-midnight-black-128gb-1234567890',
  productId: '1',
  brand: 'Apple',
  name: 'iPhone 15 Pro',
  color: 'Midnight Black',
  colorHexCode: '#000000',
  storage: '128GB',
  price: 999,
  imageUrl: 'https://example.com/iphone-black.jpg',
};

export const mockCartItems: CartItem[] = [
  mockCartItem,
  {
    id: '2-blue-256gb-1234567891',
    productId: '2',
    brand: 'Samsung',
    name: 'Galaxy S24',
    color: 'Phantom Blue',
    colorHexCode: '#0000FF',
    storage: '256GB',
    price: 999,
    imageUrl: 'https://example.com/galaxy-blue.jpg',
  },
];
