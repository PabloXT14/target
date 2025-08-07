import { Stack } from 'expo-router'

import { colors } from '@/theme/colors'

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.white,
        },
        animation: 'slide_from_right',
      }}
    />
  )
}
