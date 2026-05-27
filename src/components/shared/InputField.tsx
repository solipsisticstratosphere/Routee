import React from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { Colors, Radius, Fonts } from '../../theme/tokens'

interface InputFieldProps {
  icon?: React.ReactNode
  value?: string
  placeholder?: string
  suffix?: React.ReactNode
  dot?: string
  style?: ViewStyle
}

export function InputField({ icon, value, placeholder, suffix, dot, style }: InputFieldProps) {
  return (
    <View style={[styles.container, style]}>
      {dot && <View style={[styles.dot, { backgroundColor: dot }]} />}
      {icon && <View style={styles.iconWrap}>{icon}</View>}
      <Text
        numberOfLines={1}
        style={[styles.text, { color: value ? Colors.text : Colors.text2 }]}
      >
        {value || placeholder}
      </Text>
      {suffix && <View>{suffix}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: Colors.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 9,
  },
  iconWrap: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  text: {
    flex: 1,
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    fontWeight: '500',
  },
})
