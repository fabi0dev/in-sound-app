import React, { useEffect } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { Box } from "../";
import { Typography } from "../";
import { theme } from "@themes/default";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { helpers, soundController } from "@services/index";
import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMusic,
  playPause,
  selectPlayerBottom,
} from "@redux/playerBottomSlice";
import { selectPlaylist } from "@redux/playlistSlice";

interface IPlayerBottom {
  autoControlTrack?: boolean;
}

export const PlayerBottom = ({ autoControlTrack = false }: IPlayerBottom) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { playing, sound } = useSelector(selectPlayerBottom);
  const playlist = useSelector(selectPlaylist);

  const changeNewMusic = async (track) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
  };

  const nextMusic = async () => {
    playlist.tracks.data.map(async (track, key) => {
      try {
        if (track.id == sound.id) {
          const nextTrack = playlist.tracks.data[key + 1];
          if (typeof nextTrack !== undefined) {
            await changeNewMusic(nextTrack);
          } else {
            await soundController.pause();
            dispatch(playPause(false));
          }
        }
      } catch (e) {}
    });
  };

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

  useEffect(() => {
    let interval = setInterval(async () => {
      if (
        soundController.fnController.getStatusAsync !== undefined &&
        autoControlTrack == true
      ) {
        let status = await soundController.fnController.getStatusAsync();

        if (status.isLoaded) {
          const percent = helpers.getPercentTimeMusic(
            status.durationMillis,
            status.positionMillis
          );

          if (percent == 100) {
            clearInterval(interval);
            nextMusic();
          }
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [sound]);

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
        opacity={0.4}
        blurRadius={10}
        style={{ width: "100%" }}
      >
        <Box
          p={"nano"}
          pt={"cake"}
          pb={"cake"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
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
