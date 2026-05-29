import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, Spacing } from '../../theme'
import { Avatar } from '../shared/Avatar'
import { OnlineToggle } from './OnlineToggle'
import { StatusPill } from '../shared/StatusPill'
import { CloseIcon, PowerIcon, TrendIcon, UserIcon, ZapIcon } from '../shared/Icons'
import { useAuthStore } from '../../store/authStore'
import { useDriverStore } from '../../store/driverStore'
import { useDriverSidebar } from '../../contexts/DriverSidebarContext'

const SIDEBAR_W = 300
const OPEN_EASING = Easing.out(Easing.cubic)
const CLOSE_EASING = Easing.in(Easing.cubic)

export function DriverSidebar() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { t } = useTranslation()
  const { user, logout } = useAuthStore()
  const { isOnline, earnings, toggleOnline } = useDriverStore()
  const { isOpen, close } = useDriverSidebar()

  const [rendered, setRendered] = useState(false)
  const slideX = useSharedValue(-SIDEBAR_W)
  const overlayOpacity = useSharedValue(0)

  useEffect(() => {
    if (isOpen) {
      if (!rendered) setRendered(true)
      slideX.value = withTiming(0, { duration: 260, easing: OPEN_EASING })
      overlayOpacity.value = withTiming(0.55, { duration: 220 })
    } else {
      overlayOpacity.value = withTiming(0, { duration: 180 })
      slideX.value = withTiming(-SIDEBAR_W, { duration: 220, easing: CLOSE_EASING })
    }
  }, [isOpen])

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }))

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }))

  const goToTab = (screen: string) => {
    close()
    setTimeout(() => {
      navigation.navigate('DriverTabs' as never, { screen } as never)
    }, 230)
  }

  if (!rendered) return null

  const totalTrips = earnings.history.reduce((s, e) => s + e.trips, 0)

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sidebar,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 },
          sidebarStyle,
        ]}
      >
        <View style={styles.head}>
          <Pressable onPress={() => goToTab('ProfileTab')}>
            <Avatar name={user?.name ?? 'D'} size={52} />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name} numberOfLines={1}>{user?.name ?? 'Driver'}</Text>
            <StatusPill
              color={isOnline ? Colors.mint : Colors.text3}
              label={isOnline ? t('driverDashboard.onlineStatus').replace('● ', '') : t('driverDashboard.offlineStatus').replace('○ ', '')}
            />
          </View>
          <Pressable onPress={close} style={styles.closeBtn}>
            <CloseIcon size={16} color={Colors.text2} />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleLabel}>{t('sidebar.goOnline')}</Text>
            <Text style={styles.toggleSub}>
              {isOnline ? t('sidebar.acceptingOrders') : t('sidebar.startAccepting')}
            </Text>
          </View>
          <OnlineToggle value={isOnline} onToggle={toggleOnline} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>{t('sidebar.earnings')}</Text>
        <View style={styles.statsRow}>
          <StatCard label={t('sidebar.today')} value={`$${earnings.today}`} color={Colors.mint} />
          <StatCard label={t('sidebar.week')} value={`$${earnings.week}`} color={Colors.orange} />
          <StatCard label={t('sidebar.trips')} value={String(totalTrips)} color={Colors.text} />
        </View>

        <Pressable style={styles.navLink} onPress={() => goToTab('DashTab')}>
          <ZapIcon size={17} color={Colors.mint} />
          <Text style={styles.navLinkText}>{t('sidebar.dashboard')}</Text>
        </Pressable>

        <Pressable style={styles.navLink} onPress={() => goToTab('EarningsTab')}>
          <TrendIcon size={17} color={Colors.orange} />
          <Text style={styles.navLinkText}>{t('sidebar.earnings')}</Text>
        </Pressable>

        <Pressable style={styles.navLink} onPress={() => goToTab('ProfileTab')}>
          <UserIcon size={17} color={Colors.text2} />
          <Text style={styles.navLinkText}>{t('sidebar.profile')}</Text>
        </Pressable>

        <View style={{ flex: 1 }} />
        <View style={styles.divider} />
        <Pressable
          style={styles.logoutBtn}
          onPress={() => {
            close()
            Alert.alert(t('shared.logoutTitle'), t('shared.logoutConfirm'), [
              { text: t('shared.cancel'), style: 'cancel' },
              { text: t('shared.logout'), style: 'destructive', onPress: logout },
            ])
          }}
        >
          <PowerIcon size={17} color={Colors.red} />
          <Text style={styles.logoutText}>{t('shared.logout')}</Text>
        </Pressable>
      </Animated.View>
    </>
  )
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: '#000' },
  sidebar: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: SIDEBAR_W,
    backgroundColor: Colors.surface,
    borderRightWidth: 1, borderRightColor: Colors.line,
    paddingHorizontal: Spacing.s4,
  },
  head: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: {
    fontFamily: Fonts.bodyBold, fontSize: 16, color: Colors.text,
    fontWeight: '700', marginBottom: 6,
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
  },
  divider: { height: 1, backgroundColor: Colors.line, marginVertical: 16 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { fontFamily: Fonts.bodyBold, fontSize: 15, color: Colors.text, fontWeight: '600' },
  toggleSub: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text2, marginTop: 2 },
  sectionLabel: {
    fontFamily: Fonts.body, fontSize: 11, color: Colors.text3,
    marginBottom: Spacing.s2, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1, backgroundColor: Colors.elevated, borderRadius: Radius.md,
    padding: 12, alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: Colors.line,
  },
  statValue: { fontFamily: Fonts.monoBold, fontSize: 16, fontWeight: '700' },
  statLabel: { fontFamily: Fonts.body, fontSize: 10, color: Colors.text2 },
  navLink: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8,
    padding: 14, backgroundColor: Colors.elevated, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.line,
  },
  navLinkText: { fontFamily: Fonts.bodyMedium, fontSize: 15, color: Colors.text },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.red + '33',
    backgroundColor: Colors.red + '12',
  },
  logoutText: { fontFamily: Fonts.bodyMedium, fontSize: 15, color: Colors.red },
})
