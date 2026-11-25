export type ChocolateCategory =
  | "Signature Bars"
  | "Truffles"
  | "Pralines"
  | "Medallions"
  | "Bonbons";

export type ArtworkVariant =
  | "kunafa"
  | "truffle-dark"
  | "saffron-gold"
  | "caramel-salt"
  | "hazelnut"
  | "date-tahini"
  | "rose-raspberry"
  | "espresso-gold";

export interface Chocolate {
  id: string;
  name: string;
  category: ChocolateCategory;
  priceAed: number;
  weight: string;
  cocoaPercent: string;
  description: string;
  tastingNotes: string[];
  badge?: string;
  featured?: boolean;
  variant: ArtworkVariant;
}

export const CHOCOLATES: Chocolate[] = [
  {
    id: "dubai-pistachio-kunafa",
    name: "Dubai Pistachio Kunafa Bar",
    category: "Signature Bars",
    priceAed: 85,
    weight: "210g",
    cocoaPercent: "54% Milk",
    description:
      "Crisp golden kataifi pastry folded into roasted pistachio cream and wrapped in velvety tempered milk chocolate.",
    tastingNotes: ["Roasted Pistachio", "Toasted Kataifi", "Creamy Cocoa"],
    badge: "Bestseller",
    featured: true,
    variant: "kunafa",
  },
  {
    id: "single-origin-dark-truffles",
    name: "72% Single-Origin Dark Truffles",
    category: "Truffles",
    priceAed: 95,
    weight: "180g · 12 pcs",
    cocoaPercent: "72% Dark",
    description:
      "Hand-rolled Ecuadorian Arriba Nacional ganache spheres dusted in deeply aromatic roasted cocoa powder.",
    tastingNotes: ["Dark Roast", "Dried Fig", "Warm Vanilla"],
    badge: "Chef's Pick",
    featured: true,
    variant: "truffle-dark",
  },
  {
    id: "saffron-cardamom-gold-pralines",
    name: "Saffron & Cardamom Gold Pralines",
    category: "Pralines",
    priceAed: 120,
    weight: "200g · 12 pcs",
    cocoaPercent: "60% Blend",
    description:
      "Infused with steeped Kashmiri saffron threads and crushed green cardamom, crowned with 24k edible gold leaf.",
    tastingNotes: ["Royal Saffron", "Green Cardamom", "24k Gold"],
    badge: "Limited Gold",
    featured: true,
    variant: "saffron-gold",
  },
  {
    id: "salted-caramel-medallions",
    name: "Salted Caramel Sea-Salt Medallions",
    category: "Medallions",
    priceAed: 75,
    weight: "160g · 10 pcs",
    cocoaPercent: "66% Dark",
    description:
      "Slow-cooked amber butter caramel sealed inside crisp dark couverture discs and finished with flaky sea salt.",
    tastingNotes: ["Burnt Sugar", "Flaky Sea Salt", "Bittersweet"],
    featured: true,
    variant: "caramel-salt",
  },
  {
    id: "roasted-hazelnut-gianduja",
    name: "Roasted Hazelnut Gianduja Box",
    category: "Pralines",
    priceAed: 110,
    weight: "220g · 14 pcs",
    cocoaPercent: "48% Milk",
    description:
      "Stone-ground Piedmont hazelnuts blended with caramelized milk chocolate and delicate French feuilletine crunch.",
    tastingNotes: ["Piedmont Hazelnut", "Feuilletine", "Toffee"],
    badge: "Gift Favorite",
    variant: "hazelnut",
  },
  {
    id: "medjool-date-tahini-bonbons",
    name: "Medjool Date & Tahini Bonbons",
    category: "Bonbons",
    priceAed: 90,
    weight: "175g · 12 pcs",
    cocoaPercent: "64% Dark",
    description:
      "Silky Emirati Medjool date caramel balanced by toasted white sesame tahini inside hand-painted bronze shells.",
    tastingNotes: ["Medjool Date", "Toasted Sesame", "Cacao Nib"],
    variant: "date-tahini",
  },
  {
    id: "rosewater-raspberry-truffles",
    name: "Rosewater & Raspberry Velvet Truffles",
    category: "Truffles",
    priceAed: 88,
    weight: "170g · 12 pcs",
    cocoaPercent: "36% Ivory",
    description:
      "Fragrant Damascus rosewater and tart wild raspberry reduction folded into ivory cocoa butter ganache.",
    tastingNotes: ["Damascus Rose", "Wild Raspberry", "Sweet Cream"],
    variant: "rose-raspberry",
  },
  {
    id: "espresso-gold-dust-slab",
    name: "Espresso Bean & Gold Dust Slab",
    category: "Signature Bars",
    priceAed: 68,
    weight: "150g",
    cocoaPercent: "70% Dark",
    description:
      "Artisanal dark chocolate slab studded with caramelized Arabica espresso beans and brushed with warm gold shimmer.",
    tastingNotes: ["Arabica Roast", "Caramel Crunch", "Deep Cacao"],
    variant: "espresso-gold",
  },
];

export const FREE_DELIVERY_THRESHOLD_AED = 250;
export const STANDARD_DELIVERY_FEE_AED = 20;

export function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
