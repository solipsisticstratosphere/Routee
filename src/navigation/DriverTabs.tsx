import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen'
import NavigationToPickupScreen from '../screens/driver/NavigationToPickupScreen'
import ActiveDeliveryScreen from '../screens/driver/ActiveDeliveryScreen'
import EarningsSummaryScreen from '../screens/driver/EarningsSummaryScreen'
import ProfileScreen from '../screens/shared/ProfileScreen'
import IncomingOrderScreen from '../screens/driver/IncomingOrderScreen'
import { DriverSidebarProvider } from '../contexts/DriverSidebarContext'
import { DriverSidebar } from '../components/driver/DriverSidebar'
import { useDriverStore } from '../store/driverStore'

export type DriverStackParamList = {
  DriverDashboard: undefined
  NavigationToPickup: undefined
  ActiveDelivery: undefined
}

export type DriverTabsParamList = {
  DashTab: undefined
  EarningsTab: undefined
  ProfileTab: undefined
}

const DriverStack = createStackNavigator<DriverStackParamList>()
const Tab = createBottomTabNavigator<DriverTabsParamList>()

function DriverStackNavigator() {
  return (
    <DriverStack.Navigator screenOptions={{ headerShown: false }}>
      <DriverStack.Screen name="DriverDashboard" component={DriverDashboardScreen} />
      <DriverStack.Screen name="NavigationToPickup" component={NavigationToPickupScreen} />
      <DriverStack.Screen name="ActiveDelivery" component={ActiveDeliveryScreen} />
    </DriverStack.Navigator>
  )
}

export function DriverTabsNavigator() {
  const incomingOrder = useDriverStore(state => state.incomingOrder)
  const navigation = useNavigation<any>()

  const handleOrderAccepted = () => {
    navigation.navigate('DriverTabs', {
      screen: 'DashTab',
      params: { screen: 'NavigationToPickup' },
    })
  }

  return (
    <DriverSidebarProvider>
      <View style={styles.root}>
        <Tab.Navigator
          screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
        >
          <Tab.Screen name="DashTab" component={DriverStackNavigator} />
          <Tab.Screen name="EarningsTab" component={EarningsSummaryScreen} />
          <Tab.Screen name="ProfileTab" component={ProfileScreen} />
        </Tab.Navigator>

        <DriverSidebar />

        {/* Native modal — animates independently from the JS thread */}
        <Modal
          visible={!!incomingOrder}
          animationType="slide"
          transparent={false}
          statusBarTranslucent
          onRequestClose={() => {}}
        >
          <IncomingOrderScreen onAccepted={handleOrderAccepted} />
        </Modal>
      </View>
    </DriverSidebarProvider>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
