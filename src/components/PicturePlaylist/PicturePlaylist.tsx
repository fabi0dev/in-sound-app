import React from "react";
import { Box } from "../Box/Box";
import { ImageBackground } from "react-native";

interface IPicturePlaylist {
  uri: string;
  size: "small" | "medium";
}

export const PicturePlaylist: React.FC<IPicturePlaylist> = ({
  uri,
  size = "small",
}) => {
  let sizeImg = 0;

  switch (size) {
    case "small":
      sizeImg = 100;
      break;
    case "medium":
      sizeImg = 110;
      break;
  }
  return (
    <Box>
      <ImageBackground
        source={{
          uri,
        }}
        borderRadius={10}
        style={{
          width: sizeImg,
          height: sizeImg,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></ImageBackground>
    </Box>
  );
};
