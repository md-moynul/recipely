"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Recipes", href: "/recipes" },
    { label: "Premium", href: "/premium" },
  ];

  const navComponent = (
    <>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm font-medium text-[#2B2420] transition-colors hover:text-[#E85D3D] dark:text-[#F4EDE4] dark:hover:text-[#FF7A52]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#EAE0D3] bg-[#FFF9F2]/80 backdrop-blur-lg dark:border-[#3A332A] dark:bg-[#1A1714]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            className="text-[#2B2420] md:hidden dark:text-[#F4EDE4]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Recipely logo" height={28} width={28} />
            <span className="text-lg font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
              Recipely
            </span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-7 md:flex">{navComponent}</ul>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-[#2B2420] transition-colors hover:text-[#E85D3D] dark:text-[#F4EDE4] dark:hover:text-[#FF7A52]"
          >
            Log in
          </Link>
          <Button
            as={Link}
            href="/auth/register"
            className="rounded-xl bg-[#E85D3D] px-5 text-sm font-medium text-white hover:bg-[#D14E30]"
          >
            Sign up
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-[#EAE0D3] md:hidden dark:border-[#3A332A]">
          <ul className="flex flex-col gap-1 p-4">
            {navComponent}
            <li className="mt-4 flex flex-col gap-3 border-t border-[#EAE0D3] pt-4 dark:border-[#3A332A]">
              <Link
                href="/auth/login"
                className="py-1 text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]"
              >
                Log in
              </Link>
              <Button
                as={Link}
                href="/auth/register"
                className="w-full rounded-xl bg-[#E85D3D] text-sm font-medium text-white hover:bg-[#D14E30]"
              >
                Sign up
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}