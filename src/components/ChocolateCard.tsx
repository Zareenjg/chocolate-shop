"use client";

import React, { useState } from "react";
import { Chocolate, formatAed } from "@/data/chocolates";
import { useCart } from "@/context/CartContext";
import { ChocolateArtwork } from "@/components/ChocolateArtwork";

export function ChocolateCard({ chocolate }: { chocolate: Chocolate }) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const inCartQty =
    items.find((item) => item.chocolate.id === chocolate.id)?.quantity ?? 0;

  const handleAdd = () => {
    addToCart(chocolate, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-border bg-white/80 shadow-sm transition hover:-translate-y-1 hover:border-gold/70 hover:shadow-lg">
      <div className="relative">
        <ChocolateArtwork variant={chocolate.variant} className="h-48 w-full" />
        <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-brown-deep/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gold-light backdrop-blur-sm">
          {chocolate.category}
        </span>
        {chocolate.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brown-deep shadow-sm">
            {chocolate.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold leading-snug text-brown-deep">
            {chocolate.name}
          </h3>
          <span className="shrink-0 rounded-lg bg-cream-soft px-2.5 py-1 text-sm font-bold text-brown-rich border border-gold/30">
            {formatAed(chocolate.priceAed)}
          </span>
        </div>

        <p className="mt-1.5 text-xs font-medium text-gold-dark">
          {chocolate.cocoaPercent} · {chocolate.weight}
        </p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-brown-muted">
          {chocolate.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {chocolate.tastingNotes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-cream-border bg-cream px-2.5 py-0.5 text-[11px] font-medium text-brown-warm"
            >
              {note}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-cream-border pt-4">
          <span className="text-xs font-medium text-brown-muted">
            {inCartQty > 0 ? `${inCartQty} in cart` : "Ready to ship"}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              justAdded
                ? "bg-gold text-brown-deep"
                : "bg-brown-deep text-cream hover:bg-brown-rich hover:text-gold-light"
            }`}
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
