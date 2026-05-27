import { useDriverStore } from '../store/driverStore'

export function useDriverStatus() {
  const { isOnline, currentOrder, earnings, incomingOrder, toggleOnline } = useDriverStore()
  return { isOnline, currentOrder, earnings, incomingOrder, toggleOnline }
}
