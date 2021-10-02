import * as React from 'react';
import { Pressable, Text } from 'react-native';

import { useThemeStore } from '@/stores/useThemeStore';

import styles from './button.module.scss';

export interface ButtonProps {
  titlePressIn?: string;
  titlePressOut?: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  styles?: {
    [key: string]: string | number;
  };
}

export function Button ({
  onPress,
  onPressIn,
  onPressOut,
  titlePressIn,
  titlePressOut,
  styles: propsStyles,
}: ButtonProps) {
  const mode = useThemeStore((state) => state.mode);
  const theme = useThemeStore((state) => state.theme);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressIn : styles.pressOut,
        propsStyles ?? {},

        // Testing using theme
        // TODO:
        // This doesn't work in React-Native
        // for background-color
        // "linear-gradient(to bottom, #ffffff 0%, #f4f4f5 100%)",
        {
          backgroundColor: pressed
            ? theme.button_primary_background
            : theme.button_interactive_background,
          // : theme.button_background,
        },
      ]}>
      {({ pressed }) => (
        <Text
          style={[
            pressed ? styles.titlePressIn : styles.titlePressOut,

            // Testing using theme
            { color: pressed ? theme.button_primary_text : theme.button_text },
          ]}>
          {pressed ? titlePressIn : titlePressOut}
        </Text>
      )}
    </Pressable>
  );
}