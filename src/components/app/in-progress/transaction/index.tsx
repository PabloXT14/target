import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'

import { colors } from '@/theme'

import { TransactionTypes } from '@/types/transaction-types'

export type TransactionData = {
  id: string
  value: string
  date: string
  description?: string
  type: TransactionTypes
}

type TransactionProps = {
  data: TransactionData
  onRemove: () => void
  onEdit: () => void
}

export function Transaction({ data, onRemove, onEdit }: TransactionProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={
          data.type === TransactionTypes.INPUT
            ? 'arrow-upward'
            : 'arrow-downward'
        }
        size={24}
        color={
          data.type === TransactionTypes.INPUT
            ? colors.blue[500]
            : colors.red[400]
        }
      />

      <TouchableOpacity style={styles.info} onPress={onEdit}>
        <Text style={styles.value}>{data.value}</Text>

        <Text style={styles.description} numberOfLines={1}>
          {data.date} • {data.description}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  )
}
