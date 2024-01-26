import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Modal as ModalReact } from "react-native";
import React from "react";

interface IModal {
  title?: string;
  onClose?: () => void;
  visible: boolean;
  children?: React.ReactNode;
}

export const ModalBottom = ({
  title,
  onClose,
  visible = true,
  children,
}: IModal) => {
  return (
    <ModalReact
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <Box flex={1} justifyContent={"flex-end"}>
        <Box bg={"base2"}>
          <Box p={"nano"} alignItems={"center"}>
            <Typography variant="title2">{title}</Typography>
          </Box>
          <Box p={"nano"}>{children}</Box>
        </Box>
      </Box>
    </ModalReact>
  );
};
