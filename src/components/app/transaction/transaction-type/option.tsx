import {
  Pressable,
  type PressableProps,
  Text,
  type ColorValue,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'

import { colors } from '@/theme'

type OptionProps = PressableProps & {
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  isSelected: boolean
  selectedColor: ColorValue
}

export function Option({
  title,
  icon,
  isSelected,
  selectedColor,
  ...props
}: OptionProps) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...props}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  )
}
