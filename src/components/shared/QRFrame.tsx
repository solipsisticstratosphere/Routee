import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { Colors } from '../../theme/tokens'

const { width: SCREEN_W } = Dimensions.get('window')
const FRAME_SIZE = SCREEN_W * 0.68
const CORNER = 28

export function QRFrame() {
  const translateY = useSharedValue(0)

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(FRAME_SIZE, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    )
  }, [])

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const cornerColor = Colors.mint

  return (
    <View style={[styles.frame, { width: FRAME_SIZE, height: FRAME_SIZE }]}>
      {/* corners */}
      <Svg width={FRAME_SIZE} height={FRAME_SIZE} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* top-left */}
        <Path d={`M${CORNER} 4 L4 4 L4 ${CORNER}`} stroke={cornerColor} strokeWidth={3} fill="none" strokeLinecap="round" />
        {/* top-right */}
        <Path d={`M${FRAME_SIZE - CORNER} 4 L${FRAME_SIZE - 4} 4 L${FRAME_SIZE - 4} ${CORNER}`} stroke={cornerColor} strokeWidth={3} fill="none" strokeLinecap="round" />
        {/* bottom-left */}
        <Path d={`M${CORNER} ${FRAME_SIZE - 4} L4 ${FRAME_SIZE - 4} L4 ${FRAME_SIZE - CORNER}`} stroke={cornerColor} strokeWidth={3} fill="none" strokeLinecap="round" />
        {/* bottom-right */}
        <Path d={`M${FRAME_SIZE - CORNER} ${FRAME_SIZE - 4} L${FRAME_SIZE - 4} ${FRAME_SIZE - 4} L${FRAME_SIZE - 4} ${FRAME_SIZE - CORNER}`} stroke={cornerColor} strokeWidth={3} fill="none" strokeLinecap="round" />
      </Svg>
      {/* sweep line */}
      <Animated.View style={[styles.sweep, sweepStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    position: 'relative',
  },
  sweep: {
    position: 'absolute',
    left: 4,
    right: 4,
    height: 2,
    backgroundColor: Colors.mint,
    opacity: 0.7,
    borderRadius: 1,
  },
})
