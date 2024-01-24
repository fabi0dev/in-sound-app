import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { soundController } from "../../services/SoundController";
import { Typography } from "@components/Typography";
import { TopBar } from "./TopBar";
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { playPause, selectPlayerBottom } from "../../redux/playerBottomSlice";
import { helpers } from "../../services";
import { ProgressBar } from "./ProgressBar";

interface IDataSound {
  preview: string;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_big: string;
  };
}

export const ViewMusic = () => {
  const dispatch = useDispatch();
  const { sound, playing } = useSelector(selectPlayerBottom);
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const sizeImgAlbum = (windowWidth * 60) / 100;

  const playerPause = async () => {
    if (!playing) {
      await soundController.play();
      dispatch(playPause(true));
    } else {
      await soundController.pause();
      dispatch(playPause(false));
    }
  };

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />

      <ImageBackground
        source={{ uri: sound?.album.cover_big }}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
        opacity={0.5}
        blurRadius={5}
      >
        <TopBar />

        <Box justifyContent={"center"} flex={1}>
          <Box mt={"nano"} alignItems={"center"}>
            <Image
              width={sizeImgAlbum}
              height={sizeImgAlbum}
              source={{
                uri: sound?.album.cover_big,
              }}
              style={{
                borderRadius: sizeImgAlbum,
                borderWidth: 10,
                borderColor: theme.colors.lightOpacity1,
                marginTop: -(windowHeight / 5),
              }}
            />
          </Box>

          <Box alignItems={"center"} mt={"nano"}>
            <Box>
              <Typography textAlign={"center"} variant="bold" fontSize={20}>
                {sound?.title}
              </Typography>
            </Box>
            <Box mt={"cake"}>
              <Typography fontSize={14} color={"textColor1"}>
                {sound?.artist.name}
              </Typography>
            </Box>
          </Box>

          <ProgressBar />

          <AnimatedLottieView
            style={{
              width: "100%",
              position: "absolute",
              elevation: -1,
            }}
            source={require("@assets/animations/equalizer.json")}
            autoPlay
            speed={playing ? 0.3 : 0}
          />
          <Box
            width={windowWidth}
            bottom={0}
            position={"absolute"}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"center"}
            mb={"sm"}
          >
            <Box
              width={windowWidth / 2}
              alignItems={"center"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <TouchableOpacity>
                <Icon
                  name="play-skip-back-outline"
                  size={35}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => playerPause()}>
                {playing && (
                  <AnimatedLottieView
                    style={{
                      width: 150,
                    }}
                    source={require("@assets/animations/pause.json")}
                    autoPlay
                    loop={false}
                  />
                )}

                {!playing && (
                  <AnimatedLottieView
                    style={{
                      width: 150,
                    }}
                    source={require("@assets/animations/play.json")}
                    autoPlay
                    loop={false}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon
                  name="play-skip-forward-outline"
                  size={35}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </Container>
  );
};
