import React, { useEffect } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { Box } from "../";
import { Typography } from "../";
import { theme } from "@themes/default";
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
import { Content } from "./styles";
import MarqueeText from "react-native-marquee";

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
    const firstTrack = playlist.tracks.data[0];
    let nextTrack;

    playlist.tracks.data.map((track, key) => {
      if (track.id == sound.id) {
        nextTrack = playlist.tracks.data[key + 1];
      }
    });

    if (nextTrack !== undefined) {
      await changeNewMusic(nextTrack);
    } else if (firstTrack !== undefined) {
      await changeNewMusic(firstTrack);
    } else {
      await soundController.pause();
      dispatch(playPause(false));
    }
  };

  const playerPause = async () => {
    if (soundController.uri == "" && sound.preview !== "") {
      soundController.load(sound.preview);
      dispatch(playPause(true));
      return;
    }

    if (!playing) {
      await soundController.play();
      dispatch(playPause(true));
    } else {
      await soundController.pause();
      dispatch(playPause(false));
    }
  };

  if (sound == undefined || sound?.preview === "") {
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
            status.durationMillis as number,
            status.positionMillis
          );

          if (percent == 100) {
            clearInterval(interval);
            await nextMusic();
          }
        }
      }
    }, 1000);

    if (soundController.uri == "") {
      dispatch(playPause(false));
    }

    return () => clearInterval(interval);
  }, [sound]);

  return (
    <Content>
      <ImageBackground
        source={{ uri: sound?.album.cover_medium }}
        resizeMode="cover"
        blurRadius={100}
        style={{ width: "100%" }}
      >
        <Box p={"qm"} justifyContent={"space-between"} flexDirection={"row"}>
          <Box alignItems={"center"} flexDirection={"row"} width={"75%"}>
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
                  source={{ uri: sound?.album.cover_medium }}
                  style={{
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </Box>

            <Box width={"100%"}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ViewMusic" as never)}
              >
                <Box width={"90%"} alignItems={"center"} flexDirection={"row"}>
                  {/* <Typography
                    variant="bold"
                    fontSize={14}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    color={"primary"}
                    style={{
                      textShadowColor: "rgba(0, 0, 0, 0.3)",
                      textShadowOffset: { width: -1, height: 1 },
                      textShadowRadius: 10,
                    }}
                  >
                    {sound?.title_short || ""}
                  </Typography> */}
                  <MarqueeText
                    speed={0.5}
                    marqueeOnStart={true}
                    loop={true}
                    delay={5000}
                  >
                    <Typography
                      variant="bold"
                      fontSize={14}
                      color={"primary"}
                      style={{
                        textShadowColor: "rgba(0, 0, 0, 0.3)",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10,
                      }}
                    >
                      {sound?.title_short || ""}
                    </Typography>
                  </MarqueeText>

                  <AnimatedLottieView
                    style={{
                      width: 15,
                      height: 15,
                      marginTop: -2,
                    }}
                    source={require("@assets/animations/sound-equalizer.json")}
                    autoPlay
                    speed={playing ? 1 : 0}
                  />
                </Box>
                <Typography
                  fontSize={12}
                  color={"textColor1"}
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.3)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                  }}
                >
                  {sound?.artist.name || ""}
                </Typography>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box flexDirection={"row"} width={50}>
            <TouchableOpacity onPress={() => playerPause()}>
              <Icon
                name={playing ? "pause-circle" : "play-circle"}
                size={50}
                color={theme.colors.textColor1}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </ImageBackground>
    </Content>
  );
};
