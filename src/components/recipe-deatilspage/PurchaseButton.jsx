"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CreditCard } from "@gravity-ui/icons";

export default function PurchaseButton({ recipeId, isPurchased = false, price }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchased, setPurchased] = useState(isPurchased);

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      // TODO: redirect to your Stripe Checkout session here, e.g.
      // const { url } = await createCheckoutSession(recipeId);
      // window.location.href = url;
      console.log("Start Stripe checkout for", recipeId);
      setPurchased(true);
    } finally {
      setIsProcessing(false);
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
    <Button
      onPress={handlePurchase}
      isDisabled={isProcessing}
      className="flex items-center gap-1.5 rounded-full bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30] disabled:opacity-60"
    >
      <CreditCard width={16} height={16} />
      {isProcessing ? "Processing…" : price ? `Purchase · $${price}` : "Purchase Recipe"}
    </Button>
  );
}