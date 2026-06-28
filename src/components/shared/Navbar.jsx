"use client";
import { useState, useEffect, useRef } from "react";
import { Button, Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, LayoutCellsLarge, PersonFill } from "@gravity-ui/icons";
import ThemeSwitch from "../ThemeSwitch";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuRef = useRef(null);
  const modalRef = useRef(null);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsProfileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseNavLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Recipes", href: "/all-recipes" },
  ];

  const navLinks = [
    ...baseNavLinks,
    ...(session ? [{ label: "Dashboard", href: `/dashboard/${session.user.role}` }] : []),
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#EAE0D3] bg-[#FFF9F2]/80 backdrop-blur-lg dark:border-[#3A332A] dark:bg-[#1A1714]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo + Hamburger Button */}
        <div className="flex items-center gap-4">
          <button
            className="text-[#2B2420] md:hidden dark:text-[#F4EDE4]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> // X Icon
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> // Hamburger
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.png" alt="Recipely logo" height={28} width={28} />
            <span className="text-2xl font-bold text-[#E85D3D]">Recipely</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#E85D3D] dark:text-[#F4EDE4] dark:hover:text-[#FF7A52] ${
                  pathname === link.href ? "bg-[#E85D3D] text-white px-3 py-1 rounded-md" : "text-[#2B2420]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ThemeSwitch />

          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
          ) : session ? (
            <div className="relative" ref={modalRef}>
              <button onClick={() => setIsProfileModalOpen(!isProfileModalOpen)} className="cursor-pointer">
                <Avatar size="sm">
                  <Avatar.Image alt={session.user?.name} src={session.user?.image} />
                  <Avatar.Fallback>{session.user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </button>

              {/* Profile Modal */}
              {isProfileModalOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {/* ... same modal content as before ... */}
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                  </div>

                  <div className="py-1">
                    <Link href={`/dashboard/${session.user.role}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => setIsProfileModalOpen(false)}>
                      <LayoutCellsLarge className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => setIsProfileModalOpen(false)}>
                      <PersonFill className="w-5 h-5" />
                      Profile
                    </Link>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-1 mt-1">
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                      <ArrowRightFromSquare className="w-5 h-5" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/register" className="hidden md:block text-sm font-medium hover:text-[#E85D3D] dark:hover:text-[#FF7A52]">
               Register
              </Link>
              <Link href="/auth/login">
                <Button className="rounded-xl bg-[#E85D3D] text-sm font-medium text-white hover:bg-[#D14E30] ">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" ref={menuRef}>
          <div className="border-t border-[#EAE0D3] ">
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="block py-3 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}