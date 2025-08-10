import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue[500],
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.inter.medium,
    color: colors.white,
  },
})
