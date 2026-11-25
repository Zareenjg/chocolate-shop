"use client";

import { useChocolates } from "@/hooks/useChocolates";
import { ChocolateCard } from "@/components/ChocolateCard";

export function FeaturedChocolates() {
  const { chocolates, source } = useChocolates();
  const featured = chocolates.filter((c) => c.featured);
  const displayList = featured.length > 0 ? featured : chocolates.slice(0, 4);

  return (
    <div>
      {source === "supabase" && (
        <p className="mt-3 text-xs font-medium text-gold-dark">
          ● Live menu synced from Supabase
        </p>
      )}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayList.map((chocolate) => (
          <ChocolateCard key={chocolate.id} chocolate={chocolate} />
        ))}
      </div>
    </div>
  );
}
