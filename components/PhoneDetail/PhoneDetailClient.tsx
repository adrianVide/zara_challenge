"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { BackButton } from "./BackButton/BackButton";
import { ProductImage } from "./ProductImage/ProductImage";
import { StorageSelector } from "./StorageSelector/StorageSelector";
import { ColorSelector } from "./ColorSelector/ColorSelector";
import { Specifications } from "./Specifications/Specifications";
import { SimilarItems } from "./SimilarItems/SimilarItems";
import type { ProductDetail, CartItem } from "@/types/mobile";
import styles from "./PhoneDetailClient.module.css";

interface PhoneDetailClientProps {
  phone: ProductDetail;
}

export function PhoneDetailClient({ phone }: PhoneDetailClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const getInitialColorIndex = (): number | null => {
    const colorParam = searchParams.get('color');
    if (colorParam !== null) {
      const index = parseInt(colorParam, 10);
      if (!isNaN(index) && index >= 0 && index < phone.colorOptions.length) {
        return index;
      }
    }
    return null;
  };

  const getInitialStorageIndex = (): number | null => {
    const storageParam = searchParams.get('storage');
    if (storageParam !== null) {
      const index = parseInt(storageParam, 10);
      if (!isNaN(index) && index >= 0 && index < phone.storageOptions.length) {
        return index;
      }
    }
    return null;
  };

  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(getInitialColorIndex);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState<number | null>(getInitialStorageIndex);

  const selectedColor = selectedColorIndex !== null ? phone.colorOptions[selectedColorIndex] : null;
  const selectedStorage = selectedStorageIndex !== null ? phone.storageOptions[selectedStorageIndex] : null;
  const currentPrice = selectedStorage?.price || phone.basePrice;

  const hasColorOptions = phone.colorOptions && phone.colorOptions.length > 0;
  const hasStorageOptions =
    phone.storageOptions && phone.storageOptions.length > 0;

  const priceDisplay = hasStorageOptions && selectedStorageIndex === null
    ? `From ${currentPrice} EUR`
    : `${currentPrice} EUR`;
  const canAddToCart =
    (!hasColorOptions || selectedColor) &&
    (!hasStorageOptions || selectedStorage);

  const updateURL = (colorIndex: number | null, storageIndex: number | null) => {
    const params = new URLSearchParams();

    if (colorIndex !== null) {
      params.set('color', colorIndex.toString());
    }

    if (storageIndex !== null) {
      params.set('storage', storageIndex.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '';

    router.replace(`/phone/${phone.id}${newUrl}`, { scroll: false });
  };

  const handleColorSelect = (index: number) => {
    setSelectedColorIndex(index);
    updateURL(index, selectedStorageIndex);
  };

  const handleStorageSelect = (index: number) => {
    setSelectedStorageIndex(index);
    updateURL(selectedColorIndex, index);
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${phone.id}-${selectedColor?.name || "default"}-${
        selectedStorage?.capacity || "default"
      }-${Date.now()}`,
      productId: phone.id,
      brand: phone.brand,
      name: phone.name,
      color: selectedColor?.name || "Default",
      colorHexCode: selectedColor?.hexCode || "#000000",
      storage: selectedStorage?.capacity || "Standard",
      price: currentPrice,
      imageUrl:
        selectedColor?.imageUrl || phone.colorOptions[0]?.imageUrl || "",
    };
    addItem(cartItem);
    router.push("/cart");
  };

  return (
    <>
      <BackButton />
      <div className={styles.container}>
        <div className={styles.productDetail}>
          <ProductImage
            imageUrl={selectedColor?.imageUrl || (phone.colorOptions.length > 0 ? phone.colorOptions[0]?.imageUrl : '')}
            brand={phone.brand}
            name={phone.name}
          />

          <div className={styles.productInfo}>
            <h1 className={styles.title}>
              {phone.brand} {phone.name}
            </h1>

            <p className={styles.price}>{priceDisplay}</p>

            <StorageSelector
              storageOptions={phone.storageOptions}
              selectedIndex={selectedStorageIndex}
              onSelect={handleStorageSelect}
            />

            <ColorSelector
              colorOptions={phone.colorOptions}
              selectedIndex={selectedColorIndex}
              onSelect={handleColorSelect}
            />

            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={styles.addButton}
            >
              AÑADIR
            </button>
          </div>
        </div>

        <Specifications phone={phone} />

        <SimilarItems similarProducts={phone.similarProducts} />
      </div>
    </>
  );
}
