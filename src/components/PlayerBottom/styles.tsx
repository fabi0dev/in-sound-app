import styled from "styled-components";
import { Dimensions } from "react-native";
import { Box } from "../";

const widthScreen = Dimensions.get("window").width;

export const Content = styled(Box)`
  width: ${widthScreen}px;
  position: absolute;
  left: 0;
  bottom: 0;
  align-items: center;
  align-self: center;
  justify-content: space-between;
`;
