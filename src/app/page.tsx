import Link from "next/link";
import { formatAed } from "@/data/chocolates";
import { HeroArtwork } from "@/components/ChocolateArtwork";
import { FeaturedChocolates } from "@/components/FeaturedChocolates";

export default function HomePage() {
  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brown-deep via-brown-rich to-[#1a0d08] text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-brown-deep/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
              Crafted in Dubai · Priced in AED
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl">
              Velvet Cocoa,{" "}
              <span className="text-gold-light">Warm Cream</span> &amp;{" "}
              <span className="text-gold">24k Gold</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Welcome to <strong className="text-gold-light">chocolate-shop</strong>.
              Discover eight small-batch artisanal confections—from crisp Dubai
              pistachio kunafa bars to Kashmiri saffron pralines—tempered fresh
              every morning.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-brown-deep shadow-lg transition hover:bg-gold-light"
              >
                Explore Full Menu (8)
              </Link>
              <Link
                href="/cart"
                className="rounded-full border border-gold/50 px-7 py-3.5 text-sm font-semibold text-cream transition hover:border-gold hover:bg-brown-warm/50 hover:text-gold-light"
              >
                View Cart
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-gold/20 pt-6">
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/60">
                  Signature Items
                </dt>
                <dd className="mt-1 font-serif text-2xl font-bold text-gold-light">
                  8 Creations
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/60">
                  Starting From
                </dt>
                <dd className="mt-1 font-serif text-2xl font-bold text-gold-light">
                  {formatAed(68)}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/60">
                  Free Delivery
                </dt>
                <dd className="mt-1 font-serif text-2xl font-bold text-gold-light">
                  {formatAed(250)}+
                </dd>
              </div>
            </dl>
          </div>

          <HeroArtwork />
        </div>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Single-Origin Couverture",
              body: "Stone-ground Ecuadorian and West African cacao beans tempered for a crisp snap and glossy satin sheen.",
            },
            {
              title: "Emirati Botanicals",
              body: "Infused with roasted Iranian pistachios, Kashmiri saffron, Medjool date caramel, and Damascus rosewater.",
            },
            {
              title: "Chilled UAE Courier",
              body: "Temperature-controlled delivery across all seven Emirates—complimentary on orders of AED 250 or above.",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-cream-border bg-cream-soft/70 p-6"
            >
              <div className="mb-3 h-1 w-12 rounded-full bg-gold" />
              <h2 className="font-serif text-xl font-semibold text-brown-deep">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brown-muted">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Selection */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cream-border pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-dark">
              Curated Highlights
            </p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-brown-deep sm:text-4xl">
              Signature Chocolates
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-sm font-semibold text-brown-rich underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
          >
            See all 8 chocolates →
          </Link>
        </div>

        <FeaturedChocolates />
      </section>

      {/* Gifting Banner */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-gold/40 bg-gradient-to-r from-brown-deep to-brown-warm p-8 text-cream sm:flex-row sm:items-center sm:p-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Bespoke Gift Boxes
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cream">
              Ready to Curate Your Box?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/80">
              Mix truffles, kunafa bars, and gold-leaf pralines in your cart,
              add a personal gift note, and check out in seconds.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-brown-deep transition hover:bg-gold-light"
            >
              Browse Menu
            </Link>
            <Link
              href="/checkout"
              className="rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-brown-deep"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
