"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("recipely_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("recipely_cart", JSON.stringify(items));
      } catch (err) {
        console.error("Failed to save cart to localStorage:", err);
      }
    }
  }, [items, isInitialized]);

  const addToCart = (recipe) => {
    if (!recipe || (!recipe._id && !recipe.id)) return false;
    const recipeId = String(recipe._id || recipe.id);

    if (items.some((item) => item.recipeId === recipeId)) {
      toast.info("Recipe is already in your cart!");
      return false;
    }

    const newItem = {
      recipeId,
      recipeName: recipe.recipeName || "Recipe",
      recipeImage: recipe.recipeImage || "",
      price: Number(recipe.price || 0),
      category: recipe.category || "General",
      cuisineType: recipe.cuisineType || "",
      preparationTime: recipe.preparationTime || "",
    };

    setItems((prev) => [...prev, newItem]);
    toast.success(`Added "${newItem.recipeName}" to cart! 🛒`);
    return true;
  };

  const removeFromCart = (recipeId) => {
    const idStr = String(recipeId);
    const itemToRemove = items.find((item) => item.recipeId === idStr);
    setItems((prev) => prev.filter((item) => item.recipeId !== idStr));
    if (itemToRemove) {
      toast.info(`Removed "${itemToRemove.recipeName}" from cart.`);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (recipeId) => {
    if (!recipeId) return false;
    const idStr = String(recipeId);
    return items.some((item) => item.recipeId === idStr);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const totalCount = items.length;
  const totalPrice = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
