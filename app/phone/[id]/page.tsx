import { getMobilePhoneById } from "@/lib/api/mobile-api";
import type { ProductDetail } from "@/types/mobile";
import Link from "next/link";
import { PhoneDetailClient } from "@/components/PhoneDetail/PhoneDetailClient";
import styles from "./page.module.css";

export const revalidate = 60;

interface PhoneDetailProps {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetail({ params }: PhoneDetailProps) {
  const { id } = await params;
  let phone: ProductDetail | null = null;
  let error: string | null = null;

  try {
    phone = await getMobilePhoneById(id);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch phone details";
    console.error("Error in PhoneDetail page:", err);
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

  return <PhoneDetailClient phone={phone} />;
}
