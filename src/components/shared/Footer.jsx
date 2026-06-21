"use client";

import Link from "next/link";
import Image from "next/image";
import { Envelope, Handset, MapPin } from "@gravity-ui/icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Recipes", href: "/recipes" },
  { label: "My Dashboard", href: "/dashboard" },
  { label: "Become Premium", href: "/premium" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.78 8.44-4.94 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2s-.21-1.5-.86-2.16c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.13c-.42.05-1.34.05-2.16.91C2.6 5.7 2.4 7.2 2.4 7.2S2.2 8.96 2.2 10.71v1.58c0 1.75.2 3.51.2 3.51s.21 1.5.86 2.16c.82.86 1.9.83 2.38.92 1.72.17 7.36.22 7.36.22s3.6-.01 6.58-.14c.42-.05 1.34-.05 2.16-.91.65-.66.86-2.16.86-2.16s.2-1.76.2-3.51v-1.58c0-1.75-.2-3.51-.2-3.51ZM9.98 14.65V8.85l5.6 2.9-5.6 2.9Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EAE0D3] bg-[#FFF9F2] text-[#6B6155] dark:border-[#3A332A] dark:bg-[#1A1714] dark:text-[#B8AFA2]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#1A1714]">
                <Image src="/logo.png" width={18} height={18} alt="Recipely logo" />
              </span>
              <span
                className="text-lg font-semibold text-[#2B2420] dark:text-[#F4EDE4]"
              >
                Recipely
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A home for recipes worth keeping. Cook, share, and discover dishes from a
              community that loves food as much as you do.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EAE0D3] transition-colors hover:border-[#FF7A52] hover:text-[#FF7A52] dark:border-[#3A332A]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#2B2420] dark:text-[#F4EDE4]">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#FF7A52]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#2B2420] dark:text-[#F4EDE4]">
              Legal
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#FF7A52]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#2B2420] dark:text-[#F4EDE4]">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Envelope width={16} height={16} className="mt-0.5 shrink-0 text-[#FF7A52]" />
                <a href="mailto:hello@recipely.app" className="hover:text-[#FF7A52]">
                  hello@recipely.app
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Handset width={16} height={16} className="mt-0.5 shrink-0 text-[#FF7A52]" />
                <a href="tel:+8801000000000" className="hover:text-[#FF7A52]">
                  +880 1000-000000
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin width={16} height={16} className="mt-0.5 shrink-0 text-[#FF7A52]" />
                <span>Rangpur, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#EAE0D3] pt-6 sm:flex-row dark:border-[#3A332A]">
          <p className="text-xs text-[#9C9388] dark:text-[#7A7266]">
            © {year} Recipely. All rights reserved.
          </p>
          <p className="text-xs text-[#9C9388] dark:text-[#7A7266]">
            Made with care for people who love to cook.
          </p>
        </div>
      </div>
    </footer>
  );
}