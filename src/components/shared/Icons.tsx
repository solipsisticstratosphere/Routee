import React from 'react'
import Svg, { Path, Circle, Rect, G } from 'react-native-svg'

interface IconProps {
  size?: number
  color?: string
}

export const ArrowIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M3 9h12M11 5l4 4-4 4" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

export const BackIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M15 9H3M7 5L3 9l4 4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

export const ChevIcon = ({ size = 14, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <Path d="M5 3l4 4-4 4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)

export const CloseIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M4 4l10 10M14 4L4 14" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
)

export const SearchIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Circle cx={8} cy={8} r={5} stroke={color} strokeWidth={1.8} />
    <Path d="M12 12l3 3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)

export const PinIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M9 16s5-4.5 5-9a5 5 0 0 0-10 0c0 4.5 5 9 5 9Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    <Circle cx={9} cy={7} r={2} stroke={color} strokeWidth={1.8} />
  </Svg>
)

export const ClockIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={9} r={7} stroke={color} strokeWidth={1.8} />
    <Path d="M9 5v4l3 2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)

export const StarIcon = ({ size = 14, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill={color}>
    <Path d="M7 1l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L1 5.3l4-.6L7 1z" />
  </Svg>
)

export const PhoneIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M15 12.5v2a1.5 1.5 0 0 1-1.6 1.5A12 12 0 0 1 2 4.6 1.5 1.5 0 0 1 3.5 3h2a1.5 1.5 0 0 1 1.5 1.3l.3 2a1.5 1.5 0 0 1-.4 1.4L5.6 9.1a11 11 0 0 0 4.3 4.3l1.4-1.3a1.5 1.5 0 0 1 1.4-.4l2 .3a1.5 1.5 0 0 1 1.3 1.5Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

export const ChatIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M16 9.5a6.5 6.5 0 0 1-9.4 5.8l-3.6 1 1-3.4A6.5 6.5 0 1 1 16 9.5Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

export const CardIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Rect x={2} y={4} width={14} height={10} rx={2} stroke={color} strokeWidth={1.6} />
    <Path d="M2 7.5h14" stroke={color} strokeWidth={1.6} />
  </Svg>
)

export const CheckIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M4 9.5l3.5 3.5L14 5.5" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

export const UserIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={6} r={3} stroke={color} strokeWidth={1.8} />
    <Path d="M3 16c0-3 2.7-5 6-5s6 2 6 5" stroke={color} strokeWidth={1.8} />
  </Svg>
)

export const HomeIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M3 8l6-5 6 5v7a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1V8Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
)

export const ListIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M5 5h10M5 9h10M5 13h10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)

export const WalletIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Rect x={2} y={4} width={14} height={11} rx={2} stroke={color} strokeWidth={1.6} />
    <Path d="M12 9.5h3" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
)

export const ZapIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
    <Path d="M10 1L3 10h4l-1 7 8-10h-5z" />
  </Svg>
)

export const QRIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Rect x={2} y={2} width={5} height={5} stroke={color} strokeWidth={1.6} />
    <Rect x={11} y={2} width={5} height={5} stroke={color} strokeWidth={1.6} />
    <Rect x={2} y={11} width={5} height={5} stroke={color} strokeWidth={1.6} />
    <Path d="M11 11h2v2M16 16v-3M11 16h2" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
)

export const ScanIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M2 6V4a2 2 0 0 1 2-2h2M16 6V4a2 2 0 0 0-2-2h-2M2 12v2a2 2 0 0 0 2 2h2M16 12v2a2 2 0 0 1-2 2h-2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)

export const CarIcon = ({ size = 22, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <Path d="M3 13l1.5-4a2 2 0 0 1 2-1.5h9a2 2 0 0 1 2 1.5L19 13v3a1 1 0 0 1-1 1h-2v-2H6v2H4a1 1 0 0 1-1-1v-3Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    <Circle cx={6.5} cy={14} r={1.2} fill={color} />
    <Circle cx={15.5} cy={14} r={1.2} fill={color} />
  </Svg>
)

export const BikeIcon = ({ size = 22, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <Circle cx={5} cy={15} r={3.5} stroke={color} strokeWidth={1.5} />
    <Circle cx={17} cy={15} r={3.5} stroke={color} strokeWidth={1.5} />
    <Path d="M5 15l4-7h5l3 7M9 8l1-2h2" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
  </Svg>
)

export const VanIcon = ({ size = 22, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <Path d="M2 16V7h11l5 4v5h-1.5M2 16h1.5M9 16h6.5" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    <Circle cx={5} cy={16.5} r={1.8} stroke={color} strokeWidth={1.5} />
    <Circle cx={16} cy={16.5} r={1.8} stroke={color} strokeWidth={1.5} />
  </Svg>
)

export const PowerIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M9 2v7M5.5 4.5a5 5 0 1 0 7 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)

export const BellIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M5 13V8a4 4 0 0 1 8 0v5M3 13h12M8 16h2" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
  </Svg>
)

export const PlusIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M9 4v10M4 9h10" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
)

export const SettingsIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={9} r={2.5} stroke={color} strokeWidth={1.6} />
    <Path d="M9 1.5v2M9 14.5v2M14 9h2M2 9h2M13 5l1.5-1.5M3.5 14.5L5 13M13 13l1.5 1.5M3.5 3.5L5 5" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
  </Svg>
)

export const LocIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={9} r={2} stroke={color} strokeWidth={1.8} />
    <Circle cx={9} cy={9} r={6} stroke={color} strokeWidth={1.8} />
    <Path d="M9 1v2M9 15v2M1 9h2M15 9h2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)

export const TrendIcon = ({ size = 18, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path d="M2 13l4-4 3 3 6-7M11 5h4v4" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
  </Svg>
)

export const SwapIcon = ({ size = 14, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <Path d="M4 3v8m0 0l-2-2m2 2l2-2M10 11V3m0 0L8 5m2-2l2 2" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
)

export const MenuIcon = ({ size = 20, color = 'currentColor' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path d="M3 5h14M3 10h14M3 15h14" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
)
