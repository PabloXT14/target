import { StyleSheet, View } from 'react-native'

import { Header, type HeaderData } from '@/components/app/home/header'

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

export default function Index() {
  return (
    <View style={styles.container}>
      <Header data={summary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
