import { StyleSheet, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/shared/page-header'
import { Progress } from '@/components/app/in-progress/progress'

type RouteParams = {
  id: string
}

const DETAILS = {
  current: 'R$ 580,00',
  target: 'R$ 1.790,00',
  percentage: 32,
}

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 32,
  },
})
