import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedProps, withTiming, Easing, runOnJS,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { CTA } from '../../components/shared/CTA'
import { PinIcon, ZapIcon, ClockIcon } from '../../components/shared/Icons'
import { useDriverStore } from '../../store/driverStore'

const RADIUS = 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function IncomingOrderScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { incomingOrder, acceptOrder, declineOrder } = useDriverStore()

  const strokeDash = useSharedValue(0)

  const handleDecline = useCallback(() => {
    declineOrder()
    navigation.goBack()
  }, [declineOrder])

  useEffect(() => {
    strokeDash.value = withTiming(CIRCUMFERENCE, {
      duration: 10000,
      easing: Easing.linear,
    }, (finished) => {
      if (finished) runOnJS(handleDecline)()
    })
  }, [])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeDash.value,
  }))

  const handleAccept = () => {
    if (!incomingOrder) return
    acceptOrder(incomingOrder)
    navigation.navigate('DriverTabs', { screen: 'DashTab', params: { screen: 'NavigationToPickup' } })
  }

  if (!incomingOrder) return null

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        {/* countdown ring */}
        <View style={styles.ringContainer}>
          <Svg width={110} height={110} viewBox="0 0 110 110">
            <Circle
              cx={55} cy={55} r={RADIUS}
              stroke={Colors.line2}
              strokeWidth={6}
              fill="none"
            />
            <AnimatedCircle
              animatedProps={animatedProps}
              cx={55} cy={55} r={RADIUS}
              stroke={Colors.orange}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              rotation={-90}
              origin="55, 55"
            />
          </Svg>
          <View style={styles.ringInner}>
            <ZapIcon size={24} color={Colors.orange} />
          </View>
        </View>

        <Text style={T.h1}>Incoming Order</Text>
        <Text style={[T.sm, { color: Colors.text2, textAlign: 'center', marginTop: 4 }]}>
          Accept within 10 seconds
        </Text>

        {/* payout */}
        <View style={styles.payoutBadge}>
          <Text style={styles.payoutAmount}>${incomingOrder.price}</Text>
          <Text style={styles.payoutLabel}>Payout</Text>
        </View>

        {/* details */}
        <View style={styles.detailsCard}>
          <DetailRow
            icon={<View style={[styles.dot, { backgroundColor: Colors.mint }]} />}
            label={incomingOrder.pickup.address}
          />
          <View style={styles.divider} />
          <DetailRow
            icon={<View style={[styles.dot, { backgroundColor: Colors.orange }]} />}
            label={incomingOrder.dropoff.address}
          />
          <View style={styles.divider} />
          <DetailRow
            icon={<ClockIcon size={14} color={Colors.text2} />}
            label={`${incomingOrder.eta} min · ${incomingOrder.distance} km`}
          />
        </View>

        {/* actions */}
        <View style={styles.actions}>
          <Pressable onPress={handleDecline} style={styles.declineBtn}>
            <Text style={styles.declineText}>Decline</Text>
          </Pressable>
          <View style={{ flex: 1 }}>
            <CTA color="orange" onPress={handleAccept}>
              <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#1A0700', fontWeight: '700' }}>
                Accept
              </Text>
            </CTA>
          </View>
        </View>
      </View>
    </View>
  )
}

function DetailRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
      {icon}
      <Text style={{ fontFamily: Fonts.body, fontSize: 14, color: Colors.text, flex: 1 }}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  content: { flex: 1, padding: Spacing.s4, alignItems: 'center', gap: 16 },
  ringContainer: { width: 110, height: 110, alignItems: 'center', justifyContent: 'center' },
  ringInner: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  payoutBadge: {
    backgroundColor: Colors.orangeGlow, borderRadius: Radius.lg,
    paddingVertical: 12, paddingHorizontal: 28, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.orange + '44',
  },
  payoutAmount: { fontFamily: Fonts.monoBold, fontSize: 32, color: Colors.orange, fontWeight: '700' },
  payoutLabel: { fontFamily: Fonts.body, fontSize: 13, color: Colors.text2, marginTop: 2 },
  detailsCard: {
    width: '100%', backgroundColor: Colors.elevated, borderRadius: Radius.md,
    paddingHorizontal: 16, borderWidth: 1, borderColor: Colors.line,
  },
  divider: { height: 1, backgroundColor: Colors.line },
  dot: { width: 10, height: 10, borderRadius: 5, flexShrink: 0 },
  actions: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 'auto' },
  declineBtn: {
    width: 100, height: 56, borderRadius: Radius.md,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
  declineText: { fontFamily: Fonts.bodyMedium, fontSize: 15, color: Colors.text2 },
})
