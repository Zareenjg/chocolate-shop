"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatAed } from "@/data/chocolates";
import { getSupabaseClient } from "@/lib/supabase";

const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

interface ConfirmedOrder {
  reference: string;
  customerName: string;
  emirate: string;
  totalAed: number;
  itemCount: number;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { items, totalItems, subtotalAed, deliveryFeeAed, totalAed, clearCart } =
    useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emirate, setEmirate] = useState("Dubai");
  const [address, setAddress] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("Same-Day Chilled (4 PM – 8 PM)");
  const [paymentMethod, setPaymentMethod] = useState("Card on Delivery");
  const [giftNote, setGiftNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in your name, email, phone number, and street address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const reference = `CS-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const supabase = getSupabaseClient();
      const { error: insertError } = await supabase.from("orders").insert({
        order_reference: reference,
        customer_name: fullName.trim(),
        customer_email: email.trim(),
        customer_phone: phone.trim(),
        emirate,
        address: address.trim(),
        delivery_slot: deliverySlot,
        payment_method: paymentMethod,
        gift_note: giftNote.trim() || null,
        items: items.map(({ chocolate, quantity }) => ({
          id: chocolate.id,
          name: chocolate.name,
          price_aed: chocolate.priceAed,
          quantity,
          line_total_aed: chocolate.priceAed * quantity,
        })),
        subtotal_aed: subtotalAed,
        delivery_fee_aed: deliveryFeeAed,
        total_aed: totalAed,
        status: "confirmed",
      });

      if (insertError) {
        setError(`Could not save order to Supabase: ${insertError.message}`);
        return;
      }

      setConfirmedOrder({
        reference,
        customerName: fullName.trim(),
        emirate,
        totalAed,
        itemCount: totalItems,
        paymentMethod,
      });
      clearCart();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unexpected error saving your order to Supabase."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-gold/50 bg-brown-deep p-8 text-center text-cream shadow-2xl sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl font-bold text-brown-deep">
            ✓
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
            Order Saved to Supabase
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-cream sm:text-4xl">
            Thank you, {confirmedOrder.customerName}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">
            Your handcrafted chocolates are being prepared in temperature-controlled
            packaging for delivery to{" "}
            <strong className="text-gold-light">{confirmedOrder.emirate}</strong>.
          </p>

          <div className="mt-8 rounded-2xl border border-gold/25 bg-brown-rich/80 p-5 text-left text-sm">
            <div className="flex justify-between py-1.5">
              <span className="text-cream/70">Order Reference</span>
              <span className="font-mono font-bold text-gold-light">
                {confirmedOrder.reference}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-cream/70">Items Ordered</span>
              <span className="font-semibold">{confirmedOrder.itemCount}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-cream/70">Payment Method</span>
              <span className="font-semibold">{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-gold/20 pt-3 text-base font-bold">
              <span>Total Paid / Due</span>
              <span className="text-gold-light">
                {formatAed(confirmedOrder.totalAed)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-brown-deep transition hover:bg-gold-light"
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-gold/50 px-7 py-3 text-sm font-semibold text-cream transition hover:bg-brown-rich"
            >
              Order More Chocolates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="border-b border-cream-border pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-dark">
          Chilled UAE Delivery
        </p>
        <h1 className="mt-1 font-serif text-4xl font-bold text-brown-deep">
          Checkout
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-cream-border bg-cream-soft/70 px-6 py-16 text-center">
          <p className="font-serif text-3xl font-semibold text-brown-deep">
            No items in your cart yet
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-brown-muted">
            Select from our 8 artisanal chocolates in AED before completing
            checkout.
          </p>
          <Link
            href="/menu"
            className="mt-7 inline-block rounded-full bg-brown-deep px-7 py-3.5 text-sm font-semibold text-gold-light transition hover:bg-brown-rich"
          >
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-cream-border bg-white/90 p-6 shadow-sm lg:col-span-2 sm:p-8"
          >
            <h2 className="font-serif text-2xl font-semibold text-brown-deep">
              Delivery &amp; Gift Details
            </h2>

            {error && (
              <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Amina Al Mansoori"
                  className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amina@example.ae"
                  className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
                >
                  UAE Mobile Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="emirate"
                  className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
                >
                  Emirate
                </label>
                <select
                  id="emirate"
                  value={emirate}
                  onChange={(e) => setEmirate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
                >
                  {EMIRATES.map((em) => (
                    <option key={em} value={em}>
                      {em}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
              >
                Street Address / Villa / Apartment *
              </label>
              <input
                id="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Jumeirah 1, Villa 14, Al Wasl Road"
                className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="deliverySlot"
                  className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
                >
                  Preferred Delivery Window
                </label>
                <select
                  id="deliverySlot"
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
                >
                  <option>Same-Day Chilled (4 PM – 8 PM)</option>
                  <option>Next-Day Morning (10 AM – 2 PM)</option>
                  <option>Evening Express (7 PM – 10 PM)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="paymentMethod"
                  className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
                >
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
                >
                  <option>Card on Delivery</option>
                  <option>Cash on Delivery (AED)</option>
                  <option>Online Card Payment</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="giftNote"
                className="block text-xs font-semibold uppercase tracking-wider text-brown-warm"
              >
                Gold-Embossed Gift Note (Optional)
              </label>
              <textarea
                id="giftNote"
                rows={3}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Write a personal message for your gift card..."
                className="mt-1.5 w-full rounded-xl border border-cream-border bg-cream/40 px-4 py-2.5 text-sm text-brown-deep focus:border-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-full bg-brown-deep py-4 text-sm font-bold text-gold-light shadow-md transition hover:bg-brown-rich disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving Order..."
                : `Place Order · ${formatAed(totalAed)}`}
            </button>
          </form>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-gold/40 bg-brown-deep p-6 text-cream shadow-lg">
            <h2 className="font-serif text-2xl font-semibold text-gold-light">
              Your Box ({totalItems})
            </h2>

            <ul className="mt-5 divide-y divide-gold/15 text-sm">
              {items.map(({ chocolate, quantity }) => (
                <li
                  key={chocolate.id}
                  className="flex items-start justify-between gap-3 py-3"
                >
                  <div>
                    <p className="font-medium text-cream">{chocolate.name}</p>
                    <p className="text-xs text-cream/65">
                      Qty {quantity} × {formatAed(chocolate.priceAed)}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold text-gold-light">
                    {formatAed(chocolate.priceAed * quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2.5 border-t border-gold/25 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-cream/75">Subtotal</dt>
                <dd>{formatAed(subtotalAed)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cream/75">Chilled UAE Delivery</dt>
                <dd className="text-gold-light">
                  {deliveryFeeAed === 0 ? "Free" : formatAed(deliveryFeeAed)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gold/25 pt-3 text-base font-bold">
                <dt>Total (AED)</dt>
                <dd className="text-gold-light">{formatAed(totalAed)}</dd>
              </div>
            </dl>

            <Link
              href="/cart"
              className="mt-5 block text-center text-xs font-semibold text-cream/75 underline hover:text-gold-light"
            >
              Edit Cart
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
