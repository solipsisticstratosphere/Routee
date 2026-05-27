import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { Colors, Radius } from '../../theme'
import { useLocation } from '../../hooks/useLocation'
import { mockDrivers } from '../../mock/mockDrivers'
import { LeafletMap, LeafletMapRef } from '../../components/map/LeafletMap'
import { InputField } from '../../components/shared/InputField'
import { SearchIcon, MenuIcon } from '../../components/shared/Icons'
import { useCustomerSidebar } from '../../contexts/CustomerSidebarContext'
import { CustomerMapStackParamList } from '../../navigation/CustomerTabs'

type Props = { navigation: StackNavigationProp<CustomerMapStackParamList, 'HomeMap'> }

export default function HomeMapScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()
  const { location } = useLocation()
  const mapRef = useRef<LeafletMapRef>(null)
  const { open } = useCustomerSidebar()

  useEffect(() => {
    if (location) {
      mapRef.current?.setUserLocation(location)
      mapRef.current?.animateToRegion({ ...location, latitudeDelta: 0.04, longitudeDelta: 0.04 })
    }
  }, [location])

  return (
    <View style={styles.container}>
      <LeafletMap
        ref={mapRef}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        initialRegion={{ latitude: 49.9935, longitude: 36.2304, latitudeDelta: 0.04, longitudeDelta: 0.04 }}
        markers={mockDrivers.filter(d => d.isAvailable).map(d => ({
          id: d.id,
          coordinate: d.coords,
          color: Colors.mint,
        }))}
      />

      <View style={[styles.topBar, { top: insets.top + 12 }]}>
        <Pressable onPress={open} style={styles.menuBtn}>
          <MenuIcon size={20} color={Colors.text} />
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate('RoutePlanning')}>
          <InputField
            icon={<SearchIcon size={18} color={Colors.text3} />}
            placeholder="Where to?"
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  topBar: {
    position: 'absolute', left: 12, right: 12,
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  menuBtn: {
    width: 48, height: 48, borderRadius: Radius.md,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.line,
  },
})
