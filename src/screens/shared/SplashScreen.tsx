import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import Svg, { Path, Rect, Circle, Defs, RadialGradient, Stop } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withTiming, withRepeat, withSequence, withDelay,
} from 'react-native-reanimated'
import { Colors, Fonts, T } from '../../theme'
import { CTA } from '../../components/shared/CTA'
import { ArrowIcon } from '../../components/shared/Icons'
import { useAuthStore } from '../../store/authStore'
import { RootStackParamList } from '../../navigation/RootNavigator'

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Splash'> }

function Logo({ size = 56 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <Rect width={56} height={56} rx={16} fill={Colors.elevated} />
      <Rect width={56} height={56} rx={16} fill="url(#lgr)" opacity={0.4} />
      <Path d="M14 42 V14 H30 a8 8 0 0 1 0 16 H20" stroke={Colors.mint} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M22 30 L36 42" stroke={Colors.mint} strokeWidth={4} strokeLinecap="round" fill="none" />
      <Circle cx={14} cy={14} r={3} fill={Colors.mint} />
      <Circle cx={36} cy={42} r={3} fill={Colors.orange} />
      <Defs>
        <RadialGradient id="lgr" cx="0.2" cy="0.2">
          <Stop offset={0} stopColor={Colors.mint} stopOpacity={0.6} />
          <Stop offset={1} stopColor={Colors.mint} stopOpacity={0} />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

function AnimatedLogo({ size = 56 }: { size?: number }) {
  const scale = useSharedValue(0.72)
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(1, { damping: 11, stiffness: 110 })
    opacity.value = withTiming(1, { duration: 450 })
    translateY.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(-7, { duration: 2000 }),
          withTiming(0, { duration: 2000 }),
        ),
        -1,
      ),
    )
  }, [])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }))

  return (
    <Animated.View style={style}>
      <Logo size={size} />
    </Animated.View>
  )
}

export default function SplashScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const setRole = useAuthStore((s) => s.setRole)

  const handleCustomer = () => {
    setRole('customer')
    navigation.navigate('Auth', { role: 'customer' })
  }

  const handleDriver = () => {
    setRole('driver')
    navigation.navigate('Auth', { role: 'driver' })
  }

  return (
    <View style={styles.container}>
      {/* background gradient accents */}
      <View style={styles.accentTop} pointerEvents="none" />
      <View style={styles.accentBottom} pointerEvents="none" />

      {/* center content */}
      <View style={styles.center}>
        <AnimatedLogo size={80} />
        <Text style={[T.display, styles.appName]}>Routee</Text>
        <Text style={[T.body, styles.tagline]}>
          {t('splash.tagline')}
        </Text>
      </View>

      {/* CTAs */}
      <View style={[styles.ctas, { paddingBottom: insets.bottom + 24 }]}>
        <CTA color="mint" onPress={handleCustomer}>
          <Text style={styles.ctaText}>{t('splash.customerBtn')}</Text>
          <ArrowIcon size={18} color="#02110B" />
        </CTA>
        <CTA color="orange" onPress={handleDriver}>
          <Text style={[styles.ctaText, { color: '#1A0700' }]}>{t('splash.driverBtn')}</Text>
          <ArrowIcon size={18} color="#1A0700" />
        </CTA>
        <Text style={[T.sm, styles.signin]}>
          {t('splash.alreadyHaveAccount')}{' '}
          <Text
            style={{ color: Colors.mint, fontWeight: '600' }}
            onPress={handleCustomer}
          >
            {t('splash.signIn')}
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  accentTop: {
    position: 'absolute', top: -160, left: -120, width: 380, height: 380,
    borderRadius: 190, backgroundColor: 'rgba(0,229,160,0.14)',
  },
  accentBottom: {
    position: 'absolute', bottom: -200, right: -140, width: 460, height: 460,
    borderRadius: 230, backgroundColor: 'rgba(255,107,53,0.12)',
  },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28,
  },
  appName: {
    marginTop: 28, fontSize: 40, fontWeight: '700', letterSpacing: -1,
    textAlign: 'center', color: Colors.text,
  },
  tagline: {
    marginTop: 10, fontSize: 16, color: Colors.text2, textAlign: 'center', maxWidth: 280,
  },
  ctas: { paddingHorizontal: 24, gap: 12 },
  ctaText: { fontFamily: Fonts.bodyBold, fontSize: 16, fontWeight: '700' },
  signin: { color: Colors.text2, textAlign: 'center', marginTop: 8 },
})
