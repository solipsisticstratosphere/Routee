import React, { useState } from 'react'
import {
  View, Text, StyleSheet, ScrollView, TextInput, Pressable,
  KeyboardAvoidingView, Platform,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { LeafletMap } from '../../components/map/LeafletMap'
import { VehicleTypeSelector } from '../../components/order/VehicleTypeSelector'
import { CTA } from '../../components/shared/CTA'
import { BackIcon, ClockIcon, PinIcon } from '../../components/shared/Icons'
import { useOrderStore } from '../../store/orderStore'
import { CustomerMapStackParamList } from '../../navigation/CustomerTabs'
import { LatLng } from '../../types'

type Props = { navigation: StackNavigationProp<CustomerMapStackParamList, 'RoutePlanning'> }

const DEFAULT_PICKUP = { address: 'майдан Свободи, 1', coords: { latitude: 49.9946, longitude: 36.2314 } }
const DEFAULT_DROPOFF = { address: 'просп. Науки, 4', coords: { latitude: 50.0012, longitude: 36.2284 } }
const ROUTE_COORDS: LatLng[] = [
  { latitude: 49.9946, longitude: 36.2314 },
  { latitude: 49.9970, longitude: 36.2300 },
  { latitude: 49.9990, longitude: 36.2290 },
  { latitude: 50.0012, longitude: 36.2284 },
]
const RECENT = [
  'вул. Сумська, 47',
  'просп. Науки, 4',
  'майдан Свободи, 1',
]

const PRICES: Record<string, { bike: number; car: number; van: number }> = {
  base: { bike: 40, car: 80, van: 140 },
}

export default function RoutePlanningScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const [vehicle, setVehicle] = useState<'bike' | 'car' | 'van'>('car')
  const [origin, setOrigin] = useState(DEFAULT_PICKUP.address)
  const [destination, setDestination] = useState(DEFAULT_DROPOFF.address)
  const setRouteCoords = useOrderStore((s) => s.setRouteCoords)

  const price = PRICES.base[vehicle]

  const handleConfirm = () => {
    setRouteCoords(ROUTE_COORDS)
    navigation.navigate('OrderConfirm')
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LeafletMap
        style={styles.map}
        initialRegion={{
          latitude: 49.9970,
          longitude: 36.2300,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
        polyline={ROUTE_COORDS}
        polylineColor={Colors.mint}
        scrollEnabled={false}
        zoomEnabled={false}
      />

      <View style={styles.sheet}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <BackIcon size={20} color={Colors.text} />
          </Pressable>
          <Text style={T.h3}>Plan Route</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* inputs */}
          <View style={styles.inputs}>
            <View style={styles.inputDot}>
              <View style={[styles.dot, { backgroundColor: Colors.mint }]} />
              <View style={styles.dotLine} />
              <View style={[styles.dot, { backgroundColor: Colors.orange }]} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <TextInput
                style={styles.input}
                value={origin}
                onChangeText={setOrigin}
                placeholder="Pickup"
                placeholderTextColor={Colors.text3}
              />
              <View style={styles.inputDivider} />
              <TextInput
                style={styles.input}
                value={destination}
                onChangeText={setDestination}
                placeholder="Destination"
                placeholderTextColor={Colors.text3}
              />
            </View>
          </View>

          {/* recent */}
          <Text style={[T.xs, styles.sectionLabel]}>Recent</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            {RECENT.map((dest) => (
              <Pressable key={dest} onPress={() => setDestination(dest)} style={styles.chip}>
                <ClockIcon size={12} color={Colors.text3} />
                <Text style={styles.chipText} numberOfLines={1}>{dest}</Text>
              </Pressable>
            ))}
          </ScrollView>
          {RECENT.map((dest) => (
            <Pressable key={dest} onPress={() => setDestination(dest)} style={styles.recentRow}>
              <View style={styles.recentIcon}>
                <PinIcon size={14} color={Colors.text2} />
              </View>
              <Text style={styles.recentText}>{dest}</Text>
            </Pressable>
          ))}

          <View style={styles.sectionDivider} />

          {/* vehicle */}
          <Text style={[T.xs, styles.sectionLabel]}>Vehicle</Text>
          <VehicleTypeSelector selected={vehicle} onSelect={setVehicle} />

          {/* price */}
          <View style={styles.priceRow}>
            <Text style={[T.sm, { color: Colors.text2 }]}>Estimated fare</Text>
            <Text style={[T.h3, { color: Colors.mint }]}>${price}</Text>
          </View>

          <View style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 24 }}>
            <CTA onPress={handleConfirm} color="mint">
              <Text style={styles.btnText}>Confirm Route</Text>
            </CTA>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  map: { height: 200, flexShrink: 1, minHeight: 80 },
  sheet: {
    flex: 1, minHeight: 280, backgroundColor: Colors.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingTop: 16, overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, marginBottom: Spacing.s4,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
  },
  inputs: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, marginBottom: Spacing.s3,
  },
  inputDot: { alignItems: 'center', gap: 4 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  dotLine: { width: 2, height: 24, backgroundColor: Colors.line2, borderRadius: 1 },
  input: {
    height: 48, paddingHorizontal: 14,
    backgroundColor: Colors.elevated, borderRadius: Radius.sm,
    color: Colors.text, fontFamily: Fonts.body, fontSize: 14,
    borderWidth: 1, borderColor: Colors.line,
  },
  inputDivider: { height: 1, backgroundColor: Colors.line2, marginVertical: 2 },
  sectionLabel: {
    color: Colors.text3, marginBottom: Spacing.s2,
    paddingHorizontal: 16, marginTop: 4,
  },
  chipRow: { paddingHorizontal: 16, gap: 8, flexDirection: 'row', marginBottom: Spacing.s3 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.elevated, borderRadius: Radius.full,
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.line,
  },
  chipText: {
    fontFamily: Fonts.body, fontSize: 12, color: Colors.text2, maxWidth: 130,
  },
  recentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: Colors.line,
  },
  recentIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
  },
  recentText: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text },
  sectionDivider: { height: 1, backgroundColor: Colors.line, marginVertical: Spacing.s3 },
  priceRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: Spacing.s3,
  },
  btnText: { fontFamily: Fonts.bodyBold, fontSize: 16, color: '#02110B', fontWeight: '700' },
})
