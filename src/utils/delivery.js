const RESTAURANT_COORDS = { latitude: 21.187402, longitude: -86.836798 }

const PRICING_TIERS = [
  { min: 0.0, max: 3.0, base: 40 },
  { min: 3.1, max: 5.0, base: 50 },
  { min: 5.1, max: 7.0, base: 60 },
  { min: 7.1, max: 9.0, base: 70 },
  { min: 9.1, max: 10.9, base: 80 },
  { min: 11.0, max: 11.9, base: 90 },
  { min: 12.0, max: Infinity, base: 100, extra: 10 },
]

export function calculateDistance(lat, lng) {
  const toRad = (x) => (x * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat - RESTAURANT_COORDS.latitude)
  const dLon = toRad(lng - RESTAURANT_COORDS.longitude)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(RESTAURANT_COORDS.latitude)) *
      Math.cos(toRad(lat)) *
      Math.sin(dLon / 2) ** 2
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

export function calculateDeliveryFee(distance) {
  const tier = PRICING_TIERS.find((p) => distance >= p.min && distance <= p.max) || PRICING_TIERS[6]
  if (tier.max === Infinity) {
    return tier.base + Math.ceil(Math.max(0, distance - 12)) * tier.extra
  }
  return tier.base
}

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Tu navegador no soporta geolocalizacion'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  })
}

export function getMapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`
}
