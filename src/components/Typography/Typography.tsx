import styled from "styled-components";
import {
  color,
  typography,
  TypographyProps,
  ColorProps,
  variant,
  margin,
  padding,
  MarginProps,
  PaddingProps,
} from "styled-system";
import { theme as themeDefault } from "@themes/default";
import { Text } from "react-native";

type TextVariantsTypes = "regular" | "medium";

export interface TextProps
  extends TypographyProps<typeof themeDefault>,
    ColorProps<typeof themeDefault>,
    MarginProps<typeof themeDefault>,
    PaddingProps<typeof themeDefault> {
  variant?: TextVariantsTypes;
}

const textVariants = variant<TextProps, TextVariantsTypes>({
  prop: "variant",
  variants: {
    regular: {
      fontFamily: "Roboto",
    },
    medium: {
      fontFamily: "RobotoMedium",
      fontWeight: "bold",
    },
  },
});

export const Typography = styled(Text)<TextProps>`
  ${({ theme }) => ({
    color: theme.colors.textColor1,
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "normal",
  })}
  ${margin}
  ${color}
  ${typography}
  ${textVariants}
  ${padding}
`;
