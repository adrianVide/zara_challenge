"use client";

import { useRouter } from "next/navigation";
import type { MobilePhone } from "@/types/mobile";

interface MobilePhoneCardProps {
  phone: MobilePhone;
}

export function MobilePhoneCard({ phone }: MobilePhoneCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/phone/${phone.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={phone.imageUrl}
        alt={`${phone.brand} ${phone.name}`}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
          marginBottom: "0.5rem",
        }}
      />
      <h3 style={{ margin: "0.5rem 0", fontSize: "1rem" }}>
        {phone.brand} {phone.name}
      </h3>
      <p
        style={{ margin: "0.5rem 0", fontSize: "1.25rem", fontWeight: "bold" }}
      >
        ${phone.basePrice}
      </p>
    </div>
  );
}
