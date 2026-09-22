"use client";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <CartProvider>
                {children}
            </CartProvider>
        </ThemeProvider>
    );
}