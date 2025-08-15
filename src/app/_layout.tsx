import { Suspense } from 'react'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { SQLiteProvider } from 'expo-sqlite'

import { migrate } from '@/database/migrate'

import { colors } from '@/theme/colors'

import { Loading } from '@/components/shared/loading'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Loading />
      </View>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="target.db" onInit={migrate} useSuspense>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.white,
            },
            animation: 'slide_from_right',
          }}
        />
      </SQLiteProvider>
    </Suspense>
  )
}
