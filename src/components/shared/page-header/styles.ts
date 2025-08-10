import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 32,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fontFamily.inter.bold,
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.inter.regular,
  },
})
