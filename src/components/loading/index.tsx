import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native'

import { styles } from './styles'

import { colors } from '@/theme/colors'

type LoadingProps = ActivityIndicatorProps

export function Loading({ ...props }: LoadingProps) {
  return (
    <ActivityIndicator
      color={colors.blue[500]}
      style={styles.container}
      {...props}
    />
  )
}
