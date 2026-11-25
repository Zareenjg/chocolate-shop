"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChocolateCategory } from "@/data/chocolates";
import { ChocolateCard } from "@/components/ChocolateCard";
import { useCart } from "@/context/CartContext";
import { useChocolates } from "@/hooks/useChocolates";

const CATEGORIES: Array<"All" | ChocolateCategory> = [
  "All",
  "Signature Bars",
  "Truffles",
  "Pralines",
  "Medallions",
  "Bonbons",
];

type SortOption = "featured" | "price-asc" | "price-desc";

export default function MenuPage() {
  const { chocolates, loading, source, supabaseError } = useChocolates();
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ChocolateCategory
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const { totalItems } = useCart();

  const filteredChocolates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = chocolates.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tastingNotes.some((n) => n.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => a.priceAed - b.priceAed);
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => b.priceAed - a.priceAed);
    }
    return list;
  }, [chocolates, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cream-border pb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-dark">
            Artisanal Collection · {chocolates.length} Chocolates
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-brown-deep sm:text-5xl">
            Our Chocolate Menu
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-brown-muted sm:text-base">
            Every creation is handcrafted in small batches and priced in UAE
            Dirhams (AED).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              loading
                ? "border-cream-border bg-cream-soft text-brown-muted"
                : source === "supabase"
                ? "border-gold/50 bg-cream-soft text-brown-rich"
                : "border-amber-300 bg-amber-50 text-amber-900"
            }`}
          >
            {loading
              ? "Syncing Supabase..."
              : source === "supabase"
              ? "● Live from Supabase"
              : "Preview (Run SQL to Sync)"}
          </span>

          <Link
            href="/cart"
            className="rounded-full border border-gold bg-brown-deep px-5 py-2.5 text-sm font-semibold text-gold-light transition hover:bg-brown-rich"
          >
            View Cart ({totalItems})
          </Link>
        </div>
      </div>

      {!loading && supabaseError && (
        <div className="mt-6 rounded-2xl border border-gold/50 bg-cream-soft px-4 py-3 text-xs text-brown-rich">
          <strong>Supabase note:</strong> {supabaseError} — Showing local preview
          until <code className="font-mono">public.chocolates</code> is created.
        </div>
      )}

      {/* Filters & Search */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-cream-border bg-cream-soft/70 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  active
                    ? "bg-brown-deep text-gold-light shadow-sm"
                    : "border border-cream-border bg-cream text-brown-warm hover:border-gold"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by flavour, pistachio, saffron, dark..."
            className="w-full rounded-xl border border-cream-border bg-white px-4 py-2.5 text-sm text-brown-deep placeholder:text-brown-muted/60 focus:border-gold focus:outline-none sm:max-w-sm"
          />

          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="menu-sort" className="font-medium text-brown-warm">
              Sort:
            </label>
            <select
              id="menu-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-cream-border bg-white px-3 py-2 text-sm text-brown-deep focus:border-gold focus:outline-none"
            >
              <option value="featured">Curated Order</option>
              <option value="price-asc">Price: Low to High (AED)</option>
              <option value="price-desc">Price: High to Low (AED)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredChocolates.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-cream-border bg-cream-soft/60 p-12 text-center">
          <p className="font-serif text-2xl font-semibold text-brown-deep">
            No chocolates match your filter
          </p>
          <p className="mt-2 text-sm text-brown-muted">
            Try clearing your search or selecting &ldquo;All&rdquo; categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-5 cursor-pointer rounded-full bg-brown-deep px-6 py-2.5 text-sm font-semibold text-gold-light hover:bg-brown-rich"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredChocolates.map((chocolate) => (
            <ChocolateCard key={chocolate.id} chocolate={chocolate} />
          ))}
        </div>
      )}
    </div>
  );
}
