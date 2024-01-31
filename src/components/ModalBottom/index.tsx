import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Modal as ModalReact, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

interface IModal {
  title?: string;
  onClose?: () => void;
  visible: boolean;
  children?: React.ReactNode;
}

export const ModalBottom = ({
  title,
  onClose = () => {},
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
      <TouchableWithoutFeedback onPress={() => onClose()}>
        <BlurView
          style={{ height: "100%", width: "100%", position: "absolute" }}
          tint="dark"
          intensity={10}
        />
      </TouchableWithoutFeedback>

      <Box position={"absolute"} width={"100%"} flex={1} bottom={0}>
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
