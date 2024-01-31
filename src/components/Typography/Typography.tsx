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

type TextVariantsTypes = "bold" | "title1" | "title2" | "title3";

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
    bold: {
      fontFamily: "OxygenBold",
      fontWeight: "bold",
    },
    title1: {
      fontFamily: "OxygenBold",
      fontWeight: "bold",
      fontSize: 18,
    },
    title2: {
      fontSize: 13,
    },
    title3: {
      fontSize: 11,
    },
  },
});

export const Typography = styled(Text)<TextProps>`
  ${({ theme }) => ({
    color: theme.colors.textColor1,
    fontSize: 16,
    fontFamily: "OxygenRegular",
    fontWeight: "normal",
  })}
  ${margin}
  ${color}
  ${typography}
  ${textVariants}
  ${padding}
`;
