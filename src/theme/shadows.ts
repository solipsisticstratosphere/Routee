import { Platform, ViewStyle } from 'react-native'
import { Colors } from './tokens'

function shadow(
  color: string,
  offsetY: number,
  opacity: number,
  radius: number,
  elevation: number,
): ViewStyle {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: {},
  }) as ViewStyle
}

export const Shadows = {
  card: shadow('#000', 8, 0.3, 12, 4),
  pop: shadow('#000', 16, 0.55, 24, 12),
  glow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.mint,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 14,
      },
      android: { elevation: 8 },
      default: {},
    }),
  } as ViewStyle,
}
