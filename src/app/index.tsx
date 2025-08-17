import { useCallback } from 'react'
import { Alert, StatusBar, StyleSheet, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import { Header, type HeaderData } from '@/components/app/home/header'
import { Target } from '@/components/app/home/target'
import { List } from '@/components/shared/list'
import { Button } from '@/components/shared/button'

import { useTargetDatabase } from '@/database/use-target-database'

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
  const targetDatabase = useTargetDatabase()

  async function fetchTargets() {
    try {
      const response = await targetDatabase.listBySavedValue()

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(response)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)
    }
  }

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: needed
    useCallback(() => {
      fetchTargets()
    }, [])
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

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
