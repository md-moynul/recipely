"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

export default function UpgradeButton({ price }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      // TODO: create a Stripe Checkout session for a ONE-TIME payment
      // (mode: "payment", not "subscription") and redirect, e.g.
      // const { url } = await createCheckoutSession({ planId: "premium" });
      // window.location.href = url;
      console.log("Start one-time Stripe checkout for premium plan");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button
        onPress={handleUpgrade}
        isDisabled={isProcessing}
        className="mt-6 w-full rounded-xl bg-[#E85D3D] py-3 text-sm font-medium text-white transition-colors hover:bg-[#D14E30] disabled:opacity-60"
      >
        {isProcessing ? "Redirecting…" : `Upgrade — Pay $${price} once`}
      </Button>

      <p className="mt-3 text-center text-xs text-[#9C9388]">
        Secure payment via Stripe. No recurring charges.
      </p>
    </>
  );
}