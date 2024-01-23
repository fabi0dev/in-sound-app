import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { Box } from "../Box/Box";
import { theme } from "@themes/default";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Typography } from "../";
import { soundController } from "../../services/SoundController";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";

interface IPlayerBottom {
  soundCurrent: {};
}

interface IDataSound {
  preview: string;
  title_short: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_small: string;
    cover_medium: string;
  };
}

export const PlayerBottom = ({ soundCurrent }: IPlayerBottom) => {
  const navigation = useNavigation();
  const [dataSound, setDataSound] = useState<IDataSound>();
  const [played, setPlayed] = useState(dataSound ? true : false);

  const playerPause = async () => {
    if (!played) {
      await soundController.play();
      setPlayed(true);
    } else {
      await soundController.pause();
      setPlayed(false);
    }
  };

  const getDataSound = async () => {
    let data: IDataSound = await soundController.getSoundCurrent();

    if (data !== dataSound) {
      setPlayed(true);
    }
    setDataSound(data);
  };

  const checkStatus = async () => {
    try {
      setTimeout(async () => {
        const statusSound = await soundController.getStatusAsync();
        if (statusSound) {
          setPlayed(statusSound.isPlaying);
        }
      }, 200);
    } catch (e) {}
  };

  useEffect(() => {
    getDataSound();
  }, [soundCurrent]);

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      checkStatus();
    }
  });

  if (dataSound === null) {
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
        source={{ uri: dataSound?.album.cover_medium }}
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
                    artist: dataSound?.artist,
                  })
                }
              >
                <Image
                  width={45}
                  height={45}
                  source={{ uri: dataSound?.album.cover_small }}
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
                    {dataSound?.title_short || ""}
                  </Typography>

                  <AnimatedLottieView
                    style={{
                      width: 15,
                      height: 15,
                      marginTop: -3,
                    }}
                    source={require("@assets/animations/sound-equalizer.json")}
                    autoPlay
                    speed={played ? 1 : 0}
                  />
                </Box>
                <Typography fontSize={12} color={"textColor2"}>
                  {dataSound?.artist.name || ""}
                </Typography>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box flexDirection={"row"}>
            <TouchableOpacity onPress={() => playerPause()}>
              <Icon
                name={played ? "pause-circle" : "play-circle"}
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
