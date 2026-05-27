import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming,
} from 'react-native-reanimated'
import { Colors } from '../../theme/tokens'
import { LatLng } from '../../types'

interface DriverPinProps {
  coords: LatLng
  color?: string
}

export function DriverPin({ coords, color = Colors.mint }: DriverPinProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.6)

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(withTiming(1.6, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
    )
    opacity.value = withRepeat(
      withSequence(withTiming(0, { duration: 900 }), withTiming(0.6, { duration: 900 })),
      -1,
    )
  }, [])

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Marker coordinate={coords} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.ring, { borderColor: color }, ringStyle]} />
        <View style={[styles.dot, { backgroundColor: color }]} />
      </View>
    </Marker>
  )
}

const styles = StyleSheet.create({
  wrapper: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    width: 32, height: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
  dot: {
    width: 14, height: 14, borderRadius: 7,
  },
})
