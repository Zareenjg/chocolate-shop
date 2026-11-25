import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-brown-deep text-cream/85">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-serif text-xl font-semibold text-gold-light">
            chocolate-shop
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cream/70">
            Hand-tempered single-origin chocolates, pralines, and Emirati-inspired
            confections crafted fresh daily. All prices in AED.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Pages
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-gold-light transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-gold-light transition">
                Menu (8 Chocolates)
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-gold-light transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-gold-light transition">
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Boutique & Delivery
          </p>
          <p className="mt-3 text-sm text-cream/75">
            Chilled UAE courier delivery · AED 20 flat rate, complimentary on
            orders of AED 250 or more.
          </p>
          <p className="mt-2 text-xs text-gold-light">
            Daily 10:00 AM – 10:00 PM GST
          </p>
        </div>
      </div>

      <div className="border-t border-gold/15 px-4 py-4 text-center text-xs text-cream/55">
        © 2026 chocolate-shop · Handcrafted in Brown, Cream &amp; Gold
      </div>
    </footer>
  );
}
