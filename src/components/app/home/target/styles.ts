import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
