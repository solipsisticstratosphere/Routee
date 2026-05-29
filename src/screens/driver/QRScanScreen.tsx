import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { QRFrame } from '../../components/shared/QRFrame'
import { CTA } from '../../components/shared/CTA'
import { CloseIcon, CheckIcon } from '../../components/shared/Icons'
import { useDriverStore } from '../../store/driverStore'

export default function QRScanScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { t } = useTranslation()
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [success, setSuccess] = useState(false)
  const { currentOrder, completeOrder } = useDriverStore()

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return
    setScanned(true)
    if (data === currentOrder?.id || data.length > 4) {
      handleSuccess()
    } else {
      Alert.alert(t('qrScan.alertInvalidQrTitle'), t('qrScan.alertInvalidQrMsg'), [
        { text: t('qrScan.alertTryAgain'), onPress: () => setScanned(false) },
      ])
    }
  }

  const handleSuccess = () => {
    setSuccess(true)
    completeOrder()
    setTimeout(() => navigation.navigate('DriverTabs'), 2000)
  }

  if (!permission) return <View style={styles.container} />

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={[T.body, { color: Colors.text2, textAlign: 'center', paddingHorizontal: 40 }]}>
          {t('qrScan.permissionRequired')}
        </Text>
        <CTA onPress={requestPermission} color="mint" full={false}>
          <Text style={{ fontFamily: Fonts.bodyBold, color: '#02110B' }}>{t('qrScan.grantPermission')}</Text>
        </CTA>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!success ? (
        <>
          <CameraView
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />

          {/* overlay */}
          <View style={styles.overlay} pointerEvents="none">
            <View style={styles.overlayTop} />
            <View style={styles.overlayRow}>
              <View style={styles.overlaySide} />
              <QRFrame />
              <View style={styles.overlaySide} />
            </View>
            <View style={styles.overlayBottom} />
          </View>

          {/* header */}
          <View style={[styles.header, { top: insets.top + 12 }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
              <CloseIcon size={18} color={Colors.text} />
            </Pressable>
            <Text style={[T.h3, { flex: 1, textAlign: 'center' }]}>{t('qrScan.title')}</Text>
            <View style={{ width: 36 }} />
          </View>

          {/* manual entry */}
          <View style={[styles.manual, { bottom: insets.bottom + 24 }]}>
            <Text style={[T.sm, { color: Colors.text2, textAlign: 'center', marginBottom: 8 }]}>
              {t('qrScan.manualEntryHint')}
            </Text>
            <View style={styles.manualRow}>
              <TextInput
                style={styles.codeInput}
                value={manualCode}
                onChangeText={setManualCode}
                placeholder={t('qrScan.manualPlaceholder')}
                placeholderTextColor={Colors.text3}
                autoCapitalize="none"
              />
              <Pressable
                onPress={() => manualCode.length >= 4 ? handleSuccess() : Alert.alert(t('qrScan.alertEnterValidCode'))}
                style={styles.submitBtn}
              >
                <CheckIcon size={18} color={Colors.bg} />
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.center}>
          <View style={styles.successIcon}>
            <CheckIcon size={36} color={Colors.mint} />
          </View>
          <Text style={[T.h2, { color: Colors.mint, textAlign: 'center' }]}>{t('qrScan.orderComplete')}</Text>
          <Text style={[T.body, { color: Colors.text2, textAlign: 'center' }]}>
            {t('qrScan.deliveryConfirmed')}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 },
  header: {
    position: 'absolute', left: 16, right: 16,
    flexDirection: 'row', alignItems: 'center',
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
  },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  overlayTop: { flex: 1, backgroundColor: 'rgba(10,14,26,0.75)' },
  overlayRow: { flexDirection: 'row' },
  overlaySide: { flex: 1, backgroundColor: 'rgba(10,14,26,0.75)' },
  overlayBottom: { flex: 1.5, backgroundColor: 'rgba(10,14,26,0.75)' },
  manual: { position: 'absolute', left: 24, right: 24 },
  manualRow: { flexDirection: 'row', gap: 10 },
  codeInput: {
    flex: 1, height: 48, paddingHorizontal: 14,
    backgroundColor: Colors.elevated, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.line,
    color: Colors.text, fontFamily: Fonts.mono, fontSize: 15,
  },
  submitBtn: {
    width: 48, height: 48, borderRadius: Radius.md,
    backgroundColor: Colors.mint, alignItems: 'center', justifyContent: 'center',
  },
  successIcon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.mintGlow, borderWidth: 2, borderColor: Colors.mint,
    alignItems: 'center', justifyContent: 'center',
  },
})
