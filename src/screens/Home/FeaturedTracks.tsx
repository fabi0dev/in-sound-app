import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { theme } from "@themes/default";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { soundController } from "../../services/SoundController";
import { useNavigation } from "@react-navigation/native";

interface ITracks {
  title: string;
  preview: string;
  title_short: string;
  artist: {
    name: string;
    picture_medium: string;
  };
  album: {
    title: string;
    cover_medium: string;
    cover_small: string;
  };
}

interface IFeaturedTracks {
  data: {
    tracks?: {
      data: Array<ITracks>;
      total: number;
    };
  };
  soundCurrent: {};
  setSoundCurrent: Dispatch<SetStateAction<{}>>;
}

export const FeaturedTracks = ({
  data,
  setSoundCurrent,
}: IFeaturedTracks): JSX.Element => {
  const navigation = useNavigation();
  const [soundPlayer, setSoundPlayer] = useState({});

  const play = async (trackData: ITracks) => {
    await soundController.setSoundCurrent(trackData, true);
    setSoundCurrent(trackData);
    setSoundPlayer(trackData);
  };

  return (
    <Box>
      <Box>{!data?.tracks && <Typography>Nenhuma playlist</Typography>}</Box>

      <Box mt={"nano"} mb={"nano"}>
        <Typography marginBottom={"nano"} variant="title1">
          Músicas populares
        </Typography>

        <Box
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {data?.tracks?.data.map((track: ITracks, key) => {
            if (key >= 6) {
              return;
            }

            return (
              <Box width={120} key={key} mb={"cake"}>
                <TouchableOpacity onPress={() => play(track)}>
                  <Box alignItems={"center"} justifyContent={"center"}>
                    <Image
                      source={{
                        uri: track.artist.picture_medium,
                      }}
                      width={120}
                      height={120}
                      style={{ borderRadius: 10 }}
                    />
                    <Box alignItems={"center"}>
                      <Typography
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        mt={"prim"}
                        variant="title2"
                      >
                        {track.title}
                      </Typography>

                      <Typography
                        mt={"prim"}
                        color={"textColor2"}
                        variant="title3"
                      >
                        {track.artist.name}
                      </Typography>
                    </Box>
                  </Box>
                </TouchableOpacity>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
