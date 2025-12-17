"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getMobilePhoneById } from "@/lib/api/mobile-api";
import type { ProductDetail, CartItem } from "@/types/mobile";
import Link from "next/link";
import { useLoading } from "@/contexts/LoadingContext";
import { useCart } from "@/contexts/CartContext";
import { BackButton } from "@/components/PhoneDetail/BackButton/BackButton";
import { ProductImage } from "@/components/PhoneDetail/ProductImage/ProductImage";
import { StorageSelector } from "@/components/PhoneDetail/StorageSelector/StorageSelector";
import { ColorSelector } from "@/components/PhoneDetail/ColorSelector/ColorSelector";
import { Specifications } from "@/components/PhoneDetail/Specifications/Specifications";
import { SimilarItems } from "@/components/PhoneDetail/SimilarItems/SimilarItems";
import styles from "./page.module.css";

export default function PhoneDetail() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const [phone, setPhone] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const { addItem } = useCart();

  const getInitialColorIndex = (): number | null => {
    if (!phone) return null;
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
    if (!phone) return null;
    const storageParam = searchParams.get('storage');
    if (storageParam !== null) {
      const index = parseInt(storageParam, 10);
      if (!isNaN(index) && index >= 0 && index < phone.storageOptions.length) {
        return index;
      }
    }
    return null;
  };

  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        setIsLoading(true);
        const data = await getMobilePhoneById(id);
        setPhone(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch phone details"
        );
        console.error("Error in PhoneDetail page:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPhone();
    }
  }, [id, setIsLoading]);

  useEffect(() => {
    if (phone) {
      setSelectedColorIndex(getInitialColorIndex());
      setSelectedStorageIndex(getInitialStorageIndex());
    }
  }, [phone, searchParams]);

  if (!phone && !error) {
    return null;
  }

  if (error || !phone) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <strong>Error:</strong> {error || "Phone not found"}
        </div>
        <Link href="/" className={styles.errorLink}>
          Go back to home
        </Link>
      </div>
    );
  }

  const selectedColor = selectedColorIndex !== null ? phone.colorOptions[selectedColorIndex] : null;
  const selectedStorage = selectedStorageIndex !== null ? phone.storageOptions[selectedStorageIndex] : null;
  const currentPrice = selectedStorage?.price || phone.basePrice;

  const hasColorOptions = phone.colorOptions && phone.colorOptions.length > 0;
  const hasStorageOptions = phone.storageOptions && phone.storageOptions.length > 0;

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
