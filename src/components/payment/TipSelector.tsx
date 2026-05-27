import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Colors, Fonts, Radius } from '../../theme/tokens'

type TipOption = 0 | 10 | 15 | 20 | 'custom'

interface TipSelectorProps {
  selected: TipOption
  onSelect: (tip: TipOption) => void
}

const options: { value: TipOption; label: string }[] = [
  { value: 0, label: 'No tip' },
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 20, label: '20%' },
  { value: 'custom', label: 'Custom' },
]

export function TipSelector({ selected, onSelect }: TipSelectorProps) {
  return (
    <View style={styles.container}>
      {options.map((opt) => {
        const isSelected = opt.value === selected
        return (
          <Pressable
            key={String(opt.value)}
            onPress={() => onSelect(opt.value)}
            style={[styles.pill, isSelected && styles.pillSelected]}
          >
            <Text style={[styles.label, { color: isSelected ? Colors.mint : Colors.text2 }]}>
              {opt.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    backgroundColor: Colors.elevated,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  pillSelected: {
    backgroundColor: Colors.mintGlow,
    borderColor: Colors.mint,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    fontWeight: '500',
  },
})
