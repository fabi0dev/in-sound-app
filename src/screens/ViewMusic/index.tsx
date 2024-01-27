import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { theme } from "@themes/default";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { soundController } from "@services/index";
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
} from "@redux/playerBottomSlice";
import {
  addTrackInPlaylist,
  removeTrackPlaylist,
  selectPlaylist,
} from "@redux/playlistSlice";
import { ProgressBar } from "./ProgressBar";
import { useNavigation } from "@react-navigation/native";
import { addTrack, removeTrack, selectFavorites } from "@redux/favoritesSlice";

export const ViewMusic = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { sound, playing } = useSelector(selectPlayerBottom);
  const { tracks } = useSelector(selectFavorites);
  const playlist = useSelector(selectPlaylist);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const sizeImgAlbum = (windowWidth * 55) / 100;

  const playerPause = async () => {
    if (!playing) {
      await soundController.play();
      dispatch(playPause(true));
    } else {
      await soundController.pause();
      dispatch(playPause(false));
    }
  };

  const changeNewMusic = async (track) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
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

  const isLastMusic = () => {
    let isLast = false;

    playlist.tracks.data.map((track, key) => {
      if (track.id == sound.id) {
        isLast = key + 1 >= playlist.tracks.data.length;
      }
    });

    return isLast;
  };

  const nextMusic = async (trackRef = "") => {
    if (!isLastMusic()) {
      playlist.tracks.data.map(async (track, key) => {
        try {
          if (track.id == (trackRef || sound.id)) {
            const newPos = key + 1;
            const nextTrack = playlist.tracks.data[newPos];

            if (newPos >= playlist.tracks.data.length) {
              return;
            }

            if (typeof nextTrack !== undefined) {
              await changeNewMusic(nextTrack);
            } else {
              await soundController.pause();
              dispatch(playPause(false));
            }
          }
        } catch (e) {}
      });
    }
  };

  const favMusic = async () => {
    if (!favCheck()) {
      dispatch(addTrack(sound));
    } else {
      dispatch(removeTrack(sound));
    }
  };

  const favCheck = () => {
    const isFav = tracks.data.filter((item) => item.id == sound.id);

    if (isFav.length > 0) {
      return true;
    }
    return false;
  };

  const checkAddInPlaylist = () => {
    const isAdd = playlist.tracks.data.filter((item) => item.id == sound.id);

    if (isAdd.length > 0) {
      return true;
    }
    return false;
  };

  const addInPlaylist = () => {
    if (!checkAddInPlaylist()) {
      dispatch(addTrackInPlaylist(sound));
    } else {
      dispatch(removeTrackPlaylist(sound));
    }
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
        blurRadius={50}
      >
        <TopBar />

        <Box justifyContent={"center"} flex={1}>
          <Box mt={"nano"} alignItems={"center"}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewArtist", {
                  artist: sound?.artist,
                })
              }
            >
              <Image
                width={sizeImgAlbum}
                height={sizeImgAlbum}
                source={{
                  uri: sound?.album.cover_big,
                }}
                style={{
                  borderRadius: sizeImgAlbum,
                  borderWidth: 10,
                  borderColor: theme.colors.lightOpacity2,
                  marginTop: -(windowHeight / 5),
                }}
              />
            </TouchableOpacity>
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

          <Box
            width={windowWidth}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"center"}
            mt={"xx"}
          >
            <Box
              width={180}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Playlist")}>
                <MaterialCommunityIcons
                  name="playlist-music-outline"
                  size={30}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => favMusic()}>
                <Icon
                  name={favCheck() ? "heart" : "heart-outline"}
                  size={30}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => addInPlaylist()}>
                <Icon
                  name={checkAddInPlaylist() ? "checkmark-sharp" : "add"}
                  size={30}
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
              width={"60%"}
            >
              <TouchableOpacity onPress={prevMusic}>
                <Icon
                  name="play-skip-back"
                  size={40}
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
                    speed={0}
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

              <TouchableOpacity onPress={() => nextMusic()}>
                <Icon
                  name="play-skip-forward"
                  size={40}
                  color={
                    !isLastMusic()
                      ? theme.colors.textColor1
                      : theme.colors.textColor2
                  }
                />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </Container>
  );
};
