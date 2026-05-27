import React, { useState } from 'react'
import {
  View, Text, StyleSheet, ScrollView, Pressable,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue, useAnimatedProps, useAnimatedStyle,
  withTiming, Easing, withDelay,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { CTA } from '../../components/shared/CTA'
import { CardUI } from '../../components/payment/CardUI'
import { TipSelector } from '../../components/payment/TipSelector'
import { CloseIcon } from '../../components/shared/Icons'
import { useNavigation } from '@react-navigation/native'

type TipOption = 0 | 10 | 15 | 20 | 'custom'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export default function PaymentScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const [selectedCard, setSelectedCard] = useState<'4242' | '1234'>('4242')
  const [tip, setTip] = useState<TipOption>(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const checkDash = useSharedValue(42)

  const basePrice = 80
  const tipAmount = tip === 'custom' ? 0 : Math.round(basePrice * (tip as number) / 100)
  const total = basePrice + tipAmount

  const checkProps = useAnimatedProps(() => ({
    strokeDashoffset: checkDash.value,
  }))

  const successStyle = useAnimatedStyle(() => ({
    opacity: checkDash.value < 42 ? 1 : 0,
  }))

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      checkDash.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) })
      setTimeout(() => {
        navigation.navigate('MapTab', { screen: 'LiveTracking' })
      }, 1200)
    }, 1500)
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.header}>
        <Text style={T.h2}>Payment</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <CloseIcon size={20} color={Colors.text2} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        {success ? (
          <Animated.View style={[styles.successContainer, successStyle]}>
            <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
              <AnimatedPath
                animatedProps={checkProps}
                d="M20 40l14 14 26-26"
                stroke={Colors.mint}
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={42}
              />
            </Svg>
            <Text style={[T.h2, { color: Colors.mint, textAlign: 'center' }]}>Payment Successful!</Text>
            <Text style={[T.body, { color: Colors.text2, textAlign: 'center' }]}>Redirecting to tracking…</Text>
          </Animated.View>
        ) : (
          <>
            <Text style={[T.xs, { marginBottom: Spacing.s2 }]}>Saved Cards</Text>
            <View style={{ gap: 10, marginBottom: Spacing.s4 }}>
              <CardUI
                last4="4242" brand="Visa" isSelected={selectedCard === '4242'}
                onPress={() => setSelectedCard('4242')}
              />
              <CardUI
                last4="1234" brand="Mastercard" isSelected={selectedCard === '1234'}
                onPress={() => setSelectedCard('1234')}
              />
            </View>

            <Text style={[T.xs, { marginBottom: Spacing.s2 }]}>Add Tip</Text>
            <TipSelector selected={tip} onSelect={setTip} />

            <View style={styles.breakdown}>
              <BreakdownRow label="Fare" value="$80.00" />
              <BreakdownRow label="Tip" value={`$${tipAmount.toFixed(2)}`} />
              <View style={styles.divider} />
              <BreakdownRow label="Total" value={`$${total.toFixed(2)}`} bold />
            </View>

            <CTA onPress={handlePay} loading={loading} color="mint">
              <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#02110B', fontWeight: '700' }}>
                Pay ${total.toFixed(2)}
              </Text>
            </CTA>
          </>
        )}
      </ScrollView>
    </View>
  )
}

function BreakdownRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
      <Text style={{ fontFamily: Fonts.body, fontSize: 14, color: Colors.text2 }}>{label}</Text>
      <Text style={{
        fontFamily: bold ? Fonts.bodyBold : Fonts.body,
        fontSize: bold ? 16 : 14,
        color: bold ? Colors.text : Colors.text2,
        fontWeight: bold ? '700' : '400',
      }}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.s4, marginBottom: Spacing.s4,
  },
  content: { padding: Spacing.s4, gap: 0 },
  breakdown: {
    backgroundColor: Colors.elevated, borderRadius: Radius.md,
    padding: 16, marginVertical: Spacing.s4,
    borderWidth: 1, borderColor: Colors.line,
  },
  divider: { height: 1, backgroundColor: Colors.line, marginVertical: 8 },
  successContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 60, gap: 16,
  },
})
