import {
  FlatList,
  Text,
  View,
  type FlatListProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { styles } from './styles'

import { colors } from '@/theme'

import { Separator } from '@/components/shared/separator'

type ListProps<T> = FlatListProps<T> & {
  title: string
  emptyMessage?: string
  containerStyle?: StyleProp<ViewStyle>
}

export function List<T>({
  title,
  emptyMessage,
  containerStyle,
  data,
  renderItem,
  ...props
}: ListProps<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>{emptyMessage}</Text>
        }
        {...props}
      />
    </View>
  )
}
