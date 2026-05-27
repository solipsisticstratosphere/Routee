import { create } from 'zustand'
import { Order, Earnings } from '../types'
import { mockEarnings } from '../mock/mockEarnings'
import { orderTemplates } from '../mock/mockOrders'

interface EarningsState {
  today: number
  week: number
  history: Earnings[]
}

interface DriverState {
  isOnline: boolean
  currentOrder: Order | null
  earnings: EarningsState
  incomingOrder: Order | null
  incomingTimer: ReturnType<typeof setTimeout> | null
  toggleOnline: () => void
  acceptOrder: (order: Order) => void
  declineOrder: () => void
  completeOrder: () => void
  mockIncomingOrder: () => void
}

export const useDriverStore = create<DriverState>((set, get) => ({
  isOnline: false,
  currentOrder: null,
  incomingOrder: null,
  incomingTimer: null,
  earnings: {
    today: mockEarnings[mockEarnings.length - 1].amount,
    week: mockEarnings.reduce((s, e) => s + e.amount, 0),
    history: mockEarnings,
  },

  toggleOnline: () => {
    const { isOnline, incomingTimer } = get()
    if (!isOnline) {
      set({ isOnline: true })
      get().mockIncomingOrder()
    } else {
      if (incomingTimer) clearTimeout(incomingTimer)
      set({ isOnline: false, incomingOrder: null, incomingTimer: null })
    }
  },

  mockIncomingOrder: () => {
    const timer = setTimeout(() => {
      const tpl = orderTemplates[0]
      const order: Order = {
        id: `incoming_${Date.now()}`,
        customerId: 'u_customer',
        pickup: tpl.pickup!,
        dropoff: tpl.dropoff!,
        vehicleType: tpl.vehicleType ?? 'car',
        status: 'searching',
        price: tpl.price ?? 78,
        distance: tpl.distance ?? 3.0,
        eta: tpl.eta ?? 11,
        createdAt: new Date().toISOString(),
      }
      set({ incomingOrder: order })
    }, 5000)
    set({ incomingTimer: timer })
  },

  acceptOrder: (order) => {
    set({ currentOrder: { ...order, status: 'confirmed' }, incomingOrder: null })
  },

  declineOrder: () => {
    set({ incomingOrder: null })
    const { isOnline } = get()
    if (isOnline) {
      setTimeout(() => get().mockIncomingOrder(), 8000)
    }
  },

  completeOrder: () => {
    const { currentOrder, earnings } = get()
    if (!currentOrder) return
    const newHistory: Earnings = {
      date: new Date().toISOString().split('T')[0],
      amount: currentOrder.price,
      trips: 1,
    }
    set({
      currentOrder: null,
      earnings: {
        today: earnings.today + currentOrder.price,
        week: earnings.week + currentOrder.price,
        history: [...earnings.history, newHistory],
      },
    })
  },
}))
