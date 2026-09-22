"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { TrashBin, CreditCard, ArrowRight, ShieldCheck, Sparkles } from "@gravity-ui/icons";
import { CartIcon } from "@/components/shared/CartIcon";
import { Button } from "@heroui/react";

export default function DashboardCartPage() {
  const { items, removeFromCart, clearCart, totalCount, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setError("");

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchaseType: "cart",
          items: items.map((item) => ({
            recipeId: item.recipeId,
            recipeName: item.recipeName,
            price: item.price,
            recipeImage: item.recipeImage,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Unable to start checkout session.");
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error("Dashboard cart checkout error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#2B2420] dark:text-white">
              Shopping Cart
            </h1>
            {totalCount > 0 && (
              <span className="rounded-full bg-[#E85D3D]/10 px-3 py-1 text-xs font-bold text-[#E85D3D] dark:bg-[#E85D3D]/20">
                {totalCount} {totalCount === 1 ? "recipe" : "recipes"}
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Selected premium recipes ready for checkout and instant access.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="self-start text-xs text-stone-400 hover:text-red-500 transition-colors sm:self-center cursor-pointer"
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#EAE0D3] bg-white p-12 text-center shadow-2xs dark:border-[#3A332A] dark:bg-[#252019]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FBF1E6] text-[#E85D3D] dark:bg-[#1A1714]">
            <CartIcon className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
            Your Dashboard Cart is Empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#9C9388]">
            Browse our curated collection of culinary recipes and add your favorites to checkout all at once.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/all-recipes"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#E85D3D] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#D14E30] active:scale-95 cursor-pointer"
            >
              Browse Recipes <ArrowRight width={16} height={16} />
            </Link>
            <Link
              href="/dashboard/user/purchased"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#EAE0D3] px-6 py-2.5 text-sm font-semibold text-[#2B2420] transition-colors hover:bg-[#FBF1E6] dark:border-[#3A332A] dark:text-[#F4EDE4] dark:hover:bg-[#1A1714] cursor-pointer"
            >
              View Purchased Recipes
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-[#EAE0D3] bg-white shadow-xs dark:border-[#3A332A] dark:bg-[#252019]">
              <div className="border-b border-[#EAE0D3] px-6 py-4 dark:border-[#3A332A]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#9C9388]">
                  Cart Items ({totalCount})
                </h2>
              </div>

              <div className="divide-y divide-[#EAE0D3] dark:divide-[#3A332A]">
                {items.map((item) => (
                  <div
                    key={item.recipeId}
                    className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#EAE0D3] bg-[#FBF1E6] dark:border-[#3A332A] dark:bg-[#1A1714]">
                        {item.recipeImage ? (
                          <Image
                            src={item.recipeImage}
                            alt={item.recipeName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl">
                            🍲
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <Link
                          href={`/all-recipes/${item.recipeId}`}
                          className="text-base font-bold text-[#2B2420] hover:text-[#E85D3D] dark:text-[#F4EDE4] dark:hover:text-[#FF7A52] transition-colors truncate block cursor-pointer"
                        >
                          {item.recipeName}
                        </Link>
                        <p className="mt-0.5 text-xs text-[#9C9388]">
                          {item.cuisineType || "General"} • {item.category || "Dish"}
                          {item.preparationTime ? ` • ${item.preparationTime}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                      <span className="text-lg font-bold text-[#E85D3D]">
                        ${Number(item.price).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.recipeId)}
                        className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <TrashBin width={14} height={14} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-3xl border border-[#EAE0D3] bg-white p-6 shadow-xs dark:border-[#3A332A] dark:bg-[#252019]">
              <h2 className="text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-[#6B6155] dark:text-[#B8AFA2]">
                  <span>Subtotal ({totalCount} items)</span>
                  <span className="font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-[#6B6155] dark:text-[#B8AFA2]">
                  <span>Unlock Fee</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>

                <div className="border-t border-[#EAE0D3] pt-3 dark:border-[#3A332A]">
                  <div className="flex justify-between text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                    <span>Total</span>
                    <span className="text-[#E85D3D]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-950/40 p-3 text-xs text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}

              <Button
                onPress={handleCheckout}
                isDisabled={isCheckingOut}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#E85D3D] py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#D14E30] transition-all disabled:opacity-60 cursor-pointer"
              >
                <CreditCard width={16} height={16} />
                {isCheckingOut ? "Connecting to Stripe…" : `Checkout · $${totalPrice.toFixed(2)}`}
              </Button>

              <div className="mt-6 space-y-2 border-t border-[#EAE0D3] pt-5 text-xs text-[#9C9388] dark:border-[#3A332A]">
                <div className="flex items-center gap-2">
                  <ShieldCheck width={16} height={16} className="text-emerald-600" />
                  <span>Stripe Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles width={16} height={16} className="text-amber-500" />
                  <span>Instant Recipe Access upon checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
