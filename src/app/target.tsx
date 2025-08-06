import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

import { colors } from '@/theme/colors'

export default function Target() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Target</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Go to Home</Text>
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
})
