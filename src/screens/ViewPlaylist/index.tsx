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
import AnimatedLottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface IPlaylist {
  title: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  fans: number;
  tracks: {
    data: Array<{
      id: string;
      title: string;
    }>;
  };
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

        <TouchableOpacity onPress={() => play()}>
          <Box flexDirection={"row"}>
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
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>

        {/* <Box
          alignContent={"center"}
          width={"35%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <TouchableOpacity>
            <Icon name="add" size={30} color={theme.colors.textColor1} />
          </TouchableOpacity>
        </Box> */}
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
          >
            <Typography variant="bold" fontSize={35}>
              {dataPlaylist?.title}
            </Typography>

            <Typography mt={"nano"} color={"textColor2"} variant="title2">
              {dataPlaylist?.fans} fãs
            </Typography>
          </Box>
        </LinearGradient>
      </ImageBackground>

      <Box width={"90%"} alignSelf={"center"} alignItems={"flex-end"} mt={-55}>
        <TouchableOpacity>
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

      <Box p={"nano"} mt={-55}>
        <Box mb={"nano"}>
          <Typography mb={"prim"} variant="title1">
            Playlist
          </Typography>
          <Typography variant="title2" color={"textColor2"}>
            {dataPlaylist?.description}
          </Typography>
        </Box>

        {dataPlaylist?.tracks.data && (
          <FlatList
            data={dataPlaylist?.tracks.data}
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
