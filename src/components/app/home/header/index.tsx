import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './styles'

import { colors } from '@/theme'

import { Separator } from '@/components/shared/separator'
import { Summary, type SummaryData } from '@/components/shared/summary'

export type HeaderData = {
  total: string
  input: SummaryData
  outputs: SummaryData
}

type HeaderProps = {
  data: HeaderData
}

export function Header({ data }: HeaderProps) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summaries}>
        <Summary
          data={data.input}
          icon={{
            name: 'arrow-upward',
            color: colors.green[500],
          }}
        />
        <Summary
          data={data.outputs}
          icon={{
            name: 'arrow-downward',
            color: colors.red[400],
          }}
          isLeft
        />
      </View>
    </LinearGradient>
  )
}
