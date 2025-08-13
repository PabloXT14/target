import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 16,
  },
  info: {
    flex: 1,
    gap: 7,
  },
  value: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.inter.medium,
  },
  description: {
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: fontFamily.inter.regular,
  },
})
