import React from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { Colors, Fonts, Radius, Spacing } from '../../theme/tokens'
import { CarIcon, BikeIcon, VanIcon } from '../shared/Icons'

type VehicleType = 'bike' | 'car' | 'van'

interface VehicleOption {
  type: VehicleType
  label: string
  price: number
  eta: number
}

const options: VehicleOption[] = [
  { type: 'bike', label: 'Bike', price: 40, eta: 12 },
  { type: 'car', label: 'Car', price: 80, eta: 8 },
  { type: 'van', label: 'Van', price: 140, eta: 15 },
]

interface VehicleTypeSelectorProps {
  selected: VehicleType
  onSelect: (type: VehicleType) => void
}

const VehicleIcon = ({ type, color }: { type: VehicleType; color: string }) => {
  if (type === 'bike') return <BikeIcon size={28} color={color} />
  if (type === 'van') return <VanIcon size={28} color={color} />
  return <CarIcon size={28} color={color} />
}

export function VehicleTypeSelector({ selected, onSelect }: VehicleTypeSelectorProps) {
  return (
    <FlatList
      data={options}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      keyExtractor={(item) => item.type}
      renderItem={({ item }) => {
        const isSelected = item.type === selected
        return (
          <Pressable
            onPress={() => onSelect(item.type)}
            style={[
              styles.card,
              isSelected && styles.cardSelected,
            ]}
          >
            <VehicleIcon type={item.type} color={isSelected ? Colors.mint : Colors.text2} />
            <Text style={[styles.label, { color: isSelected ? Colors.text : Colors.text2 }]}>
              {item.label}
            </Text>
            <Text style={[styles.price, { color: isSelected ? Colors.mint : Colors.text3 }]}>
              ${item.price}
            </Text>
            <Text style={styles.eta}>{item.eta} min</Text>
          </Pressable>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  list: { gap: 12, paddingHorizontal: 16 },
  card: {
    width: 100,
    backgroundColor: Colors.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  cardSelected: {
    borderColor: Colors.mint,
    backgroundColor: Colors.mintGlow,
  },
  label: { fontFamily: Fonts.bodyMedium, fontSize: 13, fontWeight: '500' },
  price: { fontFamily: Fonts.bodyBold, fontSize: 15, fontWeight: '700' },
  eta: { fontFamily: Fonts.body, fontSize: 11, color: Colors.text3 },
})
