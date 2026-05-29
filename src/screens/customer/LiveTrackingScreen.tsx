import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Alert, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius } from '../../theme'
import { LeafletMap, LeafletMapRef } from '../../components/map/LeafletMap'
import { DriverCard } from '../../components/driver/DriverCard'
import { CTA } from '../../components/shared/CTA'
import { useOrderStore } from '../../store/orderStore'
import { mockDrivers } from '../../mock/mockDrivers'
import { CustomerMapStackParamList } from '../../navigation/CustomerTabs'
import { LatLng } from '../../types'
import { useDriverStore } from '../../store/driverStore'

type Props = { navigation: StackNavigationProp<CustomerMapStackParamList, 'LiveTracking'> }

export default function LiveTrackingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const mapRef = useRef<LeafletMapRef>(null)
  const { currentOrder, orderStatus, driverCoords, assignedDriver, mockDriverMovement, cancelOrder } = useOrderStore()
  const [eta, setEta] = useState(currentOrder?.eta ?? 11)

  const { carModel: customCarModel, plate: customPlate } = useDriverStore()
  const rawDriver = assignedDriver ?? mockDrivers[0]
  const driver = rawDriver.id === 'd1' ? { ...rawDriver, carModel: customCarModel, plate: customPlate } : rawDriver

  const pulseAnim = useRef(new Animated.Value(1)).current

  const statusColor =
    orderStatus === 'delivered' ? Colors.mint
    : orderStatus === 'in_progress' ? Colors.orange
    : orderStatus === 'confirmed' ? Colors.amber
    : Colors.amber

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.2, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    )
    anim.start()
    return () => anim.stop()
  }, [])

  useEffect(() => {
    mockDriverMovement()
    const timer = setInterval(() => setEta((e) => Math.max(0, e - 1)), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    mapRef.current?.updateMarker('driver', driverCoords)
  }, [driverCoords])

  useEffect(() => {
    if (orderStatus === 'delivered') {
      navigation.navigate('DeliveryQR')
    }
  }, [orderStatus])

  const statusLabel =
    orderStatus === 'confirmed' ? t('liveTracking.statusConfirmed')
    : orderStatus === 'in_progress' ? t('liveTracking.statusDelivering')
    : orderStatus === 'delivered' ? t('liveTracking.statusDelivered')
    : t('liveTracking.statusSearching')

  const dropoffCoords: LatLng = currentOrder?.dropoff.coords ?? { latitude: 50.0012, longitude: 36.2284 }
  const routeToDropoff: LatLng[] = [driverCoords, dropoffCoords]

  return (
    <View style={styles.container}>
      <LeafletMap
        ref={mapRef}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        initialRegion={{ latitude: driverCoords.latitude, longitude: driverCoords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
        markers={[{ id: 'driver', coordinate: driverCoords, color: Colors.mint }]}
        polyline={routeToDropoff}
      />

      {/* bottom card */}
      <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
        {/* status banner */}
        <View style={[styles.statusBanner, { backgroundColor: `${statusColor}18`, borderColor: `${statusColor}35` }]}>
          <View style={styles.statusLeft}>
            <Animated.View style={[styles.statusDot, { backgroundColor: statusColor, opacity: pulseAnim }]} />
            <View>
              <Text style={styles.statusHint}>{t('liveTracking.statusLabel')}</Text>
              <Text style={[styles.statusTitle, { color: statusColor }]}>{statusLabel}</Text>
            </View>
          </View>
          <View style={[styles.etaBadge, { borderColor: `${Colors.mint}35` }]}>
            <Text style={styles.etaNum}>{eta}</Text>
            <Text style={styles.etaUnit}>{t('liveTracking.minAway')}</Text>
          </View>
        </View>

        <DriverCard driver={driver} />
        <CTA color="surf" size="md" onPress={() => {
          Alert.alert(t('liveTracking.cancelConfirmTitle'), t('liveTracking.cancelConfirmMsg'), [
            { text: t('shared.cancel'), style: 'cancel' },
            { text: t('liveTracking.cancelOrder'), style: 'destructive', onPress: () => {
              cancelOrder()
              navigation.navigate('HomeMap')
            }}
          ])
        }}>
          <Text style={{ fontFamily: Fonts.body, color: Colors.text }}>{t('liveTracking.cancelOrder')}</Text>
        </CTA>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  bottomCard: {
    position: 'absolute', left: 16, right: 16, bottom: 0,
    backgroundColor: Colors.surface, borderRadius: Radius.xl,
    padding: 16, gap: 12,
    borderWidth: 1, borderColor: Colors.line,
  },
  statusBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 12, borderRadius: Radius.md, borderWidth: 1,
  },
  statusLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusHint: { fontFamily: Fonts.body, fontSize: 11, color: Colors.text3, marginBottom: 2 },
  statusTitle: { fontFamily: Fonts.bodyBold, fontSize: 16, fontWeight: '600' },
  etaBadge: {
    alignItems: 'center', borderRadius: Radius.md,
    paddingHorizontal: 12, paddingVertical: 8,
    backgroundColor: `${Colors.mint}12`, borderWidth: 1,
  },
  etaNum: { fontFamily: Fonts.display, fontSize: 22, color: Colors.mint, lineHeight: 26 },
  etaUnit: { fontFamily: Fonts.body, fontSize: 10, color: Colors.text3 },
})
