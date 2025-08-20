import { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/shared/page-header'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/shared/button'
import { CurrencyInput } from '@/components/shared/currency-input'

import { useTargetDatabase } from '@/database/use-target-database'

type RouteParams = {
  id?: string
}

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false)

  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)

  const { id } = useLocalSearchParams<RouteParams>()
  const targetDatabase = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        'Atenção',
        'Preencha nome e valor precisa ser maior que zero.'
      )
    }

    setIsProcessing(true)

    if (id) {
      // Update existing target
    } else {
      createTarget()
    }
  }

  async function createTarget() {
    try {
      await targetDatabase.create({
        name,
        amount,
      })

      Alert.alert('Nova meta', 'Meta criada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta.')

      // biome-ignore lint/suspicious/noConsole: dev-only
      console.log(error)

      setIsProcessing(false)
    }
  }

  async function fetchDetails(targetId: number) {
    try {
      const response = await targetDatabase.show(targetId)

      if (!response) {
        return
      }

      setName(response.name)
      setAmount(response.amount)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta.')

      // biome-ignore lint/suspicious/noConsole: dev-only
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetails(Number(id))
    }
  }, [id])

  return (
    <View style={styles.container}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />

      {/* FORM */}
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          value={name}
          onChangeText={setName}
        />

        <CurrencyInput
          label="Valor alvo (R$)"
          placeholder="0,00"
          value={amount}
          onChangeValue={(value) => setAmount(value || 0)}
        />

        <Button title="Salvar" isLoading={isProcessing} onPress={handleSave} />
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
