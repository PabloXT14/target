import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import { colors } from '@/theme/colors'

type RouteParams = {
  id: string
}

export default function Transaction() {
  const { id } = useLocalSearchParams<RouteParams>()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>Transaction</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ID: {id}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[100],
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.blue[500],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.gray[100],
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
})
