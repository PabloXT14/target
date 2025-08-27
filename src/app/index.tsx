import { useCallback, useState } from 'react'
import { Alert, StatusBar, StyleSheet, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import { Header, type HeaderData } from '@/components/app/home/header'
import { Target, type TargetData } from '@/components/app/home/target'
import { List } from '@/components/shared/list'
import { Button } from '@/components/shared/button'
import { Loading } from '@/components/shared/loading'

import { useTargetDatabase } from '@/database/use-target-database'
import { useTransactionsDatabase } from '@/database/use-transactions-database'

import { numberToCurrency } from '@/utils/number-to-currency'

export default function Index() {
  const [targets, setTargets] = useState<TargetData[]>([])
  const [summary, setSummary] = useState<HeaderData>({} as HeaderData)
  const [isFetching, setIsFetching] = useState(true)

  const targetDatabase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()

  async function fetchTargets(): Promise<TargetData[]> {
    try {
      const response = await targetDatabase.listByClosestTarget()

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

  async function fetchSummary(): Promise<HeaderData> {
    try {
      const response = await transactionsDatabase.summary()

      const input = response?.input ?? 0
      const output = response?.output ?? 0

      return {
        total: numberToCurrency(input + output),
        input: {
          label: 'Entradas',
          value: numberToCurrency(input),
        },
        output: {
          label: 'Saídas',
          value: numberToCurrency(output),
        },
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)

      return {
        total: numberToCurrency(0),
        input: {
          label: 'Entradas',
          value: numberToCurrency(0),
        },
        output: {
          label: 'Saídas',
          value: numberToCurrency(0),
        },
      }
    }
  }

  async function fetchData() {
    setIsFetching(true)

    const targetDataPromise = fetchTargets()
    const summaryPromise = fetchSummary()

    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryPromise,
    ])

    setTargets(targetData)
    setSummary(summaryData)

    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

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
