import styled from "styled-components";
import { ColorProps, SpaceProps, variant } from "styled-system";
import { View } from "react-native";
import { theme as themeDefault } from "@themes/default";

export type ContainerTypes = "primary" | "clear";

export interface ContainerProps
  extends ColorProps<typeof themeDefault>,
    SpaceProps<typeof themeDefault> {
  variant?: ContainerTypes;
}

const containerVariants = variant<ContainerProps>({
  prop: "variant",
  variants: {
    primary: {
      padding: "xxxs",
      paddingTop: "xs",
      backgroundColor: "base",
    },
    clear: {
      backgroundColor: "base2",
    },
  },
});

export const BoxContainer = styled(View)<ContainerProps>`
  ${() => ({
    flex: 1,
  })}
  ${containerVariants}
`;
