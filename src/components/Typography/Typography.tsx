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

type TextVariantsTypes = "regular" | "bold" | "title1" | "title2" | "title3";

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
      fontFamily: "NunitoSansRegular",
    },
    bold: {
      fontFamily: "NunitoSansBold",
      fontWeight: "bold",
    },
    title1: {
      fontFamily: "NunitoSansBold",
      fontWeight: "bold",
      fontSize: 17,
    },
    title2: {
      fontFamily: "NunitoSansRegular",
      fontSize: 13,
    },
    title3: {
      fontFamily: "NunitoSansRegular",
      fontSize: 11,
    },
  },
});

export const Typography = styled(Text)<TextProps>`
  ${({ theme }) => ({
    color: theme.colors.textColor1,
    fontSize: 16,
    fontFamily: "NunitoSansRegular",
    fontWeight: "normal",
  })}
  ${margin}
  ${color}
  ${typography}
  ${textVariants}
  ${padding}
`;
