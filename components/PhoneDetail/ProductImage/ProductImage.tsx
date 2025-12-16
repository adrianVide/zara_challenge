import Image from 'next/image';
import styles from './ProductImage.module.css';

interface ProductImageProps {
  imageUrl: string;
  brand: string;
  name: string;
}

export function ProductImage({ imageUrl, brand, name }: ProductImageProps) {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={imageUrl}
        alt={`${brand} ${name}`}
        className={styles.image}
        width={400}
        height={400}
        priority
      />
    </div>
  );
}
