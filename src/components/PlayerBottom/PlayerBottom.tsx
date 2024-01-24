import React, { useEffect, useRef, useState } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { Box } from "../Box/Box";
import { theme } from "@themes/default";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Typography } from "../";
import { soundController } from "../../services/SoundController";
import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { playPause, selectPlayerBottom } from "../../redux/playerBottomSlice";

export const PlayerBottom = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { playing, sound } = useSelector(selectPlayerBottom);

  const playerPause = async () => {
    if (!playing) {
      await soundController.play();
      dispatch(playPause(true));
    } else {
      await soundController.pause();
      dispatch(playPause(false));
    }
  };

  if (sound.preview === "") {
    return null;
  }

  return (
    <Box
      width={Dimensions.get("window").width}
      bg={"base2"}
      position={"absolute"}
      bottom={0}
      alignItems={"center"}
      alignSelf={"center"}
      justifyContent={"space-between"}
    >
      <ImageBackground
        source={{ uri: sound?.album.cover_medium }}
        resizeMode="cover"
        opacity={0.1}
        blurRadius={4}
        style={{ width: "100%" }}
      >
        <Box p={"nano"} pt={"nano"} pb={"nano"} flexDirection={"row"}>
          <Box alignItems={"center"} flexDirection={"row"}>
            <Box mr={"cake"}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewArtist", {
                    artist: sound?.artist,
                  })
                }
              >
                <Image
                  width={45}
                  height={45}
                  source={{ uri: sound?.album.cover_small }}
                  style={{
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </Box>

            <Box width={"70%"}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ViewMusic" as never)}
              >
                <Box alignItems={"center"} flexDirection={"row"}>
                  <Typography
                    variant="bold"
                    fontSize={14}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    color={"primary"}
                  >
                    {sound?.title_short || ""}
                  </Typography>

                  <AnimatedLottieView
                    style={{
                      width: 15,
                      height: 15,
                      marginTop: -3,
                    }}
                    source={require("@assets/animations/sound-equalizer.json")}
                    autoPlay
                    speed={playing ? 1 : 0}
                  />
                </Box>
                <Typography fontSize={12} color={"textColor2"}>
                  {sound?.artist.name || ""}
                </Typography>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box flexDirection={"row"}>
            <TouchableOpacity onPress={() => playerPause()}>
              <Icon
                name={playing ? "pause-circle" : "play-circle"}
                size={45}
                color={theme.colors.textColor1}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};
