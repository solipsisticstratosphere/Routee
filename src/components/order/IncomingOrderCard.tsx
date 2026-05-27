import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Radius, Spacing } from '../../theme/tokens'
import { PinIcon, ZapIcon } from '../shared/Icons'
import { Order } from '../../types'

interface IncomingOrderCardProps {
  order: Order
  onPress?: () => void
}

export function IncomingOrderCard({ order }: IncomingOrderCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <ZapIcon size={16} color={Colors.mint} />
        <Text style={styles.title}>Active Order</Text>
        <Text style={styles.price}>${order.price}</Text>
      </View>
      <View style={styles.row}>
        <PinIcon size={14} color={Colors.text3} />
        <Text style={styles.address} numberOfLines={1}>{order.dropoff.address}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.elevated,
    borderRadius: Radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    gap: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { flex: 1, fontFamily: Fonts.bodyBold, fontSize: 14, color: Colors.text },
  price: { fontFamily: Fonts.bodyBold, fontSize: 16, color: Colors.mint, fontWeight: '700' },
  address: { flex: 1, fontFamily: Fonts.body, fontSize: 13, color: Colors.text2 },
})
