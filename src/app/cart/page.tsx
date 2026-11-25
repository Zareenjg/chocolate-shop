"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  FREE_DELIVERY_THRESHOLD_AED,
  formatAed,
} from "@/data/chocolates";
import { ChocolateArtwork } from "@/components/ChocolateArtwork";

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotalAed,
    deliveryFeeAed,
    totalAed,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD_AED - subtotalAed
  );
  const progressPct = Math.min(
    100,
    Math.round((subtotalAed / FREE_DELIVERY_THRESHOLD_AED) * 100)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cream-border pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-dark">
            Your Selection
          </p>
          <h1 className="mt-1 font-serif text-4xl font-bold text-brown-deep">
            Shopping Cart
          </h1>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="cursor-pointer text-sm font-medium text-brown-muted underline hover:text-brown-deep"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-cream-border bg-cream-soft/70 px-6 py-16 text-center">
          <p className="font-serif text-3xl font-semibold text-brown-deep">
            Your chocolate box is empty
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-brown-muted">
            Explore our eight signature chocolates—from Dubai Pistachio Kunafa
            bars to Saffron &amp; Cardamom Gold Pralines.
          </p>
          <Link
            href="/menu"
            className="mt-7 inline-block rounded-full bg-brown-deep px-7 py-3.5 text-sm font-semibold text-gold-light transition hover:bg-brown-rich"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Items List */}
          <div className="space-y-4 lg:col-span-2">
            {/* Free delivery progress */}
            <div className="rounded-2xl border border-gold/40 bg-cream-soft/80 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-brown-rich">
                <span>
                  {remainingForFreeDelivery === 0
                    ? "Complimentary chilled UAE delivery unlocked!"
                    : `Add ${formatAed(remainingForFreeDelivery)} more for free UAE delivery`}
                </span>
                <span>{progressPct}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream-border">
                <div
                  className="h-full rounded-full bg-gold transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {items.map(({ chocolate, quantity }) => (
              <div
                key={chocolate.id}
                className="flex flex-col gap-4 rounded-2xl border border-cream-border bg-white/85 p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="w-full overflow-hidden rounded-xl sm:w-36 shrink-0">
                  <ChocolateArtwork
                    variant={chocolate.variant}
                    className="h-28 w-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">
                        {chocolate.category} · {chocolate.weight}
                      </p>
                      <h2 className="font-serif text-xl font-semibold text-brown-deep">
                        {chocolate.name}
                      </h2>
                    </div>
                    <p className="text-base font-bold text-brown-rich">
                      {formatAed(chocolate.priceAed * quantity)}
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-brown-muted">
                    {formatAed(chocolate.priceAed)} each
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-cream-border bg-cream">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${chocolate.name}`}
                        onClick={() =>
                          updateQuantity(chocolate.id, quantity - 1)
                        }
                        className="cursor-pointer px-3.5 py-1.5 text-sm font-bold text-brown-deep hover:text-gold-dark"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-brown-deep">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${chocolate.name}`}
                        onClick={() =>
                          updateQuantity(chocolate.id, quantity + 1)
                        }
                        className="cursor-pointer px-3.5 py-1.5 text-sm font-bold text-brown-deep hover:text-gold-dark"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(chocolate.id)}
                      className="cursor-pointer text-xs font-semibold text-brown-muted hover:text-brown-deep underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-gold/40 bg-brown-deep p-6 text-cream shadow-lg">
            <h2 className="font-serif text-2xl font-semibold text-gold-light">
              Order Summary
            </h2>
            <p className="mt-1 text-xs text-cream/70">
              {totalItems} {totalItems === 1 ? "item" : "items"} in cart
            </p>

            <dl className="mt-6 space-y-3 border-t border-gold/20 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-cream/75">Subtotal</dt>
                <dd className="font-semibold text-cream">
                  {formatAed(subtotalAed)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cream/75">Chilled UAE Delivery</dt>
                <dd className="font-semibold text-gold-light">
                  {deliveryFeeAed === 0 ? "Free" : formatAed(deliveryFeeAed)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gold/20 pt-3 text-base font-bold">
                <dt className="text-cream">Total (AED)</dt>
                <dd className="text-gold-light">{formatAed(totalAed)}</dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-gold py-3.5 text-center text-sm font-bold text-brown-deep transition hover:bg-gold-light"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/menu"
              className="mt-3 block w-full rounded-full border border-gold/40 py-3 text-center text-xs font-semibold text-cream/85 transition hover:border-gold hover:text-gold-light"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
