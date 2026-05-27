import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Radius } from '../../theme/tokens'
import { ClockIcon } from '../shared/Icons'

interface ETACardProps {
  eta: number
  label?: string
}

export function ETACard({ eta, label = 'ETA' }: ETACardProps) {
  return (
    <View style={styles.container}>
      <ClockIcon size={14} color={Colors.mint} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{eta} min</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.mintGlow,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: `${Colors.mint}44`,
    alignSelf: 'flex-start',
  },
  label: { fontFamily: Fonts.body, fontSize: 12, color: Colors.mint },
  value: { fontFamily: Fonts.bodyBold, fontSize: 13, color: Colors.mint, fontWeight: '700' },
})
