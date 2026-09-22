"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { TrashBin, Xmark, CreditCard, ArrowRight } from "@gravity-ui/icons";
import { CartIcon } from "@/components/shared/CartIcon";
import { Button } from "@heroui/react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState("");

  if (!isCartOpen) return null;

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
      console.error("Cart checkout error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#201B15] border-l border-[#EAE0D3] dark:border-[#3A332A] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EAE0D3] dark:border-[#3A332A] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E85D3D]/10 text-[#E85D3D]">
                <CartIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  Your Recipe Cart
                </h2>
                <p className="text-xs text-[#9C9388]">
                  {totalCount} {totalCount === 1 ? "recipe" : "recipes"} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="rounded-full p-2 text-[#6B6155] hover:bg-[#FBF1E6] hover:text-[#2B2420] dark:text-[#B8AFA2] dark:hover:bg-[#2A241E] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <Xmark width={20} height={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EAE0D3]/60 dark:divide-[#3A332A]/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-20 w-20 rounded-3xl bg-[#FBF1E6] dark:bg-[#2A241E] flex items-center justify-center text-3xl mb-4 text-[#E85D3D]">
                  🍲
                </div>
                <h3 className="text-base font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                  Your cart is empty
                </h3>
                <p className="mt-1.5 text-xs text-[#9C9388] max-w-xs">
                  Discover mouthwatering paid recipes and add them to your cart for instant full access.
                </p>
                <Link
                  href="/all-recipes"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E85D3D] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#D14E30] cursor-pointer"
                >
                  Browse Recipes <ArrowRight width={14} height={14} />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.recipeId} className="py-4 flex gap-3.5 items-center group">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-[#FBF1E6] dark:bg-[#1A1714] shrink-0 border border-[#EAE0D3] dark:border-[#3A332A]">
                    {item.recipeImage ? (
                      <Image
                        src={item.recipeImage}
                        alt={item.recipeName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xl">
                        🍳
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/all-recipes/${item.recipeId}`}
                      onClick={closeCart}
                      className="text-sm font-semibold text-[#2B2420] dark:text-[#F4EDE4] truncate block hover:text-[#E85D3D] dark:hover:text-[#FF7A52] transition-colors"
                    >
                      {item.recipeName}
                    </Link>
                    <p className="text-xs text-[#9C9388] mt-0.5">
                      {item.category} {item.cuisineType ? `• ${item.cuisineType}` : ""}
                    </p>
                    <p className="text-sm font-bold text-[#E85D3D] mt-1">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.recipeId)}
                    className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Remove from cart"
                  >
                    <TrashBin width={16} height={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EAE0D3] dark:border-[#3A332A] bg-[#FFF9F2]/60 dark:bg-[#1A1714]/60">
              {/* Pricing breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-[#6B6155] dark:text-[#B8AFA2]">
                  <span>Subtotal ({totalCount} {totalCount === 1 ? "item" : "items"})</span>
                  <span className="font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#6B6155] dark:text-[#B8AFA2]">
                  <span>Platform Fee / Access</span>
                  <span className="text-emerald-600 font-medium">Included</span>
                </div>
                <div className="border-t border-[#EAE0D3] dark:border-[#3A332A] pt-2 flex justify-between text-base font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  <span>Total Amount</span>
                  <span className="text-[#E85D3D]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="mb-3 rounded-xl bg-red-50 dark:bg-red-950/50 p-2.5 text-xs text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onPress={handleCheckout}
                  isDisabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#E85D3D] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#D14E30] transition-all disabled:opacity-60 cursor-pointer"
                >
                  <CreditCard width={16} height={16} />
                  {isCheckingOut ? "Connecting to Stripe…" : `Checkout · $${totalPrice.toFixed(2)}`}
                </Button>

                <div className="flex items-center justify-between pt-1">
                  <Link
                    href="/dashboard/user/cart"
                    onClick={closeCart}
                    className="text-xs font-medium text-[#6B6155] dark:text-[#B8AFA2] hover:text-[#E85D3D] dark:hover:text-[#FF7A52] transition-colors cursor-pointer"
                  >
                    View Dashboard Cart Page →
                  </Link>

                  <button
                    onClick={clearCart}
                    className="text-xs text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
