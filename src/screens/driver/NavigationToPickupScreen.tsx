import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { LeafletMap } from '../../components/map/LeafletMap'
import { CTA } from '../../components/shared/CTA'
import { BackIcon, ArrowIcon } from '../../components/shared/Icons'
import { useDriverStore } from '../../store/driverStore'
import { DriverStackParamList } from '../../navigation/DriverTabs'
import { LatLng } from '../../types'

type Props = { navigation: StackNavigationProp<DriverStackParamList, 'NavigationToPickup'> }

const DRIVER_POS: LatLng = { latitude: 49.9935, longitude: 36.2304 }
const PICKUP: LatLng = { latitude: 49.9946, longitude: 36.2314 }
const ROUTE: LatLng[] = [
  DRIVER_POS,
  { latitude: 49.9938, longitude: 36.2310 },
  PICKUP,
]

export default function NavigationToPickupScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const { currentOrder } = useDriverStore()

  return (
    <View style={styles.container}>
      <LeafletMap
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        initialRegion={{ latitude: 49.9940, longitude: 36.2310, latitudeDelta: 0.012, longitudeDelta: 0.012 }}
        polyline={ROUTE}
        polylineColor={Colors.orange}
        markers={[{ id: 'pickup', coordinate: PICKUP, color: Colors.mint }]}
      />

      {/* top nav bar */}
      <View style={[styles.navBar, { top: insets.top + 12 }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <BackIcon size={18} color={Colors.text} />
        </Pressable>
        <View style={styles.instruction}>
          <ArrowIcon size={16} color={Colors.orange} />
          <Text style={styles.instrText} numberOfLines={1}>Turn right on вул. Сумська</Text>
          <Text style={styles.instrDist}>200 m</Text>
        </View>
      </View>

      {/* bottom card */}
      <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.cardRow}>
          <View>
            <Text style={[T.xs, { color: Colors.text3 }]}>Pickup</Text>
            <Text style={[T.bodyB, { marginTop: 4 }]} numberOfLines={1}>
              {currentOrder?.pickup.address ?? 'майдан Свободи, 1'}
            </Text>
          </View>
          <View style={styles.etaBadge}>
            <Text style={styles.etaText}>~3 min</Text>
          </View>
        </View>
        <Text style={[T.sm, { color: Colors.text2 }]}>
          Customer: {currentOrder?.customerId ?? 'Катерина С.'}
        </Text>
        <CTA
          color="orange"
          onPress={() => navigation.navigate('ActiveDelivery')}
        >
          <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#1A0700', fontWeight: '700' }}>
            Arrived at Pickup
          </Text>
        </CTA>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  navBar: {
    position: 'absolute', left: 16, right: 16,
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
  instruction: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.surface, borderRadius: Radius.md, padding: 10,
    borderWidth: 1, borderColor: Colors.line,
  },
  instrText: { flex: 1, fontFamily: Fonts.bodyMedium, fontSize: 13, color: Colors.text },
  instrDist: { fontFamily: Fonts.bodyBold, fontSize: 13, color: Colors.orange },
  bottomCard: {
    position: 'absolute', left: 16, right: 16, bottom: 0,
    backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: 16, gap: 10,
    borderWidth: 1, borderColor: Colors.line,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  etaBadge: {
    backgroundColor: Colors.orangeGlow, borderRadius: Radius.full,
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.orange + '44',
  },
  etaText: { fontFamily: Fonts.bodyBold, fontSize: 13, color: Colors.orange },
})
