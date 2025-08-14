import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  label: {
    fontSize: 12,
    color: colors.gray[600],
    fontFamily: fontFamily.inter.medium,
  },
  input: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.inter.regular,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
})
