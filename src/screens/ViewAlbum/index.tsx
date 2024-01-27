import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { useEffect, useState } from "react";
import { PlayerBottom } from "@components/PlayerBottom";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { deezer, soundController } from "@services/index";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "@components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "@redux/playerBottomSlice";
import { TopBar } from "@components/TopBar";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { theme } from "@themes/default";
import AnimatedLottieView from "lottie-react-native";
import { PictureTrack } from "@components/PictureTrack";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { changePlaylist } from "@redux/playlistSlice";

export const ViewAlbum = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { album } = route.params;
  const [dataAlbum, setDataAlbum] = useState({});
  const { sound } = useSelector(selectPlayerBottom);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const getContentHome = async () => {
    const data = await deezer.getAlbum(album.id);
    setDataAlbum(data);
  };

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

  const ItemTrack = ({ trackData }) => {
    return (
      <Box flexDirection={"row"} p={"prim"} mb={"cake"}>
        <Box
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box pb={"nano"} width={(windowWidth * 85) / 100}>
            <TouchableOpacity onPress={() => play(trackData)}>
              <Box flexDirection={"row"}>
                <Box width={"80%"}>
                  <Box mb={"prim"}>
                    <Typography
                      variant="titleMusic"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      color={
                        sound?.id == trackData.id ? "primary" : "textColor1"
                      }
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
                    {trackData.artist.name}
                  </Typography>
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    getContentHome();
  }, []);

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />

      <ImageBackground
        source={{ uri: dataAlbum?.cover_big }}
        resizeMode="center"
        style={{
          width: windowWidth,
          height: windowHeight / 2.5,
        }}
        opacity={1}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={["transparent", theme.colors.primaryOpacity]}
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
                    {dataAlbum?.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="title2">
                    Album {dataAlbum.label}
                  </Typography>
                </Box>

                <Box mb={"nano"} flexDirection={"row"} alignContent={"center"}>
                  {dataAlbum.genres && (
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
              renderItem={({ item, index }) => <ItemTrack trackData={item} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </Box>
      )}

      <PlayerBottom autoControlTrack={true} />
    </Container>
  );
};
