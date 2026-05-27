import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen'
import NavigationToPickupScreen from '../screens/driver/NavigationToPickupScreen'
import ActiveDeliveryScreen from '../screens/driver/ActiveDeliveryScreen'
import EarningsSummaryScreen from '../screens/driver/EarningsSummaryScreen'
import ProfileScreen from '../screens/shared/ProfileScreen'
import { DriverSidebarProvider } from '../contexts/DriverSidebarContext'
import { DriverSidebar } from '../components/driver/DriverSidebar'

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

        {/* Sidebar renders on top of all tabs */}
        <DriverSidebar />
      </View>
    </DriverSidebarProvider>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
