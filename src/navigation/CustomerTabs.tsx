import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CustomerSidebarProvider } from '../contexts/CustomerSidebarContext'
import { CustomerSidebar } from '../components/customer/CustomerSidebar'

import HomeMapScreen from '../screens/customer/HomeMapScreen'
import RoutePlanningScreen from '../screens/customer/RoutePlanningScreen'
import OrderConfirmScreen from '../screens/customer/OrderConfirmScreen'
import LiveTrackingScreen from '../screens/customer/LiveTrackingScreen'
import DeliveryQRScreen from '../screens/customer/DeliveryQRScreen'
import ProfileScreen from '../screens/shared/ProfileScreen'
import OrdersListScreen from '../screens/customer/OrdersListScreen'

export type CustomerMapStackParamList = {
  HomeMap: undefined
  RoutePlanning: undefined
  OrderConfirm: undefined
  LiveTracking: undefined
  DeliveryQR: undefined
}

export type CustomerTabsParamList = {
  MapTab: undefined
  OrdersTab: undefined
  ProfileTab: undefined
}

const MapStack = createStackNavigator<CustomerMapStackParamList>()
const Tab = createBottomTabNavigator<CustomerTabsParamList>()

function MapStackNavigator() {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="HomeMap" component={HomeMapScreen} />
      <MapStack.Screen name="RoutePlanning" component={RoutePlanningScreen} />
      <MapStack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
      <MapStack.Screen name="LiveTracking" component={LiveTrackingScreen} />
      <MapStack.Screen name="DeliveryQR" component={DeliveryQRScreen} />
    </MapStack.Navigator>
  )
}

export function CustomerTabsNavigator() {
  return (
    <CustomerSidebarProvider>
      <View style={styles.root}>
        <Tab.Navigator
          screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
        >
          <Tab.Screen name="MapTab" component={MapStackNavigator} />
          <Tab.Screen name="OrdersTab" component={OrdersListScreen} />
          <Tab.Screen name="ProfileTab" component={ProfileScreen} />
        </Tab.Navigator>

        <CustomerSidebar />
      </View>
    </CustomerSidebarProvider>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
