import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated'
import { Colors } from '../../theme/tokens'

const TRACK_W = 80
const TRACK_H = 40
const THUMB_SIZE = 30
const PADDING = 5
const OFF_X = PADDING
const ON_X = TRACK_W - THUMB_SIZE - PADDING

interface OnlineToggleProps {
  value: boolean
  onToggle: () => void
}

export function OnlineToggle({ value, onToggle }: OnlineToggleProps) {
  const thumbX = useSharedValue(value ? ON_X : OFF_X)

  useEffect(() => {
    thumbX.value = withTiming(value ? ON_X : OFF_X, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    })
  }, [value])

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value }],
  }))

  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.track,
        { backgroundColor: value ? Colors.mint : Colors.elevated },
      ]}
    >
      <Animated.View style={[styles.thumb, thumbStyle]} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    position: 'absolute',
  },
})
