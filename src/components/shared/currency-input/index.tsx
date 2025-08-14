import { Text, View } from 'react-native'
import PrimitiveCurrencyInput, {
  type CurrencyInputProps as PrimitiveCurrencyInputProps,
} from 'react-native-currency-input'

import { styles } from './styles'

import { colors } from '@/theme'

type CurrencyInputProps = PrimitiveCurrencyInputProps & {
  label: string
}

export function CurrencyInput({ label, ...props }: CurrencyInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <PrimitiveCurrencyInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        cursorColor={colors.gray[400]}
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...props}
      />
    </View>
  )
}
