import React from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { Colors, T, Spacing, Fonts, Radius } from '../../theme'
import { StatusPill } from '../../components/shared/StatusPill'
import { MenuIcon } from '../../components/shared/Icons'
import { mockOrders } from '../../mock/mockOrders'
import { Order } from '../../types'
import { useCustomerSidebar } from '../../contexts/CustomerSidebarContext'

export default function OrdersListScreen() {
  const insets = useSafeAreaInsets()
  const { t, i18n } = useTranslation()
  const { open } = useCustomerSidebar()

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.emoji}>
          {item.vehicleType === 'bike' ? '🚲' : item.vehicleType === 'van' ? '🚐' : '🚗'}
        </Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.addr} numberOfLines={1}>
            → {t(`addresses.${item.dropoff.address}`, { defaultValue: item.dropoff.address })}
          </Text>
          <Text style={styles.sub}>
            {new Date(item.createdAt).toLocaleDateString(i18n.language === 'uk' ? 'uk-UA' : 'en-US')}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 6 }}>
          <Text style={styles.price}>${item.price}</Text>
          <StatusPill color={Colors.mint} label={t('liveTracking.statusDelivered')} glow={false} />
        </View>
      </View>
    </View>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <Pressable onPress={open} style={styles.menuBtn}>
          <MenuIcon size={20} color={Colors.text} />
        </Pressable>
        <Text style={[T.h2, styles.headerTitle]}>{t('ordersList.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.s4, paddingVertical: Spacing.s4,
  },
  headerTitle: { flex: 1, textAlign: 'center' },
  headerSpacer: { width: 40 },
  menuBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
  list: { paddingHorizontal: Spacing.s4, gap: 10 },
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: 14, borderWidth: 1, borderColor: Colors.line,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  emoji: { fontSize: 22, width: 36, textAlign: 'center' },
  addr: { fontFamily: Fonts.bodyMedium, fontSize: 14, color: Colors.text },
  sub: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text3, marginTop: 2 },
  price: { fontFamily: Fonts.bodyBold, fontSize: 15, color: Colors.text, fontWeight: '700' },
})
