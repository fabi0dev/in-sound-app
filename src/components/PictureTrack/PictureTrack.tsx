import React from "react";
import { Box } from "../Box/Box";
import { Image, ImageBackground } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { selectPlayerBottom } from "@redux/playerBottomSlice";

interface IPictureTrack {
  uri: string;
  current: boolean;
  size: "small" | "medium-small" | "medium";
}

export const PictureTrack: React.FC<IPictureTrack> = ({
  uri,
  current,
  size = "small",
}) => {
  let sizeImg = 0;

  switch (size) {
    case "small":
      sizeImg = 56;
      break;
    case "medium-small":
      sizeImg = 75;
      break;
    case "medium":
      sizeImg = 110;
      break;
  }

  return (
    <Box>
      <Image
        source={{
          uri,
        }}
        borderRadius={5}
        style={{
          width: sizeImg,
          height: sizeImg,
          justifyContent: "center",
          alignItems: "center",
          opacity: current ? 0.5 : 1,
        }}
      />
    </Box>
  );
};
