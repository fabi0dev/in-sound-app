import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "../Box/Box";
import { theme } from "@themes/default";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Typography } from "../";
import { soundController } from "../../services/SoundController";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

interface IPlayerBottom {
  soundCurrent: {};
  setSoundCurrent: Dispatch<SetStateAction<{}>>;
}

interface IDataSound {
  dataSound: {
    preview: string;
    title_short: string;
    artist: {
      name: string;
    };
    album: {
      title: string;
      cover_medium: string;
    };
  };
}

export const PlayerBottom = ({
  soundCurrent,
  setSoundCurrent,
}: IPlayerBottom) => {
  const navigation = useNavigation();
  const [dataSound, setDataSound] = useState<IDataSound>();
  const [played, setPlayed] = useState(false);

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
    let data = await soundController.getSoundCurrent();
    setDataSound(data);

    if (soundCurrent !== data) {
      setPlayed(true);
    }
  };

  const checkStatus = async () => {
    const statusSound = await soundController.getStatusAsync();
    setPlayed(statusSound.isPlaying);
  };

  useEffect(() => {
    getDataSound();
  }, [soundCurrent]);

  useFocusEffect(() => {
    checkStatus();
  });

  return (
    <Box
      width={Dimensions.get("window").width}
      bg={"base2"}
      position={"absolute"}
      bottom={0}
      p={"qm"}
      pl={"nano"}
      pr={"nano"}
      pb={"nano"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box alignItems={"center"} flexDirection={"row"}>
        <Box mr={"cake"}>
          <TouchableOpacity onPress={() => playerPause()}>
            <Icon
              name={played ? "pause-circle" : "play-circle"}
              size={45}
              color={theme.colors.textColor1}
            />
          </TouchableOpacity>
        </Box>

        <Box width={"60%"}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewMusic" as never)}
          >
            <Typography
              variant="bold"
              fontSize={15}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {dataSound?.title_short || ""}
            </Typography>
            <Typography fontSize={12} color={"textColor2"}>
              {dataSound?.artist.name || ""}
            </Typography>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box flexDirection={"row"} justifyContent={"space-between"} width={100}>
        <TouchableOpacity>
          <Icon
            name="heart-outline"
            size={35}
            color={theme.colors.textColor1}
          />
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
  );
};
