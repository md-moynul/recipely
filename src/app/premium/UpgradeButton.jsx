"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

export default function UpgradeButton({ price, planId = "premium" }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const planName = "Recipely Premium Plan";
    const planDescription = "One-time upgrade for premium recipes and AI features";

    const handleUpgrade = async () => {
        setIsProcessing(true);
        try {

            const response = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: price,
                    productName: planName,
                    productDesc: planDescription,
                    purchaseType: "premium",
                    planId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                }
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Something went wrong");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Checkout Error:", error);
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