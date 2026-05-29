import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthStore } from '../store/authStore'
import { CustomerTabsNavigator } from './CustomerTabs'
import { DriverTabsNavigator } from './DriverTabs'
import SplashScreen from '../screens/shared/SplashScreen'
import AuthScreen from '../screens/shared/AuthScreen'
import PaymentScreen from '../screens/customer/PaymentScreen'
import QRScanScreen from '../screens/driver/QRScanScreen'

export type RootStackParamList = {
  Splash: undefined
  Auth: { role: 'customer' | 'driver' }
  CustomerMain: undefined
  DriverMain: undefined
}

export type CustomerMainParamList = {
  CustomerTabs: undefined
  Payment: undefined
}

export type DriverMainParamList = {
  DriverTabs: undefined
  QRScan: undefined
}

const Root = createStackNavigator<RootStackParamList>()
const CustomerStack = createStackNavigator<CustomerMainParamList>()
const DriverStack = createStackNavigator<DriverMainParamList>()

function CustomerMain() {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomerStack.Screen name="CustomerTabs" component={CustomerTabsNavigator} />
      <CustomerStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </CustomerStack.Navigator>
  )
}

function DriverMain() {
  return (
    <DriverStack.Navigator screenOptions={{ headerShown: false }}>
      <DriverStack.Screen name="DriverTabs" component={DriverTabsNavigator} />
<DriverStack.Screen
        name="QRScan"
        component={QRScanScreen}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </DriverStack.Navigator>
  )
}

export function RootNavigator() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {!isAuthenticated ? (
          <>
            <Root.Screen name="Splash" component={SplashScreen} />
            <Root.Screen name="Auth" component={AuthScreen} />
          </>
        ) : user?.role === 'driver' ? (
          <Root.Screen name="DriverMain" component={DriverMain} />
        ) : (
          <Root.Screen name="CustomerMain" component={CustomerMain} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  )
}
