"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  const { addItem } = useCart();

  const selectedColor = phone.colorOptions[selectedColorIndex];
  const selectedStorage = phone.storageOptions[selectedStorageIndex];
  const currentPrice = selectedStorage?.price || phone.basePrice;

  const hasColorOptions = phone.colorOptions && phone.colorOptions.length > 0;
  const hasStorageOptions =
    phone.storageOptions && phone.storageOptions.length > 0;
  const canAddToCart =
    (!hasColorOptions || selectedColor) &&
    (!hasStorageOptions || selectedStorage);

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
            imageUrl={selectedColor?.imageUrl || phone.colorOptions[0]?.imageUrl}
            brand={phone.brand}
            name={phone.name}
          />

          <div className={styles.productInfo}>
            <h1 className={styles.title}>
              {phone.brand} {phone.name}
            </h1>

            <p className={styles.price}>{currentPrice} EUR</p>

            <StorageSelector
              storageOptions={phone.storageOptions}
              selectedIndex={selectedStorageIndex}
              onSelect={setSelectedStorageIndex}
            />

            <ColorSelector
              colorOptions={phone.colorOptions}
              selectedIndex={selectedColorIndex}
              onSelect={setSelectedColorIndex}
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
