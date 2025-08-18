import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    fontSize: 16,
    fontFamily: fontFamily.inter.medium,
    color: colors.black,
  },
  listContent: {
    paddingBottom: 72,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: fontFamily.inter.regular,
    color: colors.gray[600],
    marginTop: 24,
  },
})
