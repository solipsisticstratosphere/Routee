import React, { forwardRef, useMemo } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../theme/tokens'

interface MapBottomSheetProps {
  children: React.ReactNode
}

// tab bar: height 64 + bottom gap 16 = 80
const TAB_CLEARANCE = 80

export const MapBottomSheet = forwardRef<BottomSheet, MapBottomSheetProps>(({ children }, ref) => {
  const insets = useSafeAreaInsets()
  const tabBottom = insets.bottom + TAB_CLEARANCE
  const snapPoints = useMemo(() => [60, 320], [])

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      bottomInset={tabBottom}
      detached
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
      style={styles.sheet}
      enablePanDownToClose={false}
      animateOnMount={false}
      animationConfigs={{ damping: 80, stiffness: 500, overshootClamping: true }}
    >
      <BottomSheetView style={styles.content}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  )
})

const styles = StyleSheet.create({
  sheet: { marginHorizontal: 12 },
  background: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  handle: { backgroundColor: Colors.line2, width: 38, height: 4 },
  content: { flex: 1, paddingHorizontal: 16 },
})
