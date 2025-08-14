import { View } from 'react-native'

import { styles } from './styles'

import { colors } from '@/theme'

import { Option } from './option'

import { TransactionTypes } from '@/types/transaction-types'

type TransactionTypeProps = {
  selected: TransactionTypes
  onChange: (type: TransactionTypes) => void
}

export function TransactionType({ selected, onChange }: TransactionTypeProps) {
  return (
    <View style={styles.container}>
      <Option
        title="Guardar"
        icon="arrow-upward"
        isSelected={selected === TransactionTypes.INPUT}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.INPUT)}
      />

      <Option
        title="Resgatar"
        icon="arrow-downward"
        isSelected={selected === TransactionTypes.OUTPUT}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.OUTPUT)}
      />
    </View>
  )
}
