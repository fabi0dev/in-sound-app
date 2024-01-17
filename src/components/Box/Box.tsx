import { View } from "react-native";
import styled from "styled-components";
import {
  borderColor,
  BorderColorProps,
  borderRadius,
  BorderRadiusProps,
  borderStyle,
  BorderStyleProps,
  borderWidth,
  BorderWidthProps,
  color,
  ColorProps,
  DisplayProps,
  flexbox,
  FlexboxProps,
  height,
  HeightProps,
  margin,
  padding,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  SizeProps,
  space,
  SpaceProps,
  variant,
  width,
  WidthProps,
} from "styled-system";
import { theme } from "@themes/default";

type BoxVariantsType = "page" | "main" | "containerLogin";

const boxVariant = variant<BoxProps, BoxVariantsType, "variant">({
  prop: "variant",
  key: "box",
  variants: {
    page: {
      padding: "xxxs",
      backgroundColor: "base",
    },
    main: {
      backgroundColor: "base",
      flex: 1,
    },
    containerLogin: {
      flex: 1,
      padding: "xxs",
      backgroundColor: "base",
    },
  },
});

export interface BoxProps
  extends FlexboxProps<typeof theme>,
    SpaceProps<typeof theme>,
    PositionProps<typeof theme>,
    ColorProps<typeof theme>,
    BorderColorProps<typeof theme>,
    BorderWidthProps<typeof theme>,
    BorderStyleProps<typeof theme>,
    SizeProps<typeof theme>,
    WidthProps<typeof theme>,
    HeightProps<typeof theme>,
    ShadowProps,
    BorderRadiusProps<typeof theme>,
    DisplayProps<typeof theme> {
  variant?: BoxVariantsType;
}

export const Box = styled(View)<BoxProps>`
  ${boxVariant}
  ${color}
  ${space}
  ${margin}
  ${padding}
  ${width}
  ${height}
  ${flexbox}
  ${position}
  ${borderColor}
  ${borderRadius}
  ${borderWidth}
  ${shadow}
  ${borderStyle}
`;
