import { create } from 'zustand'
import { Order, Driver, LatLng } from '../types'
import { mockDrivers } from '../mock/mockDrivers'

interface OrderState {
  currentOrder: Order | null
  orderStatus: Order['status']
  assignedDriver: Driver | null
  routeCoords: LatLng[]
  driverCoords: LatLng
  movementInterval: ReturnType<typeof setInterval> | null
  placeOrder: (details: Partial<Order>) => void
  updateStatus: (status: Order['status']) => void
  mockDriverMovement: () => void
  cancelOrder: () => void
  setRouteCoords: (coords: LatLng[]) => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
  currentOrder: null,
  orderStatus: 'idle',
  assignedDriver: null,
  routeCoords: [],
  driverCoords: { latitude: 49.9935, longitude: 36.2304 },
  movementInterval: null,

  placeOrder: (details) => {
    const driver = mockDrivers.find((d) => d.isAvailable) ?? mockDrivers[0]
    const order: Order = {
      id: `o_${Date.now()}`,
      customerId: 'u1',
      driverId: driver.id,
      pickup: details.pickup ?? { address: 'майдан Свободи, 1', coords: { latitude: 49.9946, longitude: 36.2314 } },
      dropoff: details.dropoff ?? { address: 'просп. Науки, 4', coords: { latitude: 50.0012, longitude: 36.2284 } },
      vehicleType: details.vehicleType ?? 'car',
      status: 'confirmed',
      price: details.price ?? 78,
      distance: details.distance ?? 3.0,
      eta: details.eta ?? 11,
      createdAt: new Date().toISOString(),
    }
    set({
      currentOrder: order,
      orderStatus: 'confirmed',
      assignedDriver: driver,
      driverCoords: driver.coords,
    })
  },

  updateStatus: (status) => {
    set({ orderStatus: status })
    set((s) => ({ currentOrder: s.currentOrder ? { ...s.currentOrder, status } : null }))
  },

  setRouteCoords: (coords) => set({ routeCoords: coords }),

  mockDriverMovement: () => {
    const { movementInterval } = get()
    if (movementInterval) clearInterval(movementInterval)

    let step = 0
    const interval = setInterval(() => {
      const { driverCoords, currentOrder, routeCoords } = get()
      if (!currentOrder) { clearInterval(interval); return }

      const target = currentOrder.dropoff.coords
      const coords = routeCoords.length > step + 1 ? routeCoords[step + 1] : target

      const newLat = driverCoords.latitude + (coords.latitude - driverCoords.latitude) * 0.3
      const newLng = driverCoords.longitude + (coords.longitude - driverCoords.longitude) * 0.3

      set({ driverCoords: { latitude: newLat, longitude: newLng } })
      step++

      const dist = Math.abs(newLat - target.latitude) + Math.abs(newLng - target.longitude)
      if (dist < 0.0002) {
        clearInterval(interval)
        set({ orderStatus: 'delivered', movementInterval: null })
      }
    }, 2000)

    set({ movementInterval: interval, orderStatus: 'in_progress' })
  },

  cancelOrder: () => {
    const { movementInterval } = get()
    if (movementInterval) clearInterval(movementInterval)
    set({ currentOrder: null, orderStatus: 'idle', assignedDriver: null, movementInterval: null })
  },
}))
