import { getMobilePhoneById } from "@/lib/api/mobile-api";
import type { ProductDetail } from "@/types/mobile";
import Link from "next/link";
import { PhoneDetailClient } from "@/components/PhoneDetailClient";

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
    error = err instanceof Error ? err.message : "Failed to fetch phone details";
    console.error("Error in PhoneDetail page:", err);
  }

  if (error || !phone) {
    return (
      <div style={{ padding: "2rem" }}>
        <Link href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
          ← Back to catalog
        </Link>
        <div
          style={{
            color: "red",
            padding: "1rem",
            border: "1px solid red",
            borderRadius: "4px",
            backgroundColor: "#fee",
            marginTop: "1rem",
          }}
        >
          <strong>Error:</strong> {error || "Phone not found"}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/" style={{ color: "#0070f3", textDecoration: "underline", marginLeft: "2rem" }}>
        ← Back to catalog
      </Link>
      <PhoneDetailClient phone={phone} />
    </div>
  );
}
