import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/shared/button'
import { CurrencyInput } from '@/components/shared/currency-input'
import { Input } from '@/components/shared/input'
import { TransactionType } from '@/components/app/transaction/transaction-type'

import { TransactionTypes } from '@/types/transaction-types'

import { useTransactionsDatabase } from '@/database/use-transactions-database'

type RouteParams = {
  id: string
}

export default function Transaction() {
  const [transactionType, setTransactionType] = useState<TransactionTypes>(
    TransactionTypes.INPUT
  )
  const [amount, setAmount] = useState<number | null>(0)
  const [observation, setObservation] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const { id } = useLocalSearchParams<RouteParams>()
  const transactionsDatabase = useTransactionsDatabase()

  async function handleCreateTransaction() {
    try {
      if (!amount || amount <= 0) {
        return Alert.alert(
          'Atenção',
          'Preencha o valor. A transação deve ser maior que zero.'
        )
      }

      setIsCreating(true)

      await transactionsDatabase.create({
        target_id: Number(id),
        amount: transactionType === TransactionTypes.INPUT ? amount : -amount,
        observation,
      })

      Alert.alert('Sucesso', 'Transação salva com sucesso.', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a transação.')

      // biome-ignore lint/suspicious/noConsole: dev
      console.log(error)

      setIsCreating(false)
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Nova transação"
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
          onPress={handleCreateTransaction}
          isLoading={isCreating}
          disabled={isCreating}
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
