import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { LatLng } from '../types'

const KHARKIV: LatLng = { latitude: 49.9935, longitude: 36.2304 }

export function useLocation() {
  const [location, setLocation] = useState<LatLng>(KHARKIV)
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        setHasPermission(true)
        const loc = await Location.getCurrentPositionAsync({})
        setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })
      }
    })()
  }, [])

  return { location, hasPermission }
}
