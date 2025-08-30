import { useCallback, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/shared/button'
import { CurrencyInput } from '@/components/shared/currency-input'
import { Input } from '@/components/shared/input'
import { Loading } from '@/components/shared/loading'
import { TransactionType } from '@/components/app/transaction/transaction-type'

import { TransactionTypes } from '@/types/transaction-types'

import { useTransactionsDatabase } from '@/database/use-transactions-database'

type RouteParams = {
  id: string
}

export default function EditTransaction() {
  const [transactionType, setTransactionType] = useState<TransactionTypes>(
    TransactionTypes.INPUT
  )
  const [amount, setAmount] = useState<number | null>(0)
  const [observation, setObservation] = useState('')

  const [isFetching, setIsFetching] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { id: transactionId } = useLocalSearchParams<RouteParams>()
  const transactionsDatabase = useTransactionsDatabase()

  async function fetchTransaction() {
    try {
      setIsFetching(true)

      const transaction = await transactionsDatabase.findById(
        Number(transactionId)
      )

      if (transaction) {
        setTransactionType(
          transaction.amount < 0
            ? TransactionTypes.OUTPUT
            : TransactionTypes.INPUT
        )
        setAmount(Math.abs(transaction.amount))
        setObservation(transaction.observation || '')
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar a transação.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)

      router.back()
    } finally {
      setIsFetching(false)
    }
  }

  async function handleEditTransaction() {
    try {
      if (!amount || amount <= 0) {
        return Alert.alert(
          'Atenção',
          'Preencha o valor. A transação deve ser maior que zero.'
        )
      }

      setIsEditing(true)

      await transactionsDatabase.update({
        id: Number(transactionId),
        amount: transactionType === TransactionTypes.INPUT ? amount : -amount,
        observation,
      })

      Alert.alert('Sucesso', 'Transação editada com sucesso.', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível editar a transação.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)

      setIsEditing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTransaction()
    }, [transactionId])
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Editar transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />

      {/* FORM */}
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType
          selected={transactionType}
          onChange={setTransactionType}
        />

        <CurrencyInput
          label="Valor (R$)"
          placeholder="0,00"
          value={amount}
          onChangeValue={setAmount}
        />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Compra de um livro"
          value={observation}
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          onPress={handleEditTransaction}
          isLoading={isEditing}
          disabled={isEditing}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
})
