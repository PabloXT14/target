import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/shared/button'
import { CurrencyInput } from '@/components/shared/currency-input'
import { Input } from '@/components/shared/input'
import { TransactionType } from '@/components/app/transaction/transaction-type'

import { TransactionTypes } from '@/types/transaction-types'

type RouteParams = {
  id: string
}

export default function Transaction() {
  const { id } = useLocalSearchParams<RouteParams>()

  const [currency, setCurrency] = useState<number | null>(null)
  const [transactionType, setTransactionType] = useState<TransactionTypes>(
    TransactionTypes.INPUT
  )

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
          value={currency}
          onChangeValue={setCurrency}
        />

        <Input label="Motivo (opcional)" placeholder="Ex: Compra de um livro" />

        <Button title="Salvar" />
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
