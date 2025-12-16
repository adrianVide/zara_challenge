export interface MobilePhone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface Specs {
  brand: string;
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface SimilarProduct {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ProductDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: Specs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: SimilarProduct[];
}

export interface CartItem {
  id: string;
  productId: string;
  brand: string;
  name: string;
  color: string;
  colorHexCode: string;
  storage: string;
  price: number;
  imageUrl: string;
}
