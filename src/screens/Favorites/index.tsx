import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { PictureTrack } from "@components/PictureTrack";
import { TopBar } from "@components/TopBar";
import { Typography } from "@components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "@redux/playerBottomSlice";
import { soundController } from "@services/index";
import { selectPlaylist, cleanPlaylist } from "@redux/playlistSlice";
import { FlatList, TouchableOpacity } from "react-native";
import { ModalBottom } from "@components/ModalBottom";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "@themes/default";
import { PlayerBottom } from "@components/PlayerBottom";
import { StatusBar } from "expo-status-bar";

export const Playlist = () => {
  const dispatch = useDispatch();
  const { sound } = useSelector(selectPlayerBottom);
  const { tracks } = useSelector(selectPlaylist);
  const [viewActions, setViewActions] = useState(false);

  const play = async (track) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
  };

  const clean = () => {
    dispatch(cleanPlaylist());
    setViewActions(false);
  };

  const reproduce = async () => {
    await play(tracks.data[0]);
    setViewActions(false);
  };

  const ItemTrack = ({ trackData, index }) => {
    return (
      <Box flexDirection={"row"} p={"prim"} mb={"nano"}>
        <Box width={15} mr={"cake"} justifyContent={"center"}>
          <Typography fontSize={10}>{index + 1}.</Typography>
        </Box>
        <Box mr={"cake"}>
          <PictureTrack
            current={sound.id == trackData.id}
            uri={trackData.album.cover_medium}
            size="small"
            animationCurrent={true}
          />
        </Box>

        <Box flexDirection={"row"}>
          <Box justifyContent={"center"} flexDirection={"column"} width={"80%"}>
            <TouchableOpacity onPress={() => play(trackData)}>
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
        </Box>
      </Box>
    );
  };

  return (
    <Container>
      <StatusBar style="inverted" />

      <TopBar title={"Minha playlist"} optionFn={() => setViewActions(true)} />

      <Box mt={"md"}>
        {tracks?.data && (
          <FlatList
            data={tracks?.data}
            renderItem={({ item, index }) => (
              <ItemTrack trackData={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </Box>

      {!tracks?.data.length && (
        <Box alignSelf={"center"} mt={"sm"}>
          <Typography variant="title2" color={"textColor2"}>
            Nenhuma música ainda
          </Typography>
        </Box>
      )}

      <ModalBottom
        title="O que fazer com sua playlist?"
        visible={viewActions}
        onClose={() => setViewActions(false)}
      >
        <Box alignItems={"center"}>
          <Box
            width={200}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <TouchableOpacity onPress={() => clean()}>
              <Box alignItems={"center"}>
                <Ionicons
                  name="trash"
                  size={22}
                  color={theme.colors.textColor1}
                />
                <Typography variant="title2">Limpar</Typography>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => reproduce()}>
              <Box alignItems={"center"}>
                <Ionicons
                  name="play-circle"
                  size={22}
                  color={theme.colors.textColor1}
                />
                <Typography variant="title2">Reproduzir</Typography>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </ModalBottom>

      <PlayerBottom autoControlTrack={false} />
    </Container>
  );
};
