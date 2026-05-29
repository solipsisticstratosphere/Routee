import React from 'react'
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { LeafletMap } from '../../components/map/LeafletMap'
import { CTA } from '../../components/shared/CTA'
import { BackIcon, PinIcon } from '../../components/shared/Icons'
import { useOrderStore } from '../../store/orderStore'
import { CustomerMapStackParamList } from '../../navigation/CustomerTabs'
import { LatLng } from '../../types'

type Props = { navigation: StackNavigationProp<CustomerMapStackParamList, 'OrderConfirm'> }

const PICKUP = { latitude: 49.9946, longitude: 36.2314 }
const DROPOFF = { latitude: 50.0012, longitude: 36.2284 }
const ROUTE: LatLng[] = [PICKUP, { latitude: 49.9970, longitude: 36.2300 }, DROPOFF]

export default function OrderConfirmScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const placeOrder = useOrderStore((s) => s.placeOrder)
  const routeCoords = useOrderStore((s) => s.routeCoords)

  const handlePay = () => {
    placeOrder({
      pickup: { address: 'майдан Свободи, 1', coords: PICKUP },
      dropoff: { address: 'просп. Науки, 4', coords: DROPOFF },
      vehicleType: 'car',
      price: 80,
      distance: 3.0,
      eta: 11,
    })
    navigation.navigate('LiveTracking')
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* back */}
      <Pressable onPress={() => navigation.goBack()} style={[styles.backBtn, { top: insets.top + 12 }]}>
        <BackIcon size={20} color={Colors.text} />
      </Pressable>

      {/* static map */}
      <LeafletMap
        style={styles.map}
        initialRegion={{ latitude: 49.997, longitude: 36.23, latitudeDelta: 0.025, longitudeDelta: 0.025 }}
        polyline={routeCoords.length > 1 ? routeCoords : ROUTE}
        markers={[
          { id: 'pickup', coordinate: PICKUP, color: Colors.mint },
          { id: 'dropoff', coordinate: DROPOFF, color: Colors.orange },
        ]}
        scrollEnabled={false}
        zoomEnabled={false}
      />

      <ScrollView style={styles.sheet} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />
        <Text style={T.h2}>{t('orderConfirm.title')}</Text>

        <View style={styles.detailsCard}>
          <DetailRow label={t('orderConfirm.pickup')} value={t('addresses.майдан Свободи, 1', { defaultValue: 'майдан Свободи, 1' })} icon="🟢" />
          <View style={styles.divider} />
          <DetailRow label={t('orderConfirm.dropoff')} value={t('addresses.просп. Науки, 4', { defaultValue: 'просп. Науки, 4' })} icon="🟠" />
          <View style={styles.divider} />
          <DetailRow label={t('orderConfirm.vehicle')} value={t('shared.car')} icon="🚗" />
          <View style={styles.divider} />
          <DetailRow label={t('orderConfirm.distance')} value={t('shared.kmValue', { distance: 3.0 })} icon="📏" />
          <View style={styles.divider} />
          <DetailRow label={t('orderConfirm.eta')} value={t('shared.minAwayValue', { eta: 11 })} icon="⏱" />
        </View>

        <View style={styles.priceRow}>
          <Text style={[T.h3, { color: Colors.text2 }]}>{t('orderConfirm.total')}</Text>
          <Text style={[T.h1, { color: Colors.mint }]}>$80.00</Text>
        </View>

        <CTA onPress={handlePay} color="mint">
          <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#02110B', fontWeight: '700' }}>
            {t('orderConfirm.proceedToTracking')}
          </Text>
        </CTA>
      </ScrollView>
    </View>
  )
}

function DetailRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View style={detailStyles.row}>
      <Text style={{ fontSize: 16 }}>{icon}</Text>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={detailStyles.value} numberOfLines={1}>{value}</Text>
    </View>
  )
}

const detailStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  label: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text2, width: 70 },
  value: { flex: 1, fontFamily: Fonts.bodyMedium, fontSize: 14, color: Colors.text, textAlign: 'right' },
})

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  backBtn: {
    position: 'absolute', left: 16, zIndex: 10,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
  },
  map: { height: 260 },
  sheet: {
    flex: 1, backgroundColor: Colors.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  content: { padding: Spacing.s4, gap: 16 },
  handle: {
    width: 38, height: 4, borderRadius: 4, backgroundColor: Colors.line2,
    alignSelf: 'center', marginBottom: 16,
  },
  detailsCard: {
    backgroundColor: Colors.elevated, borderRadius: Radius.md,
    paddingHorizontal: 16, borderWidth: 1, borderColor: Colors.line,
  },
  divider: { height: 1, backgroundColor: Colors.line },
  priceRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 8,
  },
})
