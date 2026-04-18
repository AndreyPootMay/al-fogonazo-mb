-- Parche: sincronizar phone/full_name desde auth.users metadata
-- hacia profiles existentes que se crearon sin esos datos.
-- Ejecutar UNA VEZ despues de correr schema.sql

UPDATE public.profiles p
SET
  phone = COALESCE(
    NULLIF(p.phone, ''),
    u.phone,
    u.raw_user_meta_data->>'phone'
  ),
  full_name = COALESCE(
    NULLIF(p.full_name, ''),
    u.raw_user_meta_data->>'full_name'
  ),
  email = COALESCE(
    NULLIF(p.email, ''),
    u.email
  )
FROM auth.users u
WHERE p.id = u.id
  AND (
    p.phone IS NULL OR p.phone = ''
    OR p.full_name IS NULL OR p.full_name = ''
    OR p.email IS NULL OR p.email = ''
  );
