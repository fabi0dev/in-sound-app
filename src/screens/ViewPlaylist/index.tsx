import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { soundController, deezer } from "@services/index";
import { Typography } from "@components/Typography";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TopBar } from "@components/TopBar";
import { PlayerBottom } from "@components/PlayerBottom";
import AnimatedLottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { changeMusic } from "@redux/playerBottomSlice";
import { changePlaylist } from "@redux/playlistSlice";
import { ItemTrack } from "@components/ItemTrack";

interface Itrack {
  id: string;
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
interface IPlaylist {
  id: string;
  title: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  fans: number;
  nb_tracks: number;
  description: string;
  tracks: {
    data: Array<Itrack>;
  };
}

export const ViewPlaylist = ({ route }) => {
  const dispatch = useDispatch();
  const [dataPlaylist, setDataPlaylist] = useState<IPlaylist>();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const { params } = route;

  const getPlaylist = async (id: string) => {
    const data = await deezer.getPlaylist(id);
    setDataPlaylist(data);
  };

  const play = async (track: Itrack) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
  };

  const playPlaylist = async () => {
    if (typeof dataPlaylist?.tracks.data[0] !== undefined) {
      await play(dataPlaylist?.tracks.data[0]);
      dispatch(changePlaylist(dataPlaylist));
    }
  };

  useEffect(() => {
    getPlaylist(params.playlist.id);
  }, []);

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />

      <ImageBackground
        source={{ uri: dataPlaylist?.picture_big }}
        resizeMode="center"
        style={{
          width: windowWidth,
          height: (windowHeight * 40) / 100,
        }}
      >
        <LinearGradient
          colors={["transparent", "transparent", theme.colors.primaryOpacity]}
          style={{
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <TopBar />

          <Box
            flexDirection={"row"}
            justifyContent={"space-between"}
            pl={"nano"}
            pr={"nano"}
          >
            <Box width={"80%"}>
              <Typography variant="bold" fontSize={32}>
                {dataPlaylist?.title}
              </Typography>

              <Box mb={"nano"}>
                <Typography variant="title2">
                  {dataPlaylist?.description}
                </Typography>
              </Box>

              <Box mb={"nano"} flexDirection={"row"} alignItems={"center"}>
                <IconMaterial
                  name="music-circle"
                  size={14}
                  color={theme.colors.primary}
                />

                <Typography ml={"prim"} mr={"nano"} variant="title3">
                  {dataPlaylist?.nb_tracks} Músicas
                </Typography>

                <AntDesign
                  name="like1"
                  size={12}
                  color={theme.colors.textColor1}
                />

                <Typography ml={"prim"} mr={"nano"} variant="title3">
                  {dataPlaylist?.fans} fãs
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
        </LinearGradient>
      </ImageBackground>

      <Box p={"nano"}>
        <Box>
          {dataPlaylist?.tracks.data && (
            <FlatList
              data={dataPlaylist?.tracks.data}
              renderItem={({ item, index }) => (
                <ItemTrack trackData={item} index={index} />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </Box>
      </Box>

      <PlayerBottom />
    </Container>
  );
};
