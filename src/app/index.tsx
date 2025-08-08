import { StyleSheet, View } from 'react-native'

import { Header } from '@/components/app/home/header'

export default function Index() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
