import { useCallback, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/shared/page-header'
import { Progress } from '@/components/app/in-progress/progress'
import { List } from '@/components/shared/list'
import {
  Transaction,
  type TransactionData,
} from '@/components/app/in-progress/transaction'
import { Button } from '@/components/shared/button'
import { Loading } from '@/components/shared/loading'

import { TransactionTypes } from '@/types/transaction-types'

import { useTargetDatabase } from '@/database/use-target-database'

import { numberToCurrency } from '@/utils/number-to-currency'

type RouteParams = {
  id: string
}

const TRANSACTIONS: TransactionData[] = [
  {
    id: '1',
    value: 'R$ 20,00',
    date: '12/04/2025',
    description: 'Restaurante',
    type: TransactionTypes.OUTPUT,
  },
  {
    id: '2',
    value: 'R$ 300,00',
    date: '12/04/2025',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionTypes.INPUT,
  },
  {
    id: '3',
    value: 'R$ 300,00',
    date: '13/04/2025',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionTypes.INPUT,
  },
]

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: '',
    current: 'R% 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  })

  const { id } = useLocalSearchParams<RouteParams>()

  const targetDatabase = useTargetDatabase()

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(id))

      if (!response) {
        Alert.alert('Erro', 'Meta não encontrada.')
        return
      }

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      })
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)
    }
  }

  async function fetchData() {
    setIsFetching(true)

    const fetchDetailsPromise = fetchDetails()

    await Promise.all([fetchDetailsPromise])

    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [id])
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={details.name}
        rightButton={{
          onPress: () => router.navigate(`/target?id=${id}`),
          icon: 'edit',
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={TRANSACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => {
              /* TODO */
            }}
          />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${id}`)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 32,
  },
})
