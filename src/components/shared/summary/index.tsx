import { View, Text, type ColorValue } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'

export type SummaryData = {
  label: string
  value: string
}

type SummaryProps = {
  data: SummaryData
  icon: {
    name: keyof typeof MaterialIcons.glyphMap
    color: ColorValue
  }
  isRight?: boolean
}

export function Summary({ data, icon, isRight = false }: SummaryProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isRight && { justifyContent: 'flex-end' }]}>
        <MaterialIcons color={icon.color} name={icon.name} size={16} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  )
}
