import type { MobilePhone } from '@/types/mobile';
import { ProductCard } from '../../ProductCard/ProductCard';
import styles from './SimilarItems.module.css';

interface SimilarItemsProps {
  similarProducts: MobilePhone[];
}

export function SimilarItems({ similarProducts }: SimilarItemsProps) {
  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  const uniqueSimilarProducts = Array.from(
    new Map(similarProducts.map((product) => [product.id, product])).values()
  );

  return (
    <div className={styles.similarItems}>
      <h2 className={styles.similarTitle}>SIMILAR ITEMS</h2>
      <div className={styles.similarGrid}>
        {uniqueSimilarProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            brand={product.brand}
            name={product.name}
            price={product.basePrice}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
