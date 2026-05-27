import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Fonts } from '../../theme/tokens'

interface AvatarProps {
  name?: string
  size?: number
  color?: string
  src?: string
}

const palette = ['#00E5A0', '#FF6B35', '#FFB020', '#7c5cff', '#22b8cf']

function getColor(name: string): string {
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return palette[hash % palette.length]
}

export function Avatar({ name = '?', size = 40, color, src }: AvatarProps) {
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()
  const bg = color ?? getColor(name)

  return (
    <View style={[
      styles.container,
      { width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
    ]}>
      {src ? (
        <Image source={{ uri: src }} style={{ width: size, height: size, borderRadius: size / 2 }} />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontFamily: Fonts.display,
    fontWeight: '700',
    color: '#0a0e1a',
  },
})
