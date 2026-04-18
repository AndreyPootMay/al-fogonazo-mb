export const categories = [
  { id: 1, name: 'POLLOS', slug: 'pollos', icon: 'fa-drumstick-bite' },
  { id: 2, name: 'ARRACHERA', slug: 'arrachera', icon: 'fa-fire-flame-curved' },
  { id: 3, name: 'PAPAS', slug: 'papas', icon: 'fa-seedling' },
  { id: 4, name: 'COMBOS', slug: 'combos', icon: 'fa-layer-group' },
  { id: 5, name: 'EXTRAS', slug: 'extras', icon: 'fa-plus-circle' },
]

export const products = [
  // Pollos
  {
    id: 1,
    name: 'Pollo Entero',
    description: 'Pollo entero asado al carbon estilo Sinaloa, jugoso y con sabor ahumado unico.',
    includes: '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas',
    price: 180,
    category: 'POLLOS',
    image: '/imagenes_productos/pollo_sinaloa.jpg',
  },
  {
    id: 2,
    name: 'Pollo 3/4',
    description: 'Tres cuartos de pollo asado al carbon, perfectamente sazonado.',
    includes: '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas',
    price: 150,
    category: 'POLLOS',
    image: '/imagenes_productos/pollo_sinaloa.jpg',
  },
  {
    id: 3,
    name: 'Pollo 1/2',
    description: 'Medio pollo asado al carbon con el toque especial del Fogonazo.',
    includes: '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas',
    price: 120,
    category: 'POLLOS',
    image: '/imagenes_productos/pollo_sinaloa.jpg',
  },
  {
    id: 4,
    name: 'Pollo 1/4',
    description: 'Un cuarto de pollo asado, ideal para una porcion individual.',
    includes: '1 cebolla asada, 1 chile asado, salsa roja, salsa verde, tortillas',
    price: 60,
    category: 'POLLOS',
    image: '/imagenes_productos/pollo_sinaloa.jpg',
  },

  // Arrachera
  {
    id: 5,
    name: '1/4 kg Arrachera',
    description: 'Cuarto de kilo de arrachera premium asada al carbon.',
    includes: '1 papa asada con crema especial, 1 chile asado, salsa roja, salsa verde, tortillas',
    price: 130,
    category: 'ARRACHERA',
    image: '/imagenes_productos/arrachera.jpeg',
  },
  {
    id: 6,
    name: '1/2 kg Arrachera',
    description: 'Medio kilo de arrachera jugosa y perfectamente cocida al carbon.',
    includes: '1 papa asada con crema especial, 1 chile asado, salsa roja, salsa verde, tortillas',
    price: 250,
    category: 'ARRACHERA',
    image: '/imagenes_productos/arrachera.jpeg',
  },
  {
    id: 7,
    name: '1 kg Arrachera',
    description: 'Un kilo completo de nuestra arrachera estrella, ideal para compartir.',
    includes: '1 papa asada con crema especial, 1 chile asado, salsa roja, salsa verde, tortillas',
    price: 380,
    category: 'ARRACHERA',
    image: '/imagenes_productos/arrachera.jpeg',
  },

  // Papas
  {
    id: 8,
    name: 'Papa Asada con Crema',
    description: 'Papa asada al carbon con nuestra crema especial de la casa.',
    includes: 'Salsa verde',
    price: 40,
    category: 'PAPAS',
    image: '/imagenes_productos/papa_asada_normal.jpeg',
  },
  {
    id: 9,
    name: 'Papa Asada con Arrachera',
    description: 'Papa asada al carbon con crema especial y generosa porcion de arrachera.',
    includes: 'Salsa verde',
    price: 80,
    category: 'PAPAS',
    image: '/imagenes_productos/papa_con_arrachera.jpeg',
  },

  // Combos
  {
    id: 10,
    name: '1/2 Pollo + 1/4 Arrachera',
    description: 'El combo perfecto: medio pollo asado mas un cuarto de kilo de arrachera.',
    includes: 'Guarniciones respectivas de pollo y arrachera incluidas',
    price: 210,
    category: 'COMBOS',
    image: '/imagenes_productos/pollo_sinaloa.jpg',
  },
  {
    id: 11,
    name: '1/2 Arrachera + 1 Papa + 1 Cebolla',
    description: 'Combo premium: medio kilo de arrachera con papa asada y cebolla al carbon.',
    includes: 'Guarniciones respectivas incluidas',
    price: 280,
    category: 'COMBOS',
    image: '/imagenes_productos/arrachera.jpeg',
  },

  // Extras
  {
    id: 12,
    name: '1 Cebolla Asada',
    description: 'Cebolla entera asada al carbon, caramelizada y deliciosa.',
    includes: null,
    price: 30,
    category: 'EXTRAS',
    image: '/imagenes_productos/cebolla_asada.webp',
  },
  {
    id: 13,
    name: '1/2 kg Tortilla',
    description: 'Medio kilo de tortillas calientitas recien hechas.',
    includes: null,
    price: 30,
    category: 'EXTRAS',
    image: '/imagenes_productos/tortilla.webp',
  },
]

export const dayPromos = [
  {
    id: 1,
    title: '1 Pollo + 1/2 Pollo',
    description: 'Viernes de Pollo! Lleva 1 pollo entero + medio pollo a precio especial.',
    promoPrice: 250,
    originalPrice: 300,
    dayOfWeek: 5, // Friday
    image: '/imagenes_productos/pollo_sinaloa.jpg',
  },
  {
    id: 2,
    title: '1/2 Arrachera en $200',
    description: 'Lunes de Arrachera! Medio kilo de arrachera con descuento especial.',
    promoPrice: 200,
    originalPrice: 250,
    dayOfWeek: 1, // Monday
    image: '/imagenes_productos/arrachera.jpeg',
  },
  {
    id: 3,
    title: '1/4 Arrachera en $100',
    description: 'Lunes de Arrachera! Un cuarto de arrachera a precio de promocion.',
    promoPrice: 100,
    originalPrice: 130,
    dayOfWeek: 1, // Monday
    image: '/imagenes_productos/arrachera.jpeg',
  },
]
