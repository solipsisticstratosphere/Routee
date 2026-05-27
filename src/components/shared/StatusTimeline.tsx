import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Radius, Spacing } from '../../theme/tokens'
import { CheckIcon } from './Icons'

interface Step {
  label: string
  sublabel?: string
}

interface StatusTimelineProps {
  steps: Step[]
  activeStep: number
}

export function StatusTimeline({ steps, activeStep }: StatusTimelineProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, i) => {
        const done = i < activeStep
        const active = i === activeStep

        return (
          <View key={i} style={styles.stepRow}>
            <View style={styles.iconCol}>
              <View style={[
                styles.circle,
                done ? styles.circleDone : active ? styles.circleActive : styles.circleIdle,
              ]}>
                {done ? (
                  <CheckIcon size={12} color={Colors.bg} />
                ) : (
                  <View style={[
                    styles.innerDot,
                    { backgroundColor: active ? Colors.mint : Colors.text3 },
                  ]} />
                )}
              </View>
              {i < steps.length - 1 && (
                <View style={[styles.line, { backgroundColor: done ? Colors.mint : Colors.line2 }]} />
              )}
            </View>
            <View style={styles.textCol}>
              <Text style={[styles.label, { color: done || active ? Colors.text : Colors.text3 }]}>
                {step.label}
              </Text>
              {step.sublabel && (
                <Text style={styles.sublabel}>{step.sublabel}</Text>
              )}
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 0 },
  stepRow: { flexDirection: 'row', gap: 12, minHeight: 52 },
  iconCol: { alignItems: 'center', width: 28 },
  circle: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  circleDone: { backgroundColor: Colors.mint },
  circleActive: { backgroundColor: Colors.mintGlow, borderWidth: 1.5, borderColor: Colors.mint },
  circleIdle: { backgroundColor: Colors.elevated, borderWidth: 1, borderColor: Colors.line2 },
  innerDot: { width: 8, height: 8, borderRadius: 4 },
  line: { width: 2, flex: 1, marginVertical: 2 },
  textCol: { flex: 1, paddingTop: 4, paddingBottom: 16 },
  label: { fontFamily: Fonts.bodyBold, fontSize: 14, fontWeight: '600' },
  sublabel: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text2, marginTop: 2 },
})
