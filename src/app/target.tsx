import { StyleSheet, View } from 'react-native'

import { PageHeader } from '@/components/shared/page-header'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/shared/button'

export default function Target() {
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
        />

        <Input
          label="Valor alvo (R$)"
          placeholder="0,00"
          keyboardType="numeric"
        />

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
