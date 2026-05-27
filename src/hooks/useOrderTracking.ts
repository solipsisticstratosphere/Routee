import { useEffect } from 'react'
import { useOrderStore } from '../store/orderStore'

export function useOrderTracking() {
  const { currentOrder, orderStatus, mockDriverMovement } = useOrderStore()

  useEffect(() => {
    if (currentOrder && orderStatus === 'confirmed') {
      mockDriverMovement()
    }
  }, [currentOrder?.id])

  return { currentOrder, orderStatus }
}
