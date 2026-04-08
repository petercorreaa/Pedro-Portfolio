"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-8 py-4 flex items-center justify-between">
      <Link href="/" className="text-white font-bold text-lg tracking-tight">
        Pedro Correa
      </Link>
      <ul className="flex gap-6">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-white font-medium"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
