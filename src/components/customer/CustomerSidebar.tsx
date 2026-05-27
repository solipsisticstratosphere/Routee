import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Colors, Fonts, Radius, Spacing } from '../../theme'
import { Avatar } from '../shared/Avatar'
import { CloseIcon, HomeIcon, ListIcon, PowerIcon, UserIcon } from '../shared/Icons'
import { useAuthStore } from '../../store/authStore'
import { useCustomerSidebar } from '../../contexts/CustomerSidebarContext'

const SIDEBAR_W = 300
const OPEN_EASING = Easing.out(Easing.cubic)
const CLOSE_EASING = Easing.in(Easing.cubic)

export function CustomerSidebar() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { user, logout } = useAuthStore()
  const { isOpen, close } = useCustomerSidebar()

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
      navigation.navigate('CustomerTabs' as never, { screen } as never)
    }, 230)
  }

  if (!rendered) return null

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
            <Avatar name={user?.name ?? 'U'} size={52} />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name} numberOfLines={1}>{user?.name ?? 'Customer'}</Text>
            <Text style={styles.phone}>{user?.phone || ''}</Text>
          </View>
          <Pressable onPress={close} style={styles.closeBtn}>
            <CloseIcon size={16} color={Colors.text2} />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <Pressable style={styles.navLink} onPress={() => goToTab('MapTab')}>
          <HomeIcon size={17} color={Colors.mint} />
          <Text style={styles.navLinkText}>Map</Text>
        </Pressable>

        <Pressable style={styles.navLink} onPress={() => goToTab('OrdersTab')}>
          <ListIcon size={17} color={Colors.orange} />
          <Text style={styles.navLinkText}>Orders</Text>
        </Pressable>

        <Pressable style={styles.navLink} onPress={() => goToTab('ProfileTab')}>
          <UserIcon size={17} color={Colors.text2} />
          <Text style={styles.navLinkText}>Profile</Text>
        </Pressable>

        <View style={{ flex: 1 }} />
        <View style={styles.divider} />
        <Pressable
          style={styles.logoutBtn}
          onPress={() => {
            close()
            Alert.alert('Logout', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: logout },
            ])
          }}
        >
          <PowerIcon size={17} color={Colors.red} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </Animated.View>
    </>
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
    fontWeight: '700', marginBottom: 4,
  },
  phone: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text2 },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
  },
  divider: { height: 1, backgroundColor: Colors.line, marginVertical: 16 },
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
