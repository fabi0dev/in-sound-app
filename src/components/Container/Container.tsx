import React from "react";
import { BoxContainer, ContainerTypes } from "./styles";
import { theme as themeDefault } from "@themes/default";
import { SpaceProps } from "styled-system";
import { ScrollView } from "react-native";

interface ContainerProps extends SpaceProps<typeof themeDefault> {
  children: React.ReactNode;
  variant?: ContainerTypes;
}

export const Container = ({
  variant = "primary",
  children,
  ...props
}: ContainerProps): JSX.Element => {
  return (
    <BoxContainer variant={variant} {...props}>
      {children}
    </BoxContainer>
  );
};
