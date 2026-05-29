import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, T } from '../../theme'
import { LeafletMap } from '../../components/map/LeafletMap'
import { StatusPill } from '../../components/shared/StatusPill'
import { CTA } from '../../components/shared/CTA'
import { MenuIcon } from '../../components/shared/Icons'
import { useDriverStore } from '../../store/driverStore'
import { useDriverSidebar } from '../../contexts/DriverSidebarContext'
import { DriverStackParamList } from '../../navigation/DriverTabs'

type NavProp = StackNavigationProp<DriverStackParamList, 'DriverDashboard'>

export default function DriverDashboardScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavProp>()
  const { t } = useTranslation()
  const { isOnline, currentOrder } = useDriverStore()
  const { open } = useDriverSidebar()

  return (
    <View style={styles.container}>
      <LeafletMap
        style={StyleSheet.absoluteFill}
        initialRegion={{ latitude: 49.9935, longitude: 36.2304, latitudeDelta: 0.025, longitudeDelta: 0.025 }}
      />

      <View style={[styles.topBar, { top: insets.top + 12 }]}>
        <Pressable onPress={open} style={styles.iconBtn}>
          <MenuIcon size={20} color={Colors.text} />
        </Pressable>
        <StatusPill
          color={isOnline ? Colors.mint : Colors.text3}
          label={isOnline ? t('driverDashboard.onlineStatus') : t('driverDashboard.offlineStatus')}
        />
      </View>

      {currentOrder && (
        <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.cardRow}>
            <View style={{ flex: 1 }}>
              <Text style={[T.xs, { color: Colors.text3 }]}>{t('driverDashboard.activeOrder')}</Text>
              <Text style={[T.bodyB, { marginTop: 4 }]} numberOfLines={1}>
                → {t(`addresses.${currentOrder.dropoff.address}`, { defaultValue: currentOrder.dropoff.address })}
              </Text>
            </View>
            <View style={styles.earnBadge}>
              <Text style={styles.earnText}>${currentOrder.price}</Text>
            </View>
          </View>
          <CTA color="orange" size="md" onPress={() => navigation.navigate('NavigationToPickup')}>
            <Text style={{ fontFamily: Fonts.bodyBold, fontSize: 16, color: '#1A0700', fontWeight: '700' }}>
              {t('driverDashboard.navigateToPickup')}
            </Text>
          </CTA>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  topBar: {
    position: 'absolute', left: 16, right: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
  bottomCard: {
    position: 'absolute', left: 16, right: 16, bottom: 0,
    backgroundColor: Colors.surface, borderRadius: Radius.xl,
    padding: 16, gap: 12, borderWidth: 1, borderColor: Colors.line,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  earnBadge: {
    backgroundColor: Colors.orangeGlow, borderRadius: Radius.full,
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: `${Colors.orange}44`,
  },
  earnText: { fontFamily: Fonts.bodyBold, fontSize: 14, color: Colors.orange },
})
