import { useCallback, useState } from 'react'
import { Alert, StatusBar, StyleSheet, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import { Header, type HeaderData } from '@/components/app/home/header'
import { Target, type TargetData } from '@/components/app/home/target'
import { List } from '@/components/shared/list'
import { Button } from '@/components/shared/button'
import { Loading } from '@/components/shared/loading'

import { useTargetDatabase } from '@/database/use-target-database'

import { numberToCurrency } from '@/utils/number-to-currency'

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
  const [targets, setTargets] = useState<TargetData[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const targetDatabase = useTargetDatabase()

  async function fetchTargets(): Promise<TargetData[]> {
    try {
      const response = await targetDatabase.listBySavedValue()

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        target: numberToCurrency(item.amount),
        current: numberToCurrency(item.current),
        percentage: `${item.percentage.toFixed(0)} %`,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }))
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)
      return []
    }
  }

  async function fetchData() {
    setIsFetching(true)

    const targetDataPromise = fetchTargets()

    const [targetData] = await Promise.all([targetDataPromise])

    setTargets(targetData)

    setIsFetching(false)
  }

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: needed
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Header data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id ?? ''}
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
