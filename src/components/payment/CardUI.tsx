import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors, Fonts, Radius } from '../../theme/tokens'
import { CardIcon } from '../shared/Icons'

interface CardUIProps {
  last4: string
  brand?: string
  isSelected?: boolean
  onPress?: () => void
}

export function CardUI({ last4, brand = 'Visa', isSelected = false, onPress }: CardUIProps) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={isSelected ? ['#1E3A2F', '#142a22'] : [Colors.elevated, Colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, isSelected && styles.selected]}
      >
        <View style={styles.row}>
          <CardIcon size={20} color={isSelected ? Colors.mint : Colors.text2} />
          <Text style={[styles.brand, { color: isSelected ? Colors.mint : Colors.text2 }]}>{brand}</Text>
        </View>
        <Text style={[styles.number, { color: isSelected ? Colors.text : Colors.text2 }]}>
          •••• •••• •••• {last4}
        </Text>
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  selected: { borderColor: Colors.mint },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brand: { fontFamily: Fonts.bodyBold, fontSize: 13, fontWeight: '600' },
  number: { fontFamily: Fonts.mono, fontSize: 15, letterSpacing: 1 },
})
