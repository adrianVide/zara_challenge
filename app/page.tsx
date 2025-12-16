import { getMobilePhones } from "@/lib/api/mobile-api";
import type { MobilePhone } from "@/types/mobile";

export const revalidate = 60;

export default async function Home() {
  let mobilePhones: MobilePhone[] = [];
  let error: string | null = null;

  try {
    mobilePhones = await getMobilePhones({ limit: 20 });
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch mobile phones";
    console.error("Error in Home page:", err);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Mobile Phones API Response</h1>
      {JSON.stringify(mobilePhones, null, 2)}
    </div>
  );
}
