import styled from "styled-components";
import { Dimensions } from "react-native";
import { Box } from "../";
import { theme } from "@themes/default";

const widthScreen = Dimensions.get("window").width;

export const Content = styled(Box)`
  width: ${widthScreen}px;
  align-items: center;
  padding: ${({ theme }) => theme.space.prim}px;
  margin-top: ${({ theme }) => theme.space.xs}px;
  justify-content: space-between;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
`;
