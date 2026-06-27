"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CreditCard } from "@gravity-ui/icons";

export default function PurchaseButton({ recipeId, isPurchased = false, price }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchased, setPurchased] = useState(isPurchased);
  const [error, setError] = useState("");
  
  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
          productName: "Recipe Purchase",
          productDesc: `Unlock full access to this recipe`,
          purchaseType: "recipe",
          recipeId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
          return; // Navigating away; keep isProcessing true
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
      setPurchased(false);
    }
  };

  if (purchased) {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-[#2D5A3D]/30 bg-[#2D5A3D]/10 px-4 py-2 text-sm font-medium text-[#2D5A3D]">
        <CreditCard width={16} height={16} />
        Purchased
      </span>
    );
  }

  return (
    <div>


      <Button
        onPress={handlePurchase}
        isDisabled={isProcessing}
        className="flex items-center gap-1.5 rounded-full bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30] disabled:opacity-60"
      >
        <CreditCard width={16} height={16} />
        {isProcessing ? "Processing…" : price ? `Purchase · $${price}` : "Purchase Recipe"}
      </Button>
      {error && (
        <p className="mt-2 text-xs text-[#D64545]">{error}</p>
      )}
    </div>
  );
}