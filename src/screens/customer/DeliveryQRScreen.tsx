import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import QRCode from 'react-native-qrcode-svg'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { StatusTimeline } from '../../components/shared/StatusTimeline'
import { CTA } from '../../components/shared/CTA'
import { useOrderStore } from '../../store/orderStore'
import { CustomerMapStackParamList } from '../../navigation/CustomerTabs'

type Props = { navigation: StackNavigationProp<CustomerMapStackParamList, 'DeliveryQR'> }

export default function DeliveryQRScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { currentOrder, updateStatus, cancelOrder } = useOrderStore()
  const [activeStep, setActiveStep] = useState(2)

  const STEPS = [
    { label: t('deliveryQR.step0'), sublabel: t('deliveryQR.step0Sub') },
    { label: t('deliveryQR.step1'), sublabel: t('deliveryQR.step1Sub') },
    { label: t('deliveryQR.step2'), sublabel: t('deliveryQR.step2Sub') },
    { label: t('deliveryQR.step3'), sublabel: t('deliveryQR.step3Sub') },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep(3)
      updateStatus('delivered')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const orderId = currentOrder?.id ?? 'ORDER_001'

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={[T.h2, styles.title]}>{t('deliveryQR.title')}</Text>

      <View style={styles.card}>
        <StatusTimeline steps={STEPS} activeStep={activeStep} />
      </View>

      <View style={styles.qrContainer}>
        <Text style={[T.sm, { color: Colors.text2, marginBottom: Spacing.s3, textAlign: 'center' }]}>
          {t('deliveryQR.showCode')}
        </Text>
        <View style={styles.qrBox}>
          <QRCode
            value={orderId}
            size={160}
            color={Colors.text}
            backgroundColor={Colors.elevated}
          />
        </View>
        <Text style={[T.xs, { marginTop: Spacing.s2, color: Colors.text3, textAlign: 'center' }]}>
          {orderId}
        </Text>
      </View>

      {activeStep === 3 && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <CTA color="mint" onPress={() => {
            cancelOrder()
            navigation.navigate('HomeMap')
          }}>
            <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#02110B', fontWeight: '700' }}>
              {t('deliveryQR.backToHome')}
            </Text>
          </CTA>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Spacing.s4 },
  title: { marginBottom: Spacing.s4 },
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: 16, borderWidth: 1, borderColor: Colors.line,
    marginBottom: Spacing.s4,
  },
  qrContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  qrBox: {
    padding: 20, backgroundColor: Colors.elevated,
    borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.line,
  },
  footer: { paddingTop: Spacing.s4 },
})
