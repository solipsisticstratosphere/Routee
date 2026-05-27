import React from 'react'
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Colors, Radius } from '../../theme/tokens'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type CTAColor = 'mint' | 'orange' | 'white' | 'surf' | 'danger'
type CTASize = 'lg' | 'md' | 'sm'

interface CTAProps {
  children: React.ReactNode
  color?: CTAColor
  size?: CTASize
  secondary?: boolean
  disabled?: boolean
  full?: boolean
  loading?: boolean
  onPress?: () => void
}

const palette: Record<CTAColor, { bg: string; fg: string }> = {
  mint:   { bg: Colors.mint, fg: '#02110B' },
  orange: { bg: Colors.orange, fg: '#1A0700' },
  white:  { bg: '#fff', fg: '#000' },
  surf:   { bg: Colors.elevated, fg: Colors.text },
  danger: { bg: Colors.red, fg: '#fff' },
}

export function CTA({
  children, color = 'mint', size = 'lg', secondary = false,
  disabled = false, full = true, loading = false, onPress,
}: CTAProps) {
  const scale = useSharedValue(1)
  const p = palette[color]
  const height = size === 'sm' ? 40 : size === 'md' ? 48 : 56

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => { scale.value = withSpring(0.97, { damping: 15, stiffness: 200 }) }
  const handlePressOut = () => { scale.value = withSpring(1, { damping: 15, stiffness: 200 }) }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        animStyle,
        styles.base,
        {
          height,
          width: full ? '100%' : undefined,
          backgroundColor: secondary ? 'transparent' : p.bg,
          borderWidth: secondary ? 1.5 : 0,
          borderColor: secondary ? Colors.line2 : 'transparent',
          opacity: disabled ? 0.45 : 1,
          borderRadius: Radius.md,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? Colors.text : p.fg} />
      ) : (
        children
      )}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
})
