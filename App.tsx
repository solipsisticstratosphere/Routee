import React, { Component, ErrorInfo } from 'react'
import { View, Text, ScrollView } from 'react-native'

class ErrorBoundary extends Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('App crash:', error, info) }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error
      return (
        <ScrollView style={{ flex: 1, backgroundColor: '#0A0E1A', padding: 24 }} contentContainerStyle={{ paddingTop: 60 }}>
          <Text style={{ color: '#FF4757', fontSize: 18, fontWeight: '700', marginBottom: 12 }}>App Error</Text>
          <Text style={{ color: '#fff', fontSize: 14, marginBottom: 8 }}>{err.message}</Text>
          <Text style={{ color: '#8B92A5', fontSize: 11, fontFamily: 'monospace' }}>{err.stack}</Text>
        </ScrollView>
      )
    }
    return this.props.children
  }
}
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import { NavigationBar } from 'expo-navigation-bar'
import { useFonts } from 'expo-font'
import {
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk'
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans'
import {
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono'
import { RootNavigator } from './src/navigation/RootNavigator'
import { Colors } from './src/theme/tokens'

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setHidden(true)
    }
  }, [])

  // Kick off font loading in background; don't block rendering
  useFonts({
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  })

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <StatusBar style="light" />
            <RootNavigator />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  )
}
