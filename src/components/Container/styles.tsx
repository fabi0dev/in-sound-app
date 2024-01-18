import styled from "styled-components";
import { ColorProps, variant } from "styled-system";
import { SafeAreaView, View } from "react-native";
import { theme as themeDefault } from "@themes/default";

export type ContainerTypes = "primary" | "outline";

export interface ContainerProps extends ColorProps<typeof themeDefault> {
  variant?: ContainerTypes;
}

const containerVariants = variant<ContainerProps>({
  prop: "variant",
  variants: {
    primary: {
      backgroundColor: "base",
    },
  },
});

export const BoxContainer = styled(SafeAreaView)<ContainerProps>`
  ${() => ({
    padding: 15,
    paddingTop: 30,
    flex: 1,
  })}
  ${containerVariants}
`;
