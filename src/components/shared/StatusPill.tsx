import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence,
} from 'react-native-reanimated'
import { Colors, Fonts, Radius } from '../../theme/tokens'

interface StatusPillProps {
  color?: string
  label: string
  glow?: boolean
}

export function StatusPill({ color = Colors.mint, label, glow = true }: StatusPillProps) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.4, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1,
    )
  }, [])

  const dotStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <View style={[
      styles.pill,
      {
        backgroundColor: glow ? `${color}22` : Colors.elevated,
        borderColor: `${color}55`,
      },
    ]}>
      <Animated.View style={[styles.dot, { backgroundColor: color }, dotStyle]} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
})
