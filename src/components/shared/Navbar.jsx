"use client";

import { useState } from "react";
import { Button, Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// Import the icon component directly
import { ArrowRightFromSquare } from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const {
    data: session,
    isPending,
  } = authClient.useSession();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const baseNavLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Recipes", href: "/recipes" },
    { label: "Premium", href: "/premium" },
  ];

  const navLinks = [
    ...baseNavLinks,
    ...(session ? [{ label: "Dashboard", href: "/dashboard/user" }] : []),
  ];

  const authSections = (
    <>
      {isPending ? (
        <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
      ) : session ? (
        <div className="flex items-center gap-4 max-md:flex-col max-md:items-start max-md:w-full">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image alt={session.user?.name} src={session.user?.image} />
              <Avatar.Fallback>{session.user?.name?.charAt(0)}</Avatar.Fallback>
            </Avatar>
            <span className="text-sm font-medium text-[#2B2420] md:hidden dark:text-[#F4EDE4]">
              {session.user?.name}
            </span>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="light"
            className="text-sm font-medium text-neutral-500 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 max-md:p-0 h-auto min-w-0 flex items-center gap-1.5"
          >
            {/* Rendered directly as a React component with SVG props */}
            <ArrowRightFromSquare width={16} height={16} className="inline-block" />
            <span>Log out</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4 max-md:w-full">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-[#2B2420] transition-colors hover:text-[#E85D3D] dark:text-[#F4EDE4] dark:hover:text-[#FF7A52]"
          >
            Log in
          </Link>
          <Link href="/auth/register">
            <Button className="rounded-xl bg-[#E85D3D] text-sm font-medium text-white hover:bg-[#D14E30]">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </>
  );

  const navComponent = (
    <>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-[#E85D3D] dark:text-[#F4EDE4] dark:hover:text-[#FF7A52] ${
              pathname === link.href
                ? "bg-[#E85D3D] text-white px-3 py-1 rounded-md hover:text-white/75"
                : "text-[#2B2420]"
            }`}
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
          <button
            className="text-[#2B2420] md:hidden dark:text-[#F4EDE4]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.png" alt="Recipely logo" height={28} width={28} />
            <span className="text-2xl font-bold text-[#E85D3D]">Recipely</span>
          </Link>
        </div>

        <ul className="hidden items-center gap-7 md:flex">{navComponent}</ul>

        <div className="hidden items-center gap-4 md:flex">
          {authSections}
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#EAE0D3] md:hidden dark:border-[#3A332A]">
          <ul className="flex flex-col gap-1 p-4">
            {navComponent}

            <li className="mt-4 border-t border-[#EAE0D3] pt-4 dark:border-[#3A332A]">
              {authSections}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}