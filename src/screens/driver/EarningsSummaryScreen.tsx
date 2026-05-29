import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { EarningsChart } from '../../components/driver/EarningsChart'
import { CTA } from '../../components/shared/CTA'
import { MenuIcon } from '../../components/shared/Icons'
import { useDriverStore } from '../../store/driverStore'
import { useDriverSidebar } from '../../contexts/DriverSidebarContext'
import { Earnings } from '../../types'

type Segment = 'Day' | 'Week' | 'Month'

export default function EarningsSummaryScreen() {
  const insets = useSafeAreaInsets()
  const { t, i18n } = useTranslation()
  const { earnings } = useDriverStore()
  const { open } = useDriverSidebar()
  const [segment, setSegment] = useState<Segment>('Week')

  const getSegmentLabel = (s: Segment) => {
    if (i18n.language === 'uk') {
      return { Day: 'День', Week: 'Тиждень', Month: 'Місяць' }[s]
    }
    return s
  }

  const history = earnings.history
  const total = history.reduce((s, e) => s + e.amount, 0)
  const trips = history.reduce((s, e) => s + e.trips, 0)
  const avg = trips > 0 ? (total / trips).toFixed(2) : '0.00'

  const renderItem = ({ item }: { item: Earnings }) => (
    <View style={styles.row}>
      <View style={styles.dateCol}>
        <Text style={styles.dayText}>{new Date(item.date).toLocaleDateString(i18n.language === 'uk' ? 'uk-UA' : 'en-US', { weekday: 'short' })}</Text>
        <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString(i18n.language === 'uk' ? 'uk-UA' : 'en-US', { month: 'short', day: 'numeric' })}</Text>
      </View>
      <Text style={styles.tripsText}>{t('shared.tripsCount', { count: item.trips, defaultValue: `${item.trips} trips` })}</Text>
      <Text style={styles.amountText}>${item.amount}</Text>
    </View>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Pressable onPress={open} style={styles.menuBtn}>
                <MenuIcon size={20} color={Colors.text} />
              </Pressable>
              <Text style={[T.h2, styles.headerTitle]}>{t('earningsSummary.title')}</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.segmented}>
              {(['Day', 'Week', 'Month'] as Segment[]).map((s) => (
                <Pressable
                  key={s}
                  onPress={() => setSegment(s)}
                  style={[styles.segBtn, segment === s && styles.segActive]}
                >
                  <Text style={[styles.segText, { color: segment === s ? Colors.mint : Colors.text2 }]}>
                    {getSegmentLabel(s)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <EarningsChart data={history} />

            <View style={styles.statsRow}>
              <StatCard label={t('earningsSummary.statsTotal')} value={`$${total}`} />
              <StatCard label={t('earningsSummary.statsTrips')} value={String(trips)} />
              <StatCard label={t('earningsSummary.statsAvg')} value={`$${avg}`} />
            </View>

            <Text style={[T.xs, { marginTop: Spacing.s4, marginBottom: Spacing.s2 }]}>{t('earningsSummary.history')}</Text>
          </View>
        }
        ListFooterComponent={
          <View style={{ marginTop: Spacing.s4, paddingBottom: insets.bottom + 24 }}>
            <CTA
              color="orange"
              onPress={() => Alert.alert(t('earningsSummary.alertPayoutTitle'), t('earningsSummary.alertPayoutMsg', { amount: total }))}
            >
              <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#1A0700', fontWeight: '700' }}>
                {t('earningsSummary.requestPayout', { amount: total })}
              </Text>
            </CTA>
          </View>
        }
      />
    </View>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  list: { padding: Spacing.s4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.s4 },
  headerTitle: { flex: 1, textAlign: 'center' },
  headerSpacer: { width: 40 },
  menuBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
  segmented: {
    flexDirection: 'row', backgroundColor: Colors.elevated,
    borderRadius: Radius.md, padding: 4, marginBottom: Spacing.s4,
    borderWidth: 1, borderColor: Colors.line,
  },
  segBtn: { flex: 1, paddingVertical: 8, borderRadius: Radius.sm, alignItems: 'center' },
  segActive: { backgroundColor: Colors.surface },
  segText: { fontFamily: Fonts.bodyMedium, fontSize: 13 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: Spacing.s4 },
  statCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: 12, alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: Colors.line,
  },
  statValue: { fontFamily: Fonts.monoBold, fontSize: 18, color: Colors.mint, fontWeight: '700' },
  statLabel: { fontFamily: Fonts.body, fontSize: 11, color: Colors.text2 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.line,
  },
  dateCol: { width: 52, gap: 2 },
  dayText: { fontFamily: Fonts.bodyBold, fontSize: 13, color: Colors.text },
  dateText: { fontFamily: Fonts.body, fontSize: 11, color: Colors.text3 },
  tripsText: { flex: 1, fontFamily: Fonts.body, fontSize: 13, color: Colors.text2 },
  amountText: { fontFamily: Fonts.monoBold, fontSize: 16, color: Colors.orange, fontWeight: '700' },
})
