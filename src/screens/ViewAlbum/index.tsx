import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { useCallback, useEffect, useState } from "react";
import { PlayerBottom } from "@components/PlayerBottom";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { deezer, soundController } from "@services/index";
import { Typography } from "@components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "@redux/playerBottomSlice";
import { TopBar } from "@components/TopBar";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { theme } from "@themes/default";
import AnimatedLottieView from "lottie-react-native";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { changePlaylist } from "@redux/playlistSlice";
import { ItemTrack } from "@components/ItemTrack";
import { height } from "styled-system";

export const ViewAlbum = ({
  route: {
    params: { album },
  },
}) => {
  const dispatch = useDispatch();
  const [dataAlbum, setDataAlbum] = useState({});
  const { sound } = useSelector(selectPlayerBottom);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const getContentHome = useCallback(async () => {
    const data = await deezer.getAlbum(album.id);
    setDataAlbum(data);
  }, [dataAlbum]);

  const play = async (track) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
  };

  const playPlaylist = async () => {
    if (typeof dataAlbum?.tracks.data !== undefined) {
      await play(dataAlbum?.tracks.data[0]);

      dispatch(
        changePlaylist({
          tracks: {
            data: dataAlbum?.tracks.data,
          },
        })
      );
    }
  };

  useEffect(() => {
    getContentHome();
  }, []);

  console.log("renderizou");

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />

      <ImageBackground
        source={{ uri: dataAlbum?.cover_big }}
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
                  <Typography
                    style={{
                      textShadowColor: "rgba(0, 0, 0, 0.3)",
                      textShadowOffset: { width: -1, height: 1 },
                      textShadowRadius: 10,
                    }}
                    variant="bold"
                    fontSize={25}
                  >
                    {dataAlbum?.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="title2">
                    Album {dataAlbum.label}
                  </Typography>
                </Box>

                <Box mb={"nano"} flexDirection={"row"} alignContent={"center"}>
                  {dataAlbum?.genres?.data.length > 0 && (
                    <Typography variant="title2" mr={"prim"}>
                      {dataAlbum.genres.data[0].name} |
                    </Typography>
                  )}

                  <IconMaterial
                    name="music-circle"
                    size={15}
                    color={theme.colors.primary}
                  />

                  <Typography ml={"prim"} variant="title2">
                    {dataAlbum.nb_tracks} Músicas
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

      {dataAlbum?.tracks && (
        <Box p={"nano"} pt={"xxxs"}>
          {dataAlbum?.tracks.data && (
            <FlatList
              data={dataAlbum?.tracks.data}
              renderItem={({ item, index }) => (
                <Box mb={"cake"}>
                  <ItemTrack
                    current={sound?.id == item.id}
                    showPicture={false}
                    trackData={item}
                    index={index}
                  />
                </Box>
              )}
              keyExtractor={(item) => item.id}
              style={{ height: (windowHeight * 70) / 100 - 70 }}
            />
          )}
        </Box>
      )}

      <PlayerBottom autoControlTrack={false} />
    </Container>
  );
};
