"use client";

import { useCart } from "@/context/CartContext";
import { Check } from "@gravity-ui/icons";
import { CartIcon } from "@/components/shared/CartIcon";
import { Button } from "@heroui/react";

export default function AddToCartButton({ recipe, isPurchased = false }) {
  const { addToCart, removeFromCart, isInCart, openCart } = useCart();

  if (isPurchased || !recipe?.price || Number(recipe.price) <= 0) {
    return null;
  }

  const recipeId = recipe._id || recipe.id;
  const inCart = isInCart(recipeId);

  const handleCartAction = () => {
    if (inCart) {
      openCart();
    } else {
      const added = addToCart(recipe);
      if (added) {
        openCart();
      }
    }
  };

  return (
    <Button
      onPress={handleCartAction}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
        inCart
          ? "border border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20"
          : "border border-[#EAE0D3] bg-white text-[#2B2420] hover:border-[#E85D3D] hover:bg-[#FFF9F2] hover:text-[#E85D3D] dark:border-[#3A332A] dark:bg-[#252019] dark:text-[#F4EDE4] dark:hover:border-[#FF7A52] dark:hover:bg-[#1A1714]"
      }`}
    >
      {inCart ? (
        <>
          <Check width={16} height={16} />
          In Cart · View
        </>
      ) : (
        <>
          <CartIcon className="w-4 h-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
