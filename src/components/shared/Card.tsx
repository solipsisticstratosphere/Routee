import React from 'react'
import { View, ViewStyle, StyleSheet, Pressable } from 'react-native'
import { Colors, Radius } from '../../theme/tokens'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  elevated?: boolean
  onPress?: () => void
}

export function Card({ children, style, elevated, onPress }: CardProps) {
  const bg = elevated ? Colors.elevated : Colors.surface
  const content = (
    <View style={[styles.card, { backgroundColor: bg }, style]}>
      {children}
    </View>
  )
  if (onPress) return <Pressable onPress={onPress}>{content}</Pressable>
  return content
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222a3d',
  },
})
