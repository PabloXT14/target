import { StyleSheet, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/shared/page-header'
import { Progress } from '@/components/app/in-progress/progress'
import { List } from '@/components/shared/list'
import {
  Transaction,
  type TransactionData,
} from '@/components/app/in-progress/transaction'

import { TransactionTypes } from '@/types/transaction-types'
import { Button } from '@/components/shared/button'

type RouteParams = {
  id: string
}

const DETAILS = {
  current: 'R$ 580,00',
  target: 'R$ 1.790,00',
  percentage: 32,
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
  const { id } = useLocalSearchParams<RouteParams>()

  return (
    <View style={styles.container}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          onPress: () => router.navigate(`/target/${id}`),
          icon: 'edit',
        }}
      />

      <Progress data={DETAILS} />

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
