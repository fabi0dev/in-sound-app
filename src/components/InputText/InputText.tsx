import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { RTextInput } from "./styles";
import { Box } from "../Box/Box";
import { theme } from "@themes/default";

interface InputTextProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: JSX.Element;
  width?: number;
  heigth?: number;
  bg?: typeof theme.colors;
  onFocus?: (Event) => void;
  onBlur?: (Event) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  error,
  leftIcon,
  width,
  heigth,
  onFocus,
  onBlur,
  bg,
  ...props
}) => {
  return (
    <Box>
      <Box
        width={width}
        height={heigth}
        flexDirection={"row"}
        alignItems={"center"}
        bg={bg || "lightOpacity1"}
      >
        <Box ml={"nano"}>{leftIcon}</Box>
        <RTextInput
          px={"xxxs"}
          py={"nano"}
          placeholderTextColor={theme.colors.textColor2}
          pl={"xxxs"}
          pr={"xxxs"}
          onFocus={(e) => {
            typeof onFocus == "function" && onFocus(e);
          }}
          onBlur={(e) => {
            typeof onBlur == "function" && onBlur(e);
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};
