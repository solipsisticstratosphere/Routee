import React from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { Colors, Fonts, Radius, Spacing } from '../../theme/tokens'
import { Avatar } from '../shared/Avatar'
import { StarIcon, PhoneIcon, ChatIcon } from '../shared/Icons'
import { Driver } from '../../types'

interface DriverCardProps {
  driver: Driver
}

export function DriverCard({ driver }: DriverCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Avatar name={driver.name} size={48} />
        <View style={styles.info}>
          <Text style={styles.name}>{driver.name}</Text>
          <View style={styles.ratingRow}>
            <StarIcon size={12} color={Colors.amber} />
            <Text style={styles.rating}>{driver.rating.toFixed(1)}</Text>
            <Text style={styles.plate}>{driver.plate}</Text>
          </View>
          <Text style={styles.car}>{driver.carModel}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            onPress={() => Alert.alert('Call', `Calling ${driver.name}…`)}
            style={styles.actionBtn}
          >
            <PhoneIcon size={18} color={Colors.mint} />
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('Chat', `Opening chat with ${driver.name}…`)}
            style={styles.actionBtn}
          >
            <ChatIcon size={18} color={Colors.mint} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  info: { flex: 1, gap: 3 },
  name: { fontFamily: Fonts.bodyBold, fontSize: 15, color: Colors.text, fontWeight: '600' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rating: { fontFamily: Fonts.bodyMedium, fontSize: 12, color: Colors.amber },
  plate: { fontFamily: Fonts.mono, fontSize: 12, color: Colors.text3 },
  car: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text2 },
  actions: { gap: 8 },
  actionBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.elevated,
    borderWidth: 1, borderColor: Colors.line,
    alignItems: 'center', justifyContent: 'center',
  },
})
