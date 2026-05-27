export interface User {
  id: string
  name: string
  phone: string
  avatar: string
  rating: number
  role: 'customer' | 'driver'
}

export interface LatLng {
  latitude: number
  longitude: number
}

export interface Driver {
  id: string
  name: string
  rating: number
  carModel: string
  plate: string
  avatar: string
  coords: LatLng
  isAvailable: boolean
}

export interface Order {
  id: string
  customerId: string
  driverId?: string
  pickup: { address: string; coords: LatLng }
  dropoff: { address: string; coords: LatLng }
  vehicleType: 'bike' | 'car' | 'van'
  status: 'idle' | 'searching' | 'confirmed' | 'in_progress' | 'delivered'
  price: number
  distance: number
  eta: number
  createdAt: string
}

export interface Earnings {
  date: string
  amount: number
  trips: number
}
