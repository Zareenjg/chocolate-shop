"use client";

import { useEffect, useState } from "react";
import {
  ArtworkVariant,
  CHOCOLATES,
  Chocolate,
  ChocolateCategory,
} from "@/data/chocolates";
import { getSupabaseClient } from "@/lib/supabase";

interface ChocolateRow {
  id: string;
  name: string;
  category: string;
  price_aed: number | string;
  weight: string;
  cocoa_percent: string;
  description: string;
  tasting_notes: string[] | null;
  badge: string | null;
  featured: boolean | null;
  variant: string;
}

function mapRowToChocolate(row: ChocolateRow): Chocolate {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ChocolateCategory,
    priceAed: Number(row.price_aed),
    weight: row.weight,
    cocoaPercent: row.cocoa_percent,
    description: row.description,
    tastingNotes: Array.isArray(row.tasting_notes) ? row.tasting_notes : [],
    badge: row.badge ?? undefined,
    featured: Boolean(row.featured),
    variant: row.variant as ArtworkVariant,
  };
}

export function useChocolates() {
  const [chocolates, setChocolates] = useState<Chocolate[]>(CHOCOLATES);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"supabase" | "fallback">("fallback");
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("chocolates")
          .select(
            "id, name, category, price_aed, weight, cocoa_percent, description, tasting_notes, badge, featured, variant"
          )
          .order("sort_order", { ascending: true });

        if (cancelled) return;

        if (error) {
          setSupabaseError(error.message);
          setSource("fallback");
          setChocolates(CHOCOLATES);
          return;
        }

        if (data && data.length > 0) {
          setChocolates((data as ChocolateRow[]).map(mapRowToChocolate));
          setSource("supabase");
          setSupabaseError(null);
        } else {
          setSupabaseError(
            "The Supabase chocolates table is empty. Run the SQL seed script to populate it."
          );
          setSource("fallback");
          setChocolates(CHOCOLATES);
        }
      } catch (err) {
        if (cancelled) return;
        setSupabaseError(
          err instanceof Error ? err.message : "Failed to connect to Supabase."
        );
        setSource("fallback");
        setChocolates(CHOCOLATES);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { chocolates, loading, source, supabaseError };
}
