import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/font-family'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <TouchableOpacity
        onPress={() => router.navigate('/target')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Target</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate('/in-progress/1')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to In Progress</Text>
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
    fontFamily: fontFamily.inter.bold,
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
