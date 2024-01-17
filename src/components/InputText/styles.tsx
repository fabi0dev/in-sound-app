import styled from "styled-components";
import { theme as themeDefault } from "../../themes/default";
import {
  padding,
  ColorProps,
  TypographyProps,
  BorderProps,
  PaddingProps,
  margin,
  MarginProps,
} from "styled-system";
import { TextInput } from "react-native";

export type TextInputVariantsType = "focusIn" | "";
export interface TextInputProps
  extends TypographyProps<typeof themeDefault>,
    ColorProps<typeof themeDefault>,
    BorderProps<typeof themeDefault>,
    PaddingProps<typeof themeDefault>,
    MarginProps<typeof themeDefault> {
  focusControl?: TextInputVariantsType;
}

export const RTextInput = styled(TextInput)<TextInputProps>`
  font-size: 16px;
  height: 55px;
  flex: 1;
  color: ${({ theme }) => theme.colors.textColor1};
  ${padding}
  ${margin}
`;
