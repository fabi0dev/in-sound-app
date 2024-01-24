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
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "../../redux/playerBottomSlice";

interface IDataArtist {
  name: string;
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

export const ViewArtist = ({ route }) => {
  const dispatch = useDispatch();
  const { sound } = useSelector(selectPlayerBottom);
  const [dataArtist, setDataArtist] = useState<IDataArtist>();
  const [dataTrackArtist, setDataTrackArtist] = useState<ITrackArtist>();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const { params } = route;

  const getDataArtist = async (id: string) => {
    const data = await deezer.getArtist(id);
    setDataArtist(data);
  };

  const getTrackList = async (id: string) => {
    const data = await deezer.getArtistTopTrack(id);
    setDataTrackArtist(data);
  };

  const ItemTrack = ({ trackData, index }) => {
    const play = async () => {
      dispatch(changeMusic(trackData));
      await soundController.play(trackData.preview);
    };

    return (
      <Box flexDirection={"row"} p={"prim"} mb={"nano"}>
        <Box mr={"cake"} justifyContent={"center"}>
          <Typography fontSize={10}>{index + 1}.</Typography>
        </Box>
        <Box mr={"cake"}>
          <Image
            source={{
              uri: trackData.album.cover_medium,
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
                  color={sound.id == trackData.id ? "primary" : "textColor1"}
                >
                  {trackData.title}
                </Typography>
              </Box>

              <Typography
                color={"textColor2"}
                fontSize={12}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {trackData.album.title}
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
    getDataArtist(params.artist.id);
    getTrackList(params.artist.id);
  }, []);

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />
      <ImageBackground
        source={{ uri: dataArtist?.picture_big }}
        resizeMode="cover"
        style={{
          width: windowWidth,
          height: windowHeight / 3,
        }}
        opacity={0.5}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={["transparent", "transparent", theme.colors.primaryOpacity]}
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <TopBar />

          <Box
            flex={1}
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="bold" fontSize={35}>
              {dataArtist?.name}
            </Typography>

            <Typography mt={"nano"} color={"textColor2"} variant="title2">
              {dataArtist?.nb_fan} fãs
            </Typography>
          </Box>
        </LinearGradient>
      </ImageBackground>

      <Box p={"nano"}>
        <Box mb={"nano"} alignItems={"center"}>
          <Typography variant="title1">Mais tocadas</Typography>
        </Box>
        {dataTrackArtist?.data && (
          <FlatList
            data={dataTrackArtist?.data}
            renderItem={({ item, index }) => (
              <ItemTrack trackData={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </Box>

      <PlayerBottom />
    </Container>
  );
};
