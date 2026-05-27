import React from 'react'
import {
  View, Text, StyleSheet, FlatList, Switch, Pressable,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { Avatar } from '../../components/shared/Avatar'
import { StarIcon, BellIcon, ChevIcon, UserIcon, MenuIcon } from '../../components/shared/Icons'
import { useAuthStore } from '../../store/authStore'
import { mockOrders } from '../../mock/mockOrders'
import { Order } from '../../types'

import { useDriverSidebar } from '../../contexts/DriverSidebarContext'
import { useCustomerSidebar } from '../../contexts/CustomerSidebarContext'

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuthStore()
  const [notifs, setNotifs] = React.useState(true)
  const { open: openDriverSidebar } = useDriverSidebar()
  const { open: openCustomerSidebar } = useCustomerSidebar()
  const isDriver = user?.role === 'driver'
  const openSidebar = isDriver ? openDriverSidebar : openCustomerSidebar
  const bottomPad = insets.bottom + 24

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderRow}>
      <View style={styles.orderIcon}>
        <Text style={{ fontSize: 16 }}>
          {item.vehicleType === 'bike' ? '🚲' : item.vehicleType === 'van' ? '🚐' : '🚗'}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.orderAddr} numberOfLines={1}>{item.dropoff.address}</Text>
        <Text style={styles.orderDate}>{new Date(item.createdAt).toLocaleDateString('uk-UA')}</Text>
      </View>
      <Text style={styles.orderPrice}>${item.price}</Text>
    </View>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={mockOrders.slice(0, 6)}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Pressable onPress={openSidebar} style={styles.menuBtn}>
                <MenuIcon size={20} color={Colors.text} />
              </Pressable>
              <Text style={styles.headerTitle}>Profile</Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* profile card */}
            <View style={styles.card}>
              <Avatar name={user?.name ?? 'User'} size={72} />
              <View style={styles.userInfo}>
                <Text style={T.h2}>{user?.name ?? 'User'}</Text>
                <Text style={[T.sm, { color: Colors.text2 }]}>{user?.phone || '+380 XX XXX XXXX'}</Text>
                <View style={styles.ratingRow}>
                  <StarIcon size={14} color={Colors.amber} />
                  <Text style={styles.rating}>{user?.rating.toFixed(1)}</Text>
                </View>
              </View>
            </View>

            {/* settings */}
            <Text style={[T.xs, styles.sectionTitle]}>Settings</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingRow}>
                <BellIcon size={18} color={Colors.text2} />
                <Text style={styles.settingLabel}>Notifications</Text>
                <Switch
                  value={notifs}
                  onValueChange={setNotifs}
                  trackColor={{ false: Colors.elevated, true: Colors.mint }}
                  thumbColor="#fff"
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.settingRow}>
                <UserIcon size={18} color={Colors.text2} />
                <Text style={styles.settingLabel}>Language</Text>
                <View style={styles.langRow}>
                  <Text style={styles.langText}>English</Text>
                  <ChevIcon size={14} color={Colors.text3} />
                </View>
              </View>
            </View>

            <Text style={[T.xs, styles.sectionTitle]}>Recent Trips</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: Spacing.s6 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  list: { padding: Spacing.s4, gap: 0 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.s3,
  },
  headerTitle: {
    flex: 1, textAlign: 'center',
    fontFamily: Fonts.bodyBold, fontSize: 17, color: Colors.text, fontWeight: '700',
  },
  headerSpacer: { width: 40 },
  menuBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: 20, marginBottom: Spacing.s5,
    borderWidth: 1, borderColor: Colors.line,
  },
  userInfo: { flex: 1, gap: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  rating: { fontFamily: Fonts.bodyBold, fontSize: 13, color: Colors.amber },
  sectionTitle: { color: Colors.text3, marginBottom: Spacing.s2, marginTop: Spacing.s4 },
  settingsCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.line,
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16,
  },
  settingLabel: { flex: 1, fontFamily: Fonts.body, fontSize: 15, color: Colors.text },
  divider: { height: 1, backgroundColor: Colors.line, marginHorizontal: 16 },
  langRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  langText: { fontFamily: Fonts.body, fontSize: 13, color: Colors.text2 },
  orderRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.line,
  },
  orderIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.elevated, alignItems: 'center', justifyContent: 'center',
  },
  orderAddr: { fontFamily: Fonts.bodyMedium, fontSize: 14, color: Colors.text },
  orderDate: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text3, marginTop: 2 },
  orderPrice: { fontFamily: Fonts.bodyBold, fontSize: 14, color: Colors.text, fontWeight: '700' },
  footer: { marginTop: Spacing.s6, paddingBottom: Spacing.s4 },
})
