import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
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
  const [dataSound, setDataSound] = useState<IDataSound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const sizeImgAlbum = (windowWidth * 60) / 100;

  const playPause = async () => {
    if (!isPlaying) {
      await soundController.play();
      setIsPlaying(true);
    } else {
      await soundController.pause();
      setIsPlaying(false);
    }
  };

  const getDataMusic = async () => {
    const data = await soundController.getSoundCurrent();
    const statusSound = await soundController.getStatusAsync();
    setDataSound(data);
    setIsPlaying(statusSound.isPlaying);
  };

  useEffect(() => {
    getDataMusic();
  }, []);

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />

      <ImageBackground
        source={{ uri: dataSound?.album.cover_big }}
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
                uri: dataSound?.album.cover_big,
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
                {dataSound?.title}
              </Typography>
            </Box>
            <Box mt={"cake"}>
              <Typography fontSize={14} color={"textColor1"}>
                {dataSound?.artist.name}
              </Typography>
            </Box>
          </Box>

          <Box alignItems={"center"} mt={"sm"} mb={"prim"}>
            <Box>
              <Box bg={"base"} height={6} width={(windowWidth / 100) * 60}>
                <Box bg={"primary"} height={6} width={"50%"}></Box>
              </Box>
              <Box flexDirection={"row"} justifyContent={"space-between"}>
                <Typography fontSize={10}>0:00</Typography>
                <Typography fontSize={10}>0:29</Typography>
              </Box>
            </Box>
          </Box>

          <AnimatedLottieView
            style={{
              width: "100%",
              position: "absolute",
              elevation: -1,
            }}
            source={require("@assets/animations/equalizer.json")}
            autoPlay
            speed={isPlaying ? 0.3 : 0}
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

              <TouchableOpacity onPress={() => playPause()}>
                {isPlaying && (
                  <AnimatedLottieView
                    style={{
                      width: 150,
                    }}
                    source={require("@assets/animations/pause.json")}
                    autoPlay
                    loop={false}
                  />
                )}

                {!isPlaying && (
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
