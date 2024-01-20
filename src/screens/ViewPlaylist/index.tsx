import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { soundController } from "../../services/SoundController";
import { Typography } from "@components/Typography";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TopBar } from "@components/TopBar";
import { deezer } from "../../services";
import { PlayerBottom } from "@components/PlayerBottom";

interface IPlaylist {
  title: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  tracklist: string;
  nb_fan: number;
}

interface ITrackArtist {
  title: string;
}

export const ViewPlaylist = ({ route }) => {
  const [dataPlaylist, setDataPlaylist] = useState<IPlaylist>();
  const [dataTrackArtist, setDataTrackArtist] = useState<ITrackArtist>();
  const [soundCurrent, setSoundCurrent] = useState({});
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const { params } = route;

  const getPlaylist = async (id: string) => {
    const data = await deezer.getPlaylist(id);
    setDataPlaylist(data);
  };

  const ItemTrack = ({ itemData, index }) => {
    const play = async () => {
      await soundController.setSoundCurrent(itemData, true);
      setSoundCurrent(itemData);
    };

    return (
      <Box flexDirection={"row"} p={"prim"} mb={"nano"}>
        <Box mr={"cake"} justifyContent={"center"}>
          <Typography fontSize={10}>{index + 1}.</Typography>
        </Box>
        <Box mr={"cake"}>
          <Image
            source={{
              uri: itemData.album.cover_medium,
            }}
            width={56}
            height={56}
            style={{ borderRadius: 10 }}
          />
        </Box>

        <Box flexDirection={"row"}>
          <Box justifyContent={"center"} flexDirection={"column"} width={"60%"}>
            <TouchableOpacity onPress={() => play()}>
              <Box mb={"prim"}>
                <Typography
                  fontSize={14}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {itemData.title}
                </Typography>
              </Box>

              <Typography
                color={"textColor2"}
                fontSize={12}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {itemData.album.title}
              </Typography>
            </TouchableOpacity>
          </Box>

          <Box
            alignContent={"center"}
            width={"35%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TouchableOpacity>
              <Icon name="add" size={30} color={theme.colors.textColor1} />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  const init = async () => {};

  useEffect(() => {
    getPlaylist(params.playlist.id);
  }, []);

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />
      <ImageBackground
        source={{ uri: dataPlaylist?.picture_big }}
        resizeMode="cover"
        style={{
          width: windowWidth,
          height: windowHeight / 3,
        }}
        opacity={0.5}
      >
        <TopBar />

        <Box
          flex={1}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="bold" fontSize={35}>
            {dataPlaylist?.title}
          </Typography>

          <Typography mt={"nano"} color={"textColor2"} variant="title2">
            {dataPlaylist?.fans} fãs
          </Typography>
        </Box>
      </ImageBackground>

      <Box p={"nano"}>
        <Box mb={"nano"} alignItems={"center"}>
          <Typography>Mais tocadas</Typography>
        </Box>
        {dataTrackArtist?.data && (
          <FlatList
            data={dataTrackArtist?.data}
            renderItem={({ item, index }) => (
              <ItemTrack itemData={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </Box>

      <PlayerBottom soundCurrent={soundCurrent} />
    </Container>
  );
};
