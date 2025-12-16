import { getMobilePhoneById } from "@/lib/api/mobile-api";
import type { ProductDetail } from "@/types/mobile";
import Link from "next/link";

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
      <div style={{ padding: "2rem", fontFamily: "monospace" }}>
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
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <Link href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
        ← Back to catalog
      </Link>

      <div
        style={{
          maxWidth: "800px",
          margin: "2rem auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <img
              src={phone.imageUrl}
              alt={`${phone.brand} ${phone.name}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
              }}
            />
          </div>

          <div>
            <h1 style={{ margin: "0 0 1rem 0" }}>
              {phone.brand} {phone.name}
            </h1>

            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              ${phone.basePrice}
            </p>

            {phone.description && (
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                <p style={{ lineHeight: "1.6", margin: 0 }}>{phone.description}</p>
              </div>
            )}

            <div style={{ marginTop: "2rem" }}>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                Details
              </h2>
              <p>
                <strong>Brand:</strong> {phone.brand}
              </p>
              <p>
                <strong>Model:</strong> {phone.name}
              </p>
              <p>
                <strong>ID:</strong> {phone.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
