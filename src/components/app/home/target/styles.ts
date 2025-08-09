import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    height: 72,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 7,
  },
  name: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fontFamily.inter.medium,
  },
  status: {
    color: colors.gray[600],
    fontSize: 10,
    fontFamily: fontFamily.inter.regular,
  },
})
