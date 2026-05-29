import React from 'react'
import {
  View, Text, StyleSheet, FlatList, Switch, Pressable, Modal, TextInput, Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts, Radius, Spacing, T } from '../../theme'
import { Avatar } from '../../components/shared/Avatar'
import { StarIcon, BellIcon, ChevIcon, UserIcon, MenuIcon, CheckIcon } from '../../components/shared/Icons'
import { useAuthStore } from '../../store/authStore'
import { mockOrders } from '../../mock/mockOrders'
import { Order } from '../../types'
import { useDriverStore } from '../../store/driverStore'
import { CTA } from '../../components/shared/CTA'

import { useDriverSidebar } from '../../contexts/DriverSidebarContext'
import { useCustomerSidebar } from '../../contexts/CustomerSidebarContext'

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const { t, i18n } = useTranslation()
  const { user } = useAuthStore()
  const [notifs, setNotifs] = React.useState(true)
  const [langModalVisible, setLangModalVisible] = React.useState(false)
  const { open: openDriverSidebar } = useDriverSidebar()
  const { open: openCustomerSidebar } = useCustomerSidebar()
  const isDriver = user?.role === 'driver'
  const openSidebar = isDriver ? openDriverSidebar : openCustomerSidebar
  const bottomPad = insets.bottom + 24

  const { carModel: storeCarModel, plate: storePlate, updateVehicle } = useDriverStore()
  const [vehicleModel, setVehicleModel] = React.useState(storeCarModel)
  const [vehiclePlate, setVehiclePlate] = React.useState(storePlate)

  React.useEffect(() => {
    setVehicleModel(storeCarModel)
    setVehiclePlate(storePlate)
  }, [storeCarModel, storePlate])

  const handleSaveVehicle = () => {
    if (!vehicleModel.trim() || !vehiclePlate.trim()) {
      Alert.alert(t('shared.error'), t('profile.emptyFieldsError'))
      return
    }
    updateVehicle(vehicleModel.trim(), vehiclePlate.trim())
    Alert.alert(t('profile.title'), t('profile.vehicleSaved'))
  }

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderRow}>
      <View style={styles.orderIcon}>
        <Text style={{ fontSize: 16 }}>
          {item.vehicleType === 'bike' ? '🚲' : item.vehicleType === 'van' ? '🚐' : '🚗'}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.orderAddr} numberOfLines={1}>
          {t(`addresses.${item.dropoff.address}`, { defaultValue: item.dropoff.address })}
        </Text>
        <Text style={styles.orderDate}>
          {new Date(item.createdAt).toLocaleDateString(i18n.language === 'uk' ? 'uk-UA' : 'en-US')}
        </Text>
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
              <Text style={styles.headerTitle}>{t('profile.title')}</Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* profile card */}
            <View style={styles.card}>
              <Avatar name={user?.name ?? 'User'} size={72} />
              <View style={styles.userInfo}>
                <Text style={T.h2}>{user?.name ?? 'User'}</Text>
                <Text style={[T.sm, { color: Colors.text2 }]}>
                  {user?.phone || t('profile.phonePlaceholder')}
                </Text>
                <View style={styles.ratingRow}>
                  <StarIcon size={14} color={Colors.amber} />
                  <Text style={styles.rating}>{user?.rating.toFixed(1)}</Text>
                </View>
              </View>
            </View>

            {/* Vehicle Details */}
            {isDriver && (
              <View style={{ marginBottom: Spacing.s4 }}>
                <Text style={[T.xs, styles.sectionTitle]}>{t('profile.carDetails')}</Text>
                <View style={styles.vehicleCard}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>{t('profile.carModel')}</Text>
                    <TextInput
                      style={styles.textInput}
                      value={vehicleModel}
                      onChangeText={setVehicleModel}
                      placeholder={t('profile.carModelPlaceholder')}
                      placeholderTextColor={Colors.text3}
                    />
                  </View>
                  <View style={styles.inputDivider} />
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>{t('profile.plate')}</Text>
                    <TextInput
                      style={styles.textInput}
                      value={vehiclePlate}
                      onChangeText={setVehiclePlate}
                      placeholder={t('profile.platePlaceholder')}
                      placeholderTextColor={Colors.text3}
                      autoCapitalize="characters"
                    />
                  </View>
                  <View style={styles.btnContainer}>
                    <CTA
                      color="orange"
                      size="md"
                      onPress={handleSaveVehicle}
                    >
                      <Text style={styles.btnText}>{t('profile.saveVehicle')}</Text>
                    </CTA>
                  </View>
                </View>
              </View>
            )}

            {/* settings */}
            <Text style={[T.xs, styles.sectionTitle]}>{t('profile.settings')}</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingRow}>
                <BellIcon size={18} color={Colors.text2} />
                <Text style={styles.settingLabel}>{t('profile.notifications')}</Text>
                <Switch
                  value={notifs}
                  onValueChange={setNotifs}
                  trackColor={{ false: Colors.elevated, true: Colors.mint }}
                  thumbColor="#fff"
                />
              </View>
              <View style={styles.divider} />
              <Pressable style={styles.settingRow} onPress={() => setLangModalVisible(true)}>
                <UserIcon size={18} color={Colors.text2} />
                <Text style={styles.settingLabel}>{t('profile.language')}</Text>
                <View style={styles.langRow}>
                  <Text style={styles.langText}>{t('profile.languageValue')}</Text>
                  <ChevIcon size={14} color={Colors.text3} />
                </View>
              </Pressable>
            </View>

            <Text style={[T.xs, styles.sectionTitle]}>{t('profile.recentTrips')}</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: Spacing.s6 }} />}
      />

      <Modal
        visible={langModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLangModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setLangModalVisible(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{t('profile.selectLanguage')}</Text>

            <Pressable
              style={[styles.modalOption, i18n.language === 'en' && styles.modalOptionSelected]}
              onPress={() => {
                i18n.changeLanguage('en')
                setLangModalVisible(false)
              }}
            >
              <Text style={styles.modalOptionText}>English</Text>
              {i18n.language === 'en' && <CheckIcon size={18} color={Colors.mint} />}
            </Pressable>

            <View style={styles.modalDivider} />

            <Pressable
              style={[styles.modalOption, i18n.language === 'uk' && styles.modalOptionSelected]}
              onPress={() => {
                i18n.changeLanguage('uk')
                setLangModalVisible(false)
              }}
            >
              <Text style={styles.modalOptionText}>Українська</Text>
              {i18n.language === 'uk' && <CheckIcon size={18} color={Colors.mint} />}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
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
  vehicleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 11,
    color: Colors.text2,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    height: 48,
    backgroundColor: Colors.elevated,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.line,
    paddingHorizontal: 12,
    color: Colors.text,
    fontFamily: Fonts.body,
    fontSize: 14,
  },
  inputDivider: {
    height: 1,
    backgroundColor: Colors.line,
    marginVertical: 4,
  },
  btnContainer: {
    marginTop: 8,
  },
  btnText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
    color: '#1A0700',
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  modalHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.line2,
    alignSelf: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontFamily: Fonts.display,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: Radius.md,
  },
  modalOptionSelected: {
    backgroundColor: Colors.elevated,
  },
  modalOptionText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    color: Colors.text,
  },
  modalDivider: {
    height: 1,
    backgroundColor: Colors.line,
  },
})
