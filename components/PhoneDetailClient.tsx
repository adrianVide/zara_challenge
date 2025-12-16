'use client';

import { useState } from 'react';
import type { ProductDetail } from '@/types/mobile';

interface PhoneDetailClientProps {
  phone: ProductDetail;
}

export function PhoneDetailClient({ phone }: PhoneDetailClientProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);

  const selectedColor = phone.colorOptions[selectedColorIndex];
  const selectedStorage = phone.storageOptions[selectedStorageIndex];
  const currentPrice = selectedStorage?.price || phone.basePrice;

  return (
    <div
      style={{
        maxWidth: "1200px",
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
          gap: "3rem",
        }}
      >
        {/* Left side - Image */}
        <div>
          <img
            src={selectedColor?.imageUrl || phone.colorOptions[0]?.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "contain",
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "1rem",
            }}
          />
        </div>

        {/* Right side - Details */}
        <div>
          <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
            {phone.brand} {phone.name}
          </h1>

          {phone.rating && (
            <div style={{ marginBottom: "1rem", color: "#666" }}>
              ⭐ {phone.rating.toFixed(1)} / 5
            </div>
          )}

          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              margin: "1rem 0",
              color: "#0070f3",
            }}
          >
            ${currentPrice}
          </p>

          {phone.description && (
            <p style={{ lineHeight: "1.6", margin: "1rem 0", color: "#555" }}>
              {phone.description}
            </p>
          )}

          {/* Color Selector */}
          {phone.colorOptions && phone.colorOptions.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
                Color: <strong>{selectedColor?.name}</strong>
              </h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {phone.colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: color.hexCode,
                      border:
                        selectedColorIndex === index
                          ? "3px solid #0070f3"
                          : "2px solid #ddd",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Storage Selector */}
          {phone.storageOptions && phone.storageOptions.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
                Storage: <strong>{selectedStorage?.capacity}</strong>
              </h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {phone.storageOptions.map((storage, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStorageIndex(index)}
                    style={{
                      padding: "0.75rem 1rem",
                      border:
                        selectedStorageIndex === index
                          ? "2px solid #0070f3"
                          : "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor:
                        selectedStorageIndex === index ? "#e6f2ff" : "white",
                      cursor: "pointer",
                      fontWeight: selectedStorageIndex === index ? "bold" : "normal",
                    }}
                  >
                    <div>{storage.capacity}</div>
                    <div style={{ fontSize: "0.875rem", color: "#666" }}>
                      ${storage.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Specs Section */}
      {phone.specs && (
        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Technical Specifications
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {phone.specs.screen && (
              <div>
                <strong>Screen:</strong> {phone.specs.screen}
              </div>
            )}
            {phone.specs.resolution && (
              <div>
                <strong>Resolution:</strong> {phone.specs.resolution}
              </div>
            )}
            {phone.specs.screenRefreshRate && (
              <div>
                <strong>Refresh Rate:</strong> {phone.specs.screenRefreshRate}
              </div>
            )}
            {phone.specs.processor && (
              <div>
                <strong>Processor:</strong> {phone.specs.processor}
              </div>
            )}
            {phone.specs.mainCamera && (
              <div>
                <strong>Main Camera:</strong> {phone.specs.mainCamera}
              </div>
            )}
            {phone.specs.selfieCamera && (
              <div>
                <strong>Selfie Camera:</strong> {phone.specs.selfieCamera}
              </div>
            )}
            {phone.specs.battery && (
              <div>
                <strong>Battery:</strong> {phone.specs.battery}
              </div>
            )}
            {phone.specs.os && (
              <div>
                <strong>OS:</strong> {phone.specs.os}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Similar Products Section */}
      {phone.similarProducts && phone.similarProducts.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            Similar Products
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {phone.similarProducts.map((product) => (
              <a
                key={product.id}
                href={`/phone/${product.id}`}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.name}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "0.5rem",
                  }}
                />
                <h3 style={{ margin: "0.5rem 0", fontSize: "1rem" }}>
                  {product.brand} {product.name}
                </h3>
                <p style={{ margin: "0.5rem 0", fontSize: "1.25rem", fontWeight: "bold" }}>
                  ${product.basePrice}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
