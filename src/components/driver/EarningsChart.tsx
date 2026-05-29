import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { useTranslation } from 'react-i18next'
import { Colors, Fonts } from '../../theme/tokens'
import { Earnings } from '../../types'

const { width: SCREEN_W } = Dimensions.get('window')

interface EarningsChartProps {
  data: Earnings[]
}

export function EarningsChart({ data }: EarningsChartProps) {
  const { i18n } = useTranslation()
  const labels = data.map((d) => {
    const date = new Date(d.date)
    const days = i18n.language === 'uk'
      ? ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    return days[date.getDay()]
  })

  const chartData = {
    labels,
    datasets: [{ data: data.map((d) => d.amount) }],
  }

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={SCREEN_W - 32}
        height={180}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: Colors.surface,
          backgroundGradientFrom: Colors.surface,
          backgroundGradientTo: Colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0,229,160,${opacity})`,
          labelColor: () => Colors.text2,
          style: { borderRadius: 16 },
          barPercentage: 0.6,
          propsForBackgroundLines: { stroke: Colors.line, strokeWidth: 0.5 },
        }}
        style={styles.chart}
        showValuesOnTopOfBars={false}
        withHorizontalLabels
        fromZero
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  chart: { borderRadius: 16 },
})
