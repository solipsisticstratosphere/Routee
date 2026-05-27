import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (phone: string, otp: string, role: 'customer' | 'driver') => void
  logout: () => void
  setRole: (role: 'customer' | 'driver') => void
}

let pendingRole: 'customer' | 'driver' = 'customer'

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: (phone, _otp, role) => {
    const user: User = {
      id: 'u1',
      name: role === 'driver' ? 'Олексій Мороз' : 'Катерина Степаненко',
      phone,
      avatar: '',
      rating: role === 'driver' ? 4.9 : 4.7,
      role,
    }
    set({ user, isAuthenticated: true })
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  setRole: (role) => {
    pendingRole = role
    const u = get().user
    if (u) set({ user: { ...u, role } })
  },
}))

export { pendingRole }
