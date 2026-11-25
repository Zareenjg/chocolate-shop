-- ============================================================
-- chocolate-shop Supabase Schema & Seed Data
-- Run this in your Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. Chocolates Menu Table
CREATE TABLE IF NOT EXISTS public.chocolates (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price_aed numeric(10, 2) NOT NULL CHECK (price_aed > 0),
  weight text NOT NULL,
  cocoa_percent text NOT NULL,
  description text NOT NULL,
  tasting_notes text[] NOT NULL DEFAULT '{}',
  badge text,
  featured boolean NOT NULL DEFAULT false,
  variant text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_reference text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  emirate text NOT NULL,
  address text NOT NULL,
  delivery_slot text NOT NULL,
  payment_method text NOT NULL,
  gift_note text,
  items jsonb NOT NULL,
  subtotal_aed numeric(10, 2) NOT NULL,
  delivery_fee_aed numeric(10, 2) NOT NULL,
  total_aed numeric(10, 2) NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.chocolates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read chocolates" ON public.chocolates;
CREATE POLICY "Allow public read chocolates"
  ON public.chocolates
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public insert orders" ON public.orders;
CREATE POLICY "Allow public insert orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Seed the 8 Sample Chocolates (prices in AED)
INSERT INTO public.chocolates (
  id, name, category, price_aed, weight, cocoa_percent,
  description, tasting_notes, badge, featured, variant, sort_order
)
VALUES
  (
    'dubai-pistachio-kunafa',
    'Dubai Pistachio Kunafa Bar',
    'Signature Bars',
    85.00,
    '210g',
    '54% Milk',
    'Crisp golden kataifi pastry folded into roasted pistachio cream and wrapped in velvety tempered milk chocolate.',
    ARRAY['Roasted Pistachio', 'Toasted Kataifi', 'Creamy Cocoa'],
    'Bestseller',
    true,
    'kunafa',
    1
  ),
  (
    'single-origin-dark-truffles',
    '72% Single-Origin Dark Truffles',
    'Truffles',
    95.00,
    '180g · 12 pcs',
    '72% Dark',
    'Hand-rolled Ecuadorian Arriba Nacional ganache spheres dusted in deeply aromatic roasted cocoa powder.',
    ARRAY['Dark Roast', 'Dried Fig', 'Warm Vanilla'],
    'Chef''s Pick',
    true,
    'truffle-dark',
    2
  ),
  (
    'saffron-cardamom-gold-pralines',
    'Saffron & Cardamom Gold Pralines',
    'Pralines',
    120.00,
    '200g · 12 pcs',
    '60% Blend',
    'Infused with steeped Kashmiri saffron threads and crushed green cardamom, crowned with 24k edible gold leaf.',
    ARRAY['Royal Saffron', 'Green Cardamom', '24k Gold'],
    'Limited Gold',
    true,
    'saffron-gold',
    3
  ),
  (
    'salted-caramel-medallions',
    'Salted Caramel Sea-Salt Medallions',
    'Medallions',
    75.00,
    '160g · 10 pcs',
    '66% Dark',
    'Slow-cooked amber butter caramel sealed inside crisp dark couverture discs and finished with flaky sea salt.',
    ARRAY['Burnt Sugar', 'Flaky Sea Salt', 'Bittersweet'],
    NULL,
    true,
    'caramel-salt',
    4
  ),
  (
    'roasted-hazelnut-gianduja',
    'Roasted Hazelnut Gianduja Box',
    'Pralines',
    110.00,
    '220g · 14 pcs',
    '48% Milk',
    'Stone-ground Piedmont hazelnuts blended with caramelized milk chocolate and delicate French feuilletine crunch.',
    ARRAY['Piedmont Hazelnut', 'Feuilletine', 'Toffee'],
    'Gift Favorite',
    false,
    'hazelnut',
    5
  ),
  (
    'medjool-date-tahini-bonbons',
    'Medjool Date & Tahini Bonbons',
    'Bonbons',
    90.00,
    '175g · 12 pcs',
    '64% Dark',
    'Silky Emirati Medjool date caramel balanced by toasted white sesame tahini inside hand-painted bronze shells.',
    ARRAY['Medjool Date', 'Toasted Sesame', 'Cacao Nib'],
    NULL,
    false,
    'date-tahini',
    6
  ),
  (
    'rosewater-raspberry-truffles',
    'Rosewater & Raspberry Velvet Truffles',
    'Truffles',
    88.00,
    '170g · 12 pcs',
    '36% Ivory',
    'Fragrant Damascus rosewater and tart wild raspberry reduction folded into ivory cocoa butter ganache.',
    ARRAY['Damascus Rose', 'Wild Raspberry', 'Sweet Cream'],
    NULL,
    false,
    'rose-raspberry',
    7
  ),
  (
    'espresso-gold-dust-slab',
    'Espresso Bean & Gold Dust Slab',
    'Signature Bars',
    68.00,
    '150g',
    '70% Dark',
    'Artisanal dark chocolate slab studded with caramelized Arabica espresso beans and brushed with warm gold shimmer.',
    ARRAY['Arabica Roast', 'Caramel Crunch', 'Deep Cacao'],
    NULL,
    false,
    'espresso-gold',
    8
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  price_aed = EXCLUDED.price_aed,
  weight = EXCLUDED.weight,
  cocoa_percent = EXCLUDED.cocoa_percent,
  description = EXCLUDED.description,
  tasting_notes = EXCLUDED.tasting_notes,
  badge = EXCLUDED.badge,
  featured = EXCLUDED.featured,
  variant = EXCLUDED.variant,
  sort_order = EXCLUDED.sort_order;
