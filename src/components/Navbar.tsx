"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, lastAddedName } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/25 bg-brown-deep/95 text-cream backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-brown-rich font-serif text-lg font-bold text-gold transition group-hover:border-gold group-hover:bg-gold group-hover:text-brown-deep">
            C
          </span>
          <div>
            <span className="block font-serif text-xl font-semibold tracking-wide text-cream">
              chocolate-shop
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-gold-light">
              Artisanal Chocolatier · UAE
            </span>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition sm:px-4 ${
                  active
                    ? "bg-gold text-brown-deep shadow-sm"
                    : "text-cream/85 hover:bg-brown-rich hover:text-gold-light"
                }`}
              >
                <span>{link.label}</span>
                {link.href === "/cart" && totalItems > 0 && (
                  <span
                    className={`ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold ${
                      active
                        ? "bg-brown-deep text-gold-light"
                        : "bg-gold text-brown-deep"
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {lastAddedName && (
        <div className="border-t border-gold/20 bg-brown-rich px-4 py-2 text-center text-xs font-medium text-gold-light">
          Added <span className="font-semibold text-cream">{lastAddedName}</span>{" "}
          to your cart ·{" "}
          <Link href="/cart" className="underline hover:text-gold">
            View Cart ({totalItems})
          </Link>
        </div>
      )}
    </header>
  );
}
