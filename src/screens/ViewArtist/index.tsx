import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
import { soundController } from "@services/index";
import { Typography } from "@components/Typography";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TopBar } from "@components/TopBar";
import { deezer } from "@services/index";
import { PlayerBottom } from "@components/PlayerBottom";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "@redux/playerBottomSlice";
import { changePlaylist } from "@redux/playlistSlice";

import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AnimatedLottieView from "lottie-react-native";
import { ItemTrack } from "@components/ItemTrack";

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
  preview: string;
  data: [];
}

export const ViewArtist = ({
  route: {
    params: { artist },
  },
}) => {
  const dispatch = useDispatch();
  const { sound } = useSelector(selectPlayerBottom);

  const [dataArtist, setDataArtist] = useState<IDataArtist>();
  const [dataTrackArtist, setDataTrackArtist] = useState<ITrackArtist>({
    id: "",
    title: "",
    preview: "",
    data: [],
  });
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const getDataArtist = async (id: string) => {
    const data = await deezer.getArtist(id);
    setDataArtist(data);
  };

  const getTrackList = async (id: string) => {
    const data = await deezer.getArtistTopTrack(id);
    setDataTrackArtist(data);
  };

  const play = async (track) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
  };

  const playPlaylist = async () => {
    if (typeof dataTrackArtist?.data[0] !== undefined) {
      await play(dataTrackArtist?.data[0]);

      dispatch(
        changePlaylist({
          tracks: {
            data: dataTrackArtist.data,
          },
        })
      );
    }
  };

  useEffect(() => {
    getDataArtist(artist.id);
    getTrackList(artist.id);
  }, []);

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />

      <ImageBackground
        source={{ uri: dataArtist?.picture_big }}
        resizeMode="center"
        style={{
          width: windowWidth,
          height: (windowHeight * 30) / 100,
        }}
      >
        <LinearGradient
          colors={["transparent", "transparent", theme.colors.primaryOpacity]}
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Box flex={1} justifyContent={"flex-end"}>
            <TopBar />

            <Box
              flexDirection={"row"}
              justifyContent={"space-between"}
              pl={"nano"}
              pr={"nano"}
            >
              <Box justifyContent={"center"} width={"80%"}>
                <Box mb={"prim"}>
                  <Typography variant="bold" fontSize={25}>
                    {dataArtist?.name}
                  </Typography>
                </Box>

                <Box flexDirection={"row"} alignItems={"center"}>
                  <IconMaterial
                    name="music-circle"
                    size={14}
                    color={theme.colors.primary}
                  />

                  <Typography ml={"prim"} mr={"nano"} variant="title3">
                    {dataTrackArtist?.data.length} Músicas
                  </Typography>

                  <AntDesign
                    name="like1"
                    size={12}
                    color={theme.colors.textColor1}
                  />

                  <Typography ml={"prim"} mr={"nano"} variant="title3">
                    {dataArtist?.nb_fan} fãs
                  </Typography>
                </Box>
              </Box>

              <Box alignSelf={"flex-end"}>
                <TouchableOpacity onPress={() => playPlaylist()}>
                  <AnimatedLottieView
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    source={require("@assets/animations/play.json")}
                    autoPlay
                    loop={false}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </LinearGradient>
      </ImageBackground>

      {dataTrackArtist?.data !== undefined && (
        <Box p={"nano"}>
          {dataTrackArtist?.data && (
            <FlatList
              data={dataTrackArtist?.data}
              renderItem={({ item, index }) => (
                <ItemTrack
                  current={sound?.id == item.id}
                  trackData={item}
                  index={index}
                />
              )}
              keyExtractor={(item) => item.id}
              style={{ height: (windowHeight * 70) / 100 - 70 }}
            />
          )}
        </Box>
      )}

      <PlayerBottom />
    </Container>
  );
};
