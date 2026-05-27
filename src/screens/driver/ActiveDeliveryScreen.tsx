import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Colors, Fonts, Radius, T } from '../../theme'
import { LeafletMap } from '../../components/map/LeafletMap'
import { CTA } from '../../components/shared/CTA'
import { BackIcon } from '../../components/shared/Icons'
import { useDriverStore } from '../../store/driverStore'
import { DriverStackParamList } from '../../navigation/DriverTabs'
import { LatLng } from '../../types'

type Props = { navigation: StackNavigationProp<DriverStackParamList, 'ActiveDelivery'> }

const PICKUP: LatLng = { latitude: 49.9946, longitude: 36.2314 }
const DROPOFF: LatLng = { latitude: 50.0012, longitude: 36.2284 }
const ROUTE: LatLng[] = [PICKUP, { latitude: 49.9970, longitude: 36.2300 }, DROPOFF]

export default function ActiveDeliveryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const rootNav = useNavigation<any>()
  const { currentOrder } = useDriverStore()

  return (
    <View style={styles.container}>
      <LeafletMap
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        initialRegion={{ latitude: 49.9979, longitude: 36.2299, latitudeDelta: 0.025, longitudeDelta: 0.025 }}
        polyline={ROUTE}
        polylineColor={Colors.mint}
        markers={[{ id: 'dropoff', coordinate: DROPOFF, color: Colors.orange }]}
      />

      <Pressable onPress={() => navigation.goBack()} style={[styles.backBtn, { top: insets.top + 12 }]}>
        <BackIcon size={18} color={Colors.text} />
      </Pressable>

      <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[T.xs, { color: Colors.text3 }]}>Delivering to</Text>
            <Text style={[T.bodyB, { marginTop: 4 }]} numberOfLines={1}>
              {currentOrder?.dropoff.address ?? 'просп. Науки, 4'}
            </Text>
          </View>
          <View style={styles.etaBadge}>
            <Text style={styles.etaText}>~8 min</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <SummaryRow label="Vehicle" value={currentOrder?.vehicleType ?? 'car'} />
          <SummaryRow label="Distance" value={`${currentOrder?.distance ?? 3.0} km`} />
          <SummaryRow label="Earning" value={`$${currentOrder?.price ?? 80}`} accent />
        </View>

        <CTA color="mint" onPress={() => rootNav.navigate('QRScan')}>
          <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#02110B', fontWeight: '700' }}>
            Complete Delivery
          </Text>
        </CTA>
      </View>
    </View>
  )
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
      <Text style={{ fontFamily: Fonts.body, fontSize: 13, color: Colors.text2 }}>{label}</Text>
      <Text style={{ fontFamily: Fonts.bodyMedium, fontSize: 13, color: accent ? Colors.mint : Colors.text }}>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  backBtn: {
    position: 'absolute', left: 16, zIndex: 10,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
  bottomCard: {
    position: 'absolute', left: 16, right: 16, bottom: 0,
    backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: 16, gap: 12,
    borderWidth: 1, borderColor: Colors.line,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  etaBadge: {
    backgroundColor: Colors.mintGlow, borderRadius: Radius.full,
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: `${Colors.mint}44`,
  },
  etaText: { fontFamily: Fonts.bodyBold, fontSize: 13, color: Colors.mint },
  summary: {
    backgroundColor: Colors.elevated, borderRadius: Radius.md, padding: 12,
    borderWidth: 1, borderColor: Colors.line,
  },
})
