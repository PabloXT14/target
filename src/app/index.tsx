import { StyleSheet, View } from 'react-native'

import { Header, type HeaderData } from '@/components/app/home/header'
import { Target } from '@/components/app/home/target'

const summary: HeaderData = {
  total: 'R$ 2.680,00',
  input: {
    label: 'Entradas',
    value: 'R$ 6.184,90',
  },
  outputs: {
    label: 'Saídas',
    value: '-R$ 883,65',
  },
}

const targets = [
  {
    id: '1',
    name: 'Apple Watch',
    percentage: '50%',
    current: '580,00',
    target: '1.790,00',
  },
]

export default function Index() {
  return (
    <View style={styles.container}>
      <Header data={summary} />

      {/* Targets */}
      <View style={{ flex: 1, padding: 24 }}>
        <Target
          data={targets[0]}
          onPress={() => {
            /* TODO */
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
