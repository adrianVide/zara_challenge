'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({
  id,
  brand,
  name,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/phone/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={`${brand} ${name}`}
          className={styles.image}
          width={300}
          height={300}
          loading="lazy"
        />
      </div>

      <div className={styles.info}>
        <div className={styles.brand}>{brand}</div>

        <div className={styles.details}>
          <span className={styles.name}>{name}</span>
          <span className={styles.price}>{price} EUR</span>
        </div>
      </div>
    </Link>
  );
}
