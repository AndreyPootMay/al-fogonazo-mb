-- ============================================================
-- AL FOGONAZO - Database Schema for Supabase (PostgreSQL)
-- 100% idempotente: seguro de ejecutar multiples veces
-- ============================================================

-- ============================================================
-- 1. TABLES (IF NOT EXISTS = no falla si ya existen)
-- ============================================================

CREATE TABLE IF NOT EXISTS rewards_tiers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  min_points INT NOT NULL DEFAULT 0,
  discount_percentage DECIMAL(4,2) DEFAULT 0,
  points_multiplier DECIMAL(3,2) DEFAULT 1.00,
  description TEXT,
  benefits TEXT[],
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  rewards_tier_id INT DEFAULT 1 REFERENCES rewards_tiers(id),
  total_points INT DEFAULT 0,
  total_orders INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES product_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  includes TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT,
  delivery_lat DECIMAL(10,7),
  delivery_lng DECIMAL(10,7),
  delivery_distance DECIMAL(5,2),
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  subtotal DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  change_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','preparing','delivering','delivered','cancelled')),
  turnstile_token TEXT,
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  whatsapp_sent_at TIMESTAMPTZ,
  notes TEXT,
  points_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rewards_points (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  points INT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned','redeemed','bonus','expired','adjustment')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rewards_redemptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points_used INT NOT NULL CHECK (points_used > 0),
  reward_type TEXT NOT NULL CHECK (reward_type IN ('discount','free_product','free_delivery')),
  reward_value DECIMAL(10,2),
  reward_description TEXT,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','used','expired','cancelled')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  promo_price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  day_of_week INT CHECK (day_of_week BETWEEN 0 AND 6),
  is_active BOOLEAN DEFAULT TRUE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. INDEXES (IF NOT EXISTS)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_rewards_points_user ON rewards_points(user_id);
CREATE INDEX IF NOT EXISTS idx_rewards_redemptions_user ON rewards_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_promos_day ON promos(day_of_week);
CREATE INDEX IF NOT EXISTS idx_promos_active ON promos(is_active);

-- ============================================================
-- 3. FUNCTIONS (CREATE OR REPLACE = siempre sobrescribe)
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.email, '')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION update_user_tier(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_points INT;
  v_new_tier_id INT;
BEGIN
  v_user_points := (SELECT total_points FROM public.profiles WHERE id = p_user_id);
  v_new_tier_id := (
    SELECT id FROM public.rewards_tiers
    WHERE min_points <= v_user_points
    ORDER BY min_points DESC LIMIT 1
  );
  IF v_new_tier_id IS NOT NULL THEN
    UPDATE public.profiles SET rewards_tier_id = v_new_tier_id WHERE id = p_user_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION award_order_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_base_points INT;
  v_tier_mult DECIMAL(3,2);
  v_final_points INT;
BEGIN
  IF NEW.status = 'delivered' AND OLD.status != 'delivered' AND NEW.user_id IS NOT NULL THEN
    v_base_points := FLOOR(NEW.total / 10);
    v_tier_mult := (
      SELECT rt.points_multiplier
      FROM public.profiles p
      JOIN public.rewards_tiers rt ON p.rewards_tier_id = rt.id
      WHERE p.id = NEW.user_id
    );
    v_tier_mult := COALESCE(v_tier_mult, 1.00);
    v_final_points := CEIL(v_base_points * v_tier_mult);

    INSERT INTO public.rewards_points (user_id, order_id, points, type, description)
    VALUES (NEW.user_id, NEW.id, v_final_points, 'earned',
            'Puntos por pedido #' || LEFT(NEW.id::TEXT, 8));

    UPDATE public.profiles
    SET total_points = total_points + v_final_points,
        total_orders = total_orders + 1
    WHERE id = NEW.user_id;

    NEW.points_earned := v_final_points;
    PERFORM update_user_tier(NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$;

-- ============================================================
-- 4. TRIGGERS (drop + create para evitar duplicados)
-- ============================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

DROP TRIGGER IF EXISTS trg_profiles_updated ON profiles;
CREATE TRIGGER trg_profiles_updated
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated ON products;
CREATE TRIGGER trg_products_updated
  BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_orders_updated ON orders;
CREATE TRIGGER trg_orders_updated
  BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_award_points ON orders;
CREATE TRIGGER trg_award_points
  BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION award_order_points();

-- ============================================================
-- 5. RLS (drop policy + create para evitar "already exists")
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE promos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own profile" ON profiles;
CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON profiles;
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Anyone can view active products" ON products;
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Anyone can view active categories" ON product_categories;
CREATE POLICY "Anyone can view active categories" ON product_categories FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Users view own orders" ON orders;
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Users update own orders" ON orders;
CREATE POLICY "Users update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own order items" ON order_items;
CREATE POLICY "Users view own order items" ON order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
CREATE POLICY "Anyone can create order items" ON order_items FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Anyone can view rewards tiers" ON rewards_tiers;
CREATE POLICY "Anyone can view rewards tiers" ON rewards_tiers FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users view own points" ON rewards_points;
CREATE POLICY "Users view own points" ON rewards_points FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own redemptions" ON rewards_redemptions;
CREATE POLICY "Users view own redemptions" ON rewards_redemptions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users create own redemptions" ON rewards_redemptions;
CREATE POLICY "Users create own redemptions" ON rewards_redemptions FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view active promos" ON promos;
CREATE POLICY "Anyone can view active promos" ON promos FOR SELECT USING (is_active = TRUE);

-- ============================================================
-- 6. SEED DATA (upsert para no destruir datos de usuarios)
-- ============================================================

-- Productos y promos: truncate seguro (no tienen dependencias de usuarios)
TRUNCATE products, product_categories, promos RESTART IDENTITY CASCADE;

-- Tiers: upsert por slug (NO truncate, porque profiles tiene FK a rewards_tiers
-- y CASCADE borraria todos los perfiles de usuario)
INSERT INTO rewards_tiers (id, name, slug, min_points, discount_percentage, points_multiplier, description, benefits, icon, color) VALUES
(1, 'Bronce', 'bronce', 0, 0, 1.00, 'Nivel inicial', ARRAY['Acumula 1 punto por cada $10', 'Acceso a promociones exclusivas'], 'fa-medal', '#CD7F32'),
(2, 'Plata', 'plata', 100, 5, 1.25, 'Nivel Plata', ARRAY['5% de descuento en pedidos', '1.25x multiplicador de puntos', 'Promociones exclusivas Plata'], 'fa-award', '#C0C0C0'),
(3, 'Oro', 'oro', 300, 10, 1.50, 'Nivel Oro', ARRAY['10% de descuento en pedidos', '1.5x multiplicador de puntos', 'Envio gratis en pedidos +$300', 'Acceso anticipado a nuevos productos'], 'fa-crown', '#FFD700'),
(4, 'Platino', 'platino', 600, 15, 2.00, 'Nivel Platino - VIP', ARRAY['15% de descuento en pedidos', '2x multiplicador de puntos', 'Envio gratis siempre', 'Producto gratis en tu cumpleanos', 'Atencion prioritaria'], 'fa-gem', '#E5E4E2')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  min_points = EXCLUDED.min_points,
  discount_percentage = EXCLUDED.discount_percentage,
  points_multiplier = EXCLUDED.points_multiplier,
  description = EXCLUDED.description,
  benefits = EXCLUDED.benefits,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- Asegurar que el serial siga despues del ultimo ID fijo
SELECT setval('rewards_tiers_id_seq', (SELECT MAX(id) FROM rewards_tiers));

-- Categorias
INSERT INTO product_categories (name, slug, icon, display_order) VALUES
('Pollos', 'pollos', 'fa-drumstick-bite', 1),
('Arrachera', 'arrachera', 'fa-fire-flame-curved', 2),
('Papas', 'papas', 'fa-seedling', 3),
('Combos', 'combos', 'fa-layer-group', 4),
('Extras', 'extras', 'fa-plus-circle', 5);

-- Productos
INSERT INTO products (category_id, name, description, includes, price, image_url, display_order) VALUES
(1, 'Pollo Entero', 'Pollo entero asado al carbon estilo Sinaloa, jugoso y con sabor ahumado unico.', '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas', 180.00, '/imagenes_productos/pollo_sinaloa.jpg', 1),
(1, 'Pollo 3/4', 'Tres cuartos de pollo asado al carbon, perfectamente sazonado.', '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas', 150.00, '/imagenes_productos/pollo_sinaloa.jpg', 2),
(1, 'Pollo 1/2', 'Medio pollo asado al carbon con el toque especial del Fogonazo.', '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas', 120.00, '/imagenes_productos/pollo_sinaloa.jpg', 3),
(1, 'Pollo 1/4', 'Un cuarto de pollo asado, ideal para una porcion individual.', '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas', 60.00, '/imagenes_productos/pollo_sinaloa.jpg', 4),
(2, '1/4 kg Arrachera', 'Cuarto de kilo de arrachera premium asada al carbon.', '1 papa asada con crema especial, 1 chile asado, salsa roja, salsa verde, tortillas', 130.00, '/imagenes_productos/arrachera.jpeg', 1),
(2, '1/2 kg Arrachera', 'Medio kilo de arrachera jugosa y perfectamente cocida al carbon.', '1 papa asada con crema especial, 1 chile asado, salsa roja, salsa verde, tortillas', 250.00, '/imagenes_productos/arrachera.jpeg', 2),
(2, '1 kg Arrachera', 'Un kilo completo de nuestra arrachera estrella, ideal para compartir.', '1 papa asada con crema especial, 1 chile asado, salsa roja, salsa verde, tortillas', 380.00, '/imagenes_productos/arrachera.jpeg', 3),
(3, 'Papa Asada con Crema', 'Papa asada al carbon con nuestra crema especial de la casa.', 'Salsa verde', 40.00, '/imagenes_productos/papa_asada_normal.jpeg', 1),
(3, 'Papa Asada con Arrachera', 'Papa asada al carbon con crema especial y generosa porcion de arrachera.', 'Salsa verde', 80.00, '/imagenes_productos/papa_con_arrachera.jpeg', 2),
(4, '1/2 Pollo + 1/4 Arrachera', 'El combo perfecto: medio pollo asado mas un cuarto de kilo de arrachera.', 'Guarniciones respectivas de pollo y arrachera incluidas', 210.00, '/imagenes_productos/pollo_sinaloa.jpg', 1),
(4, '1/2 Arrachera + 1 Papa + 1 Cebolla', 'Combo premium: medio kilo de arrachera con papa asada y cebolla al carbon.', 'Guarniciones respectivas incluidas', 280.00, '/imagenes_productos/arrachera.jpeg', 2),
(5, '1 Cebolla Asada', 'Cebolla entera asada al carbon, caramelizada y deliciosa.', NULL, 30.00, '/imagenes_productos/cebolla_asada.webp', 1),
(5, '1/2 kg Tortilla', 'Medio kilo de tortillas calientitas recien hechas.', NULL, 30.00, '/imagenes_productos/tortilla.webp', 2);

-- Promos diarias
INSERT INTO promos (title, description, promo_price, original_price, day_of_week, image_url) VALUES
('1 Pollo + 1/2 Pollo', 'Viernes de Pollo! Lleva 1 pollo entero + medio pollo a precio especial.', 250.00, 300.00, 5, '/imagenes_productos/pollo_sinaloa.jpg'),
('1/2 Arrachera en $200', 'Lunes de Arrachera! Medio kilo de arrachera con descuento especial.', 200.00, 250.00, 1, '/imagenes_productos/arrachera.jpeg'),
('1/4 Arrachera en $100', 'Lunes de Arrachera! Un cuarto de arrachera a precio de promocion.', 100.00, 130.00, 1, '/imagenes_productos/arrachera.jpeg');
