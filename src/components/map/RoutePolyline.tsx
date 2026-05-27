import React, { useEffect } from 'react'
import { Polyline } from 'react-native-maps'
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated'
import { Colors } from '../../theme/tokens'
import { LatLng } from '../../types'

interface RoutePolylineProps {
  coords: LatLng[]
  color?: string
  strokeWidth?: number
}

export function RoutePolyline({ coords, color = Colors.mint, strokeWidth = 4 }: RoutePolylineProps) {
  if (coords.length < 2) return null
  return (
    <Polyline
      coordinates={coords}
      strokeColor={color}
      strokeWidth={strokeWidth}
      lineCap="round"
      lineJoin="round"
    />
  )
}
