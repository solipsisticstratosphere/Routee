import React, { useState, useRef } from 'react'
import {
  View, Text, TextInput, StyleSheet, Pressable, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { CTA } from '../../components/shared/CTA'
import { useAuthStore } from '../../store/authStore'
import { RootStackParamList } from '../../navigation/RootNavigator'
import { BackIcon } from '../../components/shared/Icons'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Auth'>
  route: RouteProp<RootStackParamList, 'Auth'>
}

export default function AuthScreen({ navigation, route }: Props) {
  const role = route.params?.role ?? 'customer'
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const login = useAuthStore((s) => s.login)

  const [phone, setPhone] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef<(TextInput | null)[]>([])
  const [loading, setLoading] = useState(false)

  const handlePhoneSubmit = () => {
    if (phone.length < 6) {
      Alert.alert(t('auth.enterValidPhone'))
      return
    }
    setStep('otp')
  }

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus()
    if (next.every((d) => d !== '')) handleLogin(next)
  }

  const handleOtpKeyPress = (key: string, idx: number) => {
    if (key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus()
    }
  }

  const handleLogin = (digits: string[]) => {
    setLoading(true)
    setTimeout(() => {
      login(phone || '+380', digits.join(''), role)
    }, 800)
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        {/* back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <BackIcon size={20} color={Colors.text} />
        </Pressable>

        <View style={styles.header}>
          <Text style={T.h1}>
            {step === 'phone' ? t('auth.enterPhone') : t('auth.enterOtp')}
          </Text>
          <Text style={[T.body, { color: Colors.text2, marginTop: 6 }]}>
            {step === 'phone'
              ? t('auth.signingInAs', { role: role === 'driver' ? t('auth.roleDriver') : t('auth.roleCustomer') })
              : t('auth.sentTo', { phone: phone || '+380' })}
          </Text>
        </View>

        {step === 'phone' ? (
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <Text style={[T.body, { color: Colors.text }]}>🇺🇦 +380</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder={t('auth.phonePlaceholder')}
              placeholderTextColor={Colors.text3}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onSubmitEditing={handlePhoneSubmit}
              returnKeyType="next"
            />
          </View>
        ) : (
          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(r) => { otpRefs.current[i] = r }}
                style={[styles.otpBox, digit && styles.otpBoxFilled]}
                value={digit}
                onChangeText={(v) => handleOtpChange(v, i)}
                onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectionColor={Colors.mint}
                autoFocus={i === 0}
              />
            ))}
          </View>
        )}

        <View style={styles.btnWrap}>
          {step === 'phone' && (
            <CTA onPress={handlePhoneSubmit} loading={loading} color={role === 'driver' ? 'orange' : 'mint'}>
              <Text>{t('auth.continue')}</Text>
            </CTA>
          )}
          {step === 'otp' && (
            <CTA
              onPress={() => handleLogin(otp)}
              loading={loading}
              color={role === 'driver' ? 'orange' : 'mint'}
              disabled={otp.some((d) => !d)}
            >
              <Text>{t('auth.verifyAndLogin')}</Text>
            </CTA>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flexGrow: 1, padding: Spacing.s6 },
  back: { marginBottom: Spacing.s6, alignSelf: 'flex-start' },
  header: { marginBottom: Spacing.s7 },
  phoneRow: { flexDirection: 'row', gap: 10, marginBottom: Spacing.s6 },
  countryCode: {
    height: 52, paddingHorizontal: 16, backgroundColor: Colors.elevated,
    borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.line,
    alignItems: 'center', justifyContent: 'center',
  },
  phoneInput: {
    flex: 1, height: 52, paddingHorizontal: 16,
    backgroundColor: Colors.elevated, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.line,
    color: Colors.text, fontFamily: Fonts.body, fontSize: 15,
  },
  otpRow: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginBottom: Spacing.s6 },
  otpBox: {
    width: 46, height: 56, borderRadius: Radius.md,
    backgroundColor: Colors.elevated, borderWidth: 1, borderColor: Colors.line,
    color: Colors.text, fontFamily: Fonts.monoBold, fontSize: 22,
  },
  otpBoxFilled: { borderColor: Colors.mint, backgroundColor: Colors.mintGlow },
  btnWrap: { marginTop: 'auto', paddingTop: Spacing.s6 },
})
