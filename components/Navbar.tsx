"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const LOGO_MARK = "/37years.avif";
const LOGO_WORD = "/task-logo.png";

type NavLink = { label: string; href: string };
type NavGroup = { label: string; links: { href: string; name: string }[] };
type NavItem = NavLink | NavGroup;

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    links: [
      { href: "/leadership", name: "Leadership" },
      { href: "/history", name: "Company History" },
      { href: "/life", name: "Life at the Company" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { href: "/approach", name: "Our Approach" },
      { href: "/stack", name: "Tech Stack" },
      { href: "/certifications", name: "Certifications & Awards" },
    ],
  },
  {
    label: "Stories",
    links: [
      { href: "/news", name: "News Room" },
      { href: "/customers", name: "Customer Stories" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleDropdown = (i: number) => {
    setOpen(open === i ? null : i);
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white text-gray-900 relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image
            src={LOGO_MARK}
            alt="Company Logo Mark"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <Image
            src={LOGO_WORD}
            alt="Company Logo Wordmark"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-8">
          {navItems.map((item, i) =>
            "href" in item ? (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative font-medium hover:text-gray-700 
                             before:absolute before:bottom-0 before:left-0 before:h-[2px] 
                             before:w-full before:origin-left before:scale-x-0 
                             before:bg-black before:transition-transform 
                             before:duration-300 hover:before:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label}>
                <button
                  onClick={() => toggleDropdown(i)}
                  className="flex items-center gap-1 font-medium hover:text-gray-700 relative
                             before:absolute before:bottom-0 before:left-0 before:h-[2px] 
                             before:w-full before:origin-left before:scale-x-0 
                             before:bg-black before:transition-transform 
                             before:duration-300 hover:before:scale-x-100"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      open === i ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Dropdown */}
      <div
        className={`absolute left-0 top-full w-screen overflow-hidden border-t border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out
        ${
          open !== null
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        {open !== null && "links" in navItems[open] && (
          <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {navItems[open].links.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block rounded-md px-4 py-3 text-base font-medium transition-all duration-300 ease-out
                  ${
                    open !== null
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                style={{
                  transitionDelay: `${idx * 50}ms`,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
