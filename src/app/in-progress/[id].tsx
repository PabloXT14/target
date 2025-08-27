import { useCallback, useState } from 'react'
import { Alert, StyleSheet, View, StatusBar } from 'react-native'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import dayjs from 'dayjs'

import { PageHeader } from '@/components/shared/page-header'
import { Progress } from '@/components/app/in-progress/progress'
import { List } from '@/components/shared/list'
import {
  Transaction,
  type TransactionData,
} from '@/components/app/in-progress/transaction'
import { Button } from '@/components/shared/button'
import { Loading } from '@/components/shared/loading'

import { useTargetDatabase } from '@/database/use-target-database'

import { numberToCurrency } from '@/utils/number-to-currency'
import { useTransactionsDatabase } from '@/database/use-transactions-database'
import { TransactionTypes } from '@/types/transaction-types'

type RouteParams = {
  id: string
}

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: '',
    current: 'R% 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  })
  const [transactions, setTransactions] = useState<TransactionData[]>([])

  const { id } = useLocalSearchParams<RouteParams>()

  const targetDatabase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()

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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.findByTargetId(Number(id))

      const parsedTransactions: TransactionData[] = response.map((item) => ({
        id: String(item.id),
        value: numberToCurrency(item.amount),
        date: dayjs(item.created_at).format('DD/MM/YYYY [às] HH:mm'),
        description: item.observation,
        type:
          item.amount > 0 ? TransactionTypes.INPUT : TransactionTypes.OUTPUT,
      }))

      setTransactions(parsedTransactions)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as transações.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)
    }
  }

  async function fetchData() {
    setIsFetching(true)

    const fetchDetailsPromise = fetchDetails()
    const fetchTransactionsPromise = fetchTransactions()

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise])

    setIsFetching(false)
  }

  function handleRemoveTransaction(transactionId: string) {
    Alert.alert(
      'Remover transação',
      'Tem certeza que deseja remover esta transação?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => transactionRemove(transactionId),
        },
      ]
    )
  }

  async function transactionRemove(transactionId: string) {
    try {
      await transactionsDatabase.remove(Number(transactionId))
      await fetchData()

      Alert.alert('Sucesso', 'Transação removida com sucesso.')
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a transação.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)
    }
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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

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
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleRemoveTransaction(item.id)}
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
