import { StyleSheet, View } from 'react-native'
import { router } from 'expo-router'

import { Header, type HeaderData } from '@/components/app/home/header'
import { Target } from '@/components/app/home/target'
import { List } from '@/components/shared/list'
import { Button } from '@/components/shared/button'

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
    current: 'R$ 895,00',
    target: 'R$ 1.790,00',
  },
  {
    id: '2',
    name: 'Comprar uma cadeira ergonômica',
    percentage: '75%',
    current: 'R$ 900,00',
    target: 'R$ 1.200,00',
  },
  {
    id: '3',
    name: 'Fazer uma viagem para o Rio de Janeiro',
    percentage: '75%',
    current: 'R$ 2.250,00',
    target: 'R$ 3.000,00',
  },
]

export default function Index() {
  return (
    <View style={styles.container}>
      <Header data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
