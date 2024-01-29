import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { TopBar } from "@components/TopBar";
import { Typography } from "@components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic } from "@redux/playerBottomSlice";
import { soundController } from "@services/index";
import { selectPlaylist, cleanPlaylist } from "@redux/playlistSlice";
import { FlatList, TouchableOpacity } from "react-native";
import { ModalBottom } from "@components/ModalBottom";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "@themes/default";
import { PlayerBottom } from "@components/PlayerBottom";
import { StatusBar } from "expo-status-bar";
import { ItemTrack } from "@components/ItemTrack";

export const Playlist = () => {
  const dispatch = useDispatch();
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

  return (
    <Container>
      <StatusBar style="inverted" />

      <TopBar title={`Minha playlist `} optionFn={() => setViewActions(true)} />

      <Box mt={"xl"}>
        {tracks?.data && (
          <FlatList
            data={tracks?.data}
            renderItem={({ item, index }) => (
              <ItemTrack trackData={item} index={index} />
            )}
            keyExtractor={(item: any) => item.id}
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
                  size={30}
                  color={theme.colors.textColor1}
                />
                <Typography>Limpar</Typography>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => reproduce()}>
              <Box alignItems={"center"}>
                <Ionicons
                  name="play-circle"
                  size={30}
                  color={theme.colors.textColor1}
                />
                <Typography>Reproduzir</Typography>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </ModalBottom>

      <PlayerBottom autoControlTrack={false} />
    </Container>
  );
};
