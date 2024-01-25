import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import Icon from "react-native-vector-icons/Ionicons";
import { soundController } from "../../services/SoundController";
import { Typography } from "@components/Typography";
import { TopBar } from "./TopBar";
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMusic,
  playPause,
  selectPlayerBottom,
} from "../../redux/playerBottomSlice";
import { selectPlaylist } from "../../redux/playlistSlice";
import { ProgressBar } from "./ProgressBar";
import { useNavigation } from "@react-navigation/native";
import {
  addTrack,
  removeTrack,
  selectFavorites,
} from "../../redux/favoritesSlice";

export const ViewMusic = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { sound, playing } = useSelector(selectPlayerBottom);
  const playlist = useSelector(selectPlaylist);
  const { tracks } = useSelector(selectFavorites);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const sizeImgAlbum = (windowWidth * 60) / 100;

  const playerPause = async () => {
    if (!playing) {
      await soundController.play();
      dispatch(playPause(true));
    } else {
      await soundController.pause();
      dispatch(playPause(false));
    }
  };

  const changeNewMusic = async (obj) => {
    dispatch(changeMusic(obj));
    await soundController.play(obj.preview);
  };

  const prevMusic = async () => {
    playlist.tracks.data.map(async (item, key) => {
      try {
        if (item.id == sound.id) {
          const prevObj = playlist.tracks.data[key - 1];
          if (typeof prevObj !== undefined) {
            await changeNewMusic(prevObj);
          }
        }
      } catch (e) {}
    });
  };

  const nextMusic = async () => {
    playlist.tracks.data.map(async (item, key) => {
      try {
        if (item.id == sound.id) {
          const nextObj = playlist.tracks.data[key + 1];
          if (typeof nextObj !== undefined) {
            await changeNewMusic(nextObj);
          }
        }
      } catch (e) {}
    });
  };

  const favMusic = async () => {
    if (!favCheck()) {
      dispatch(addTrack(sound));
    } else {
      dispatch(removeTrack(sound));
    }
  };

  const favCheck = () => {
    const isFav = tracks.data.filter((item: ITrack) => item.id == sound.id);

    if (isFav.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <Container variant="clear">
      <StatusBar style="inverted" />

      <ImageBackground
        source={{ uri: sound?.album.cover_big }}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
        opacity={0.5}
        blurRadius={5}
      >
        <TopBar />

        <Box justifyContent={"center"} flex={1}>
          <Box mt={"nano"} alignItems={"center"}>
            <Image
              width={sizeImgAlbum}
              height={sizeImgAlbum}
              source={{
                uri: sound?.album.cover_big,
              }}
              style={{
                borderRadius: sizeImgAlbum,
                borderWidth: 10,
                borderColor: theme.colors.lightOpacity1,
                marginTop: -(windowHeight / 5),
              }}
            />
          </Box>

          <Box alignItems={"center"} mt={"nano"}>
            <Box>
              <Typography textAlign={"center"} variant="bold" fontSize={20}>
                {sound?.title}
              </Typography>
            </Box>
            <Box mt={"cake"}>
              <Typography variant="title2" color={"primary"}>
                {sound?.artist.name}
              </Typography>
            </Box>
          </Box>

          <AnimatedLottieView
            style={{
              width: "100%",
              position: "absolute",
              elevation: -1,
            }}
            source={require("@assets/animations/equalizer.json")}
            autoPlay
            speed={playing ? 0.3 : 0}
          />

          <Box
            width={windowWidth}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"center"}
            mt={"xx"}
          >
            <Box
              width={100}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Playlist")}>
                <Icon name="list" size={25} color={theme.colors.textColor1} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => favMusic()}>
                <Icon
                  name={favCheck() ? "heart" : "heart-outline"}
                  size={25}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>
            </Box>
          </Box>

          <ProgressBar />

          <Box
            width={windowWidth}
            bottom={0}
            position={"absolute"}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"center"}
            mb={"sm"}
          >
            <Box
              alignItems={"center"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <TouchableOpacity onPress={prevMusic}>
                <Icon
                  name="play-skip-back-outline"
                  size={35}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => playerPause()}>
                {playing && (
                  <AnimatedLottieView
                    style={{
                      width: 150,
                    }}
                    source={require("@assets/animations/pause.json")}
                    autoPlay
                    loop={false}
                  />
                )}

                {!playing && (
                  <AnimatedLottieView
                    style={{
                      width: 150,
                    }}
                    source={require("@assets/animations/play.json")}
                    autoPlay
                    loop={false}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={nextMusic}>
                <Icon
                  name="play-skip-forward-outline"
                  size={35}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </Container>
  );
};
