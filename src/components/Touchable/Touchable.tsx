import styled from "styled-components";
import {
  color,
  ColorProps,
  SpaceProps,
  space,
  position,
  flexbox,
  margin,
  FlexboxProps,
  MarginProps,
  PositionProps,
  BorderRadiusProps,
  borderRadius,
} from "styled-system";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { theme as themeDefault } from "@themes/default";

export interface TouchablePropsProps
  extends SpaceProps<typeof themeDefault>,
    TouchableOpacityProps,
    FlexboxProps<typeof themeDefault>,
    MarginProps<typeof themeDefault>,
    PositionProps<typeof themeDefault>,
    ColorProps<typeof themeDefault>,
    BorderRadiusProps<typeof themeDefault> {}

export const Touchable = styled(TouchableOpacity)<TouchablePropsProps>`
  ${color}
  ${space}
  ${position}
  ${flexbox}
  ${margin}
  ${borderRadius}
`;
