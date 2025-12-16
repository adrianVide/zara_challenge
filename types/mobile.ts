export interface MobilePhone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ProductDetail extends MobilePhone {
  description?: string;
  [key: string]: unknown;
}
