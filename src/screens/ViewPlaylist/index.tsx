import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { soundController } from "../../services/SoundController";
import { Typography } from "@components/Typography";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TopBar } from "@components/TopBar";
import { deezer } from "../../services";
import { PlayerBottom } from "@components/PlayerBottom";
import AnimatedLottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "../../redux/playerBottomSlice";
import { PictureTrack } from "@components/PictureTrack";
import { changePlaylist } from "../../redux/playlistSlice";

interface Itrack {
  id: string;
  title: string;
  preview: string;
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
  const { sound } = useSelector(selectPlayerBottom);
  const [dataPlaylist, setDataPlaylist] = useState<IPlaylist>();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const { params } = route;

  const getPlaylist = async (id: string) => {
    const data = await deezer.getPlaylist(id);
    setDataPlaylist(data);
  };

  const play = async (trackData) => {
    dispatch(changeMusic(trackData));
    await soundController.play(trackData.preview);
  };

  const playPlaylist = async () => {
    if (typeof dataPlaylist?.tracks.data[0] !== undefined) {
      await play(dataPlaylist?.tracks.data[0]);
      dispatch(changePlaylist(dataPlaylist));
    }
  };

  const ItemTrack = ({ trackData, index }) => {
    return (
      <Box flexDirection={"row"} p={"prim"} mb={"nano"}>
        <TouchableOpacity onPress={() => play(trackData)}>
          <Box flexDirection={"row"}>
            <Box justifyContent={"center"} mr={"nano"}>
              <Typography variant="title3">{index + 1}</Typography>
            </Box>
            <Box mr={"cake"}>
              <PictureTrack
                current={sound.id == trackData.id}
                uri={trackData.album.cover_medium}
                size="small"
              />
            </Box>

            <Box flexDirection={"row"}>
              <Box
                justifyContent={"center"}
                flexDirection={"column"}
                width={"80%"}
              >
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
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  useEffect(() => {
    getPlaylist(params.playlist.id);
  }, []);

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />
      <ImageBackground
        source={{ uri: dataPlaylist?.picture_xl }}
        resizeMode="cover"
        style={{
          width: windowWidth,
          height: (windowHeight * 35) / 100,
        }}
        opacity={0.4}
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
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
            width={"90%"}
          >
            <Typography textAlign={"center"} variant="bold" fontSize={32}>
              {dataPlaylist?.title}
            </Typography>

            <Box width={"90%"} mb={"nano"}>
              <Typography
                textAlign={"center"}
                variant="title2"
                color={"textColor2"}
              >
                {dataPlaylist?.description}
              </Typography>
            </Box>

            <Box mb={"nano"} flexDirection={"row"} alignItems={"center"}>
              <IconMaterial
                name="music-circle"
                size={14}
                color={theme.colors.textColor1}
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
        </LinearGradient>
      </ImageBackground>

      <Box bg="base" p={"nano"}>
        <Box
          width={"100%"}
          alignSelf={"center"}
          alignItems={"flex-end"}
          position={"absolute"}
          mt={-57}
        >
          <TouchableOpacity onPress={() => playPlaylist()}>
            <AnimatedLottieView
              style={{
                width: 120,
                height: 120,
              }}
              source={require("@assets/animations/play.json")}
              autoPlay
              loop={false}
            />
          </TouchableOpacity>
        </Box>

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
