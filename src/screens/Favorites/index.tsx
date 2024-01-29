import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { PictureTrack } from "@components/PictureTrack";
import { TopBar } from "@components/TopBar";
import { Typography } from "@components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic } from "@redux/playerBottomSlice";
import { soundController } from "@services/index";
import { selectPlaylist, changePlaylist } from "@redux/playlistSlice";
import { FlatList, TouchableOpacity } from "react-native";
import { ModalBottom } from "@components/ModalBottom";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "@themes/default";
import { PlayerBottom } from "@components/PlayerBottom";
import { StatusBar } from "expo-status-bar";
import { ItemTrack } from "@components/ItemTrack";

export const Favorites = () => {
  const dispatch = useDispatch();
  const { tracks } = useSelector(selectPlaylist);
  const [viewActions, setViewActions] = useState(false);

  const play = async (track) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
  };

  const reproduce = async () => {
    const trackFirst = tracks[0];
    if (trackFirst !== undefined) {
      await play(trackFirst as never);
      dispatch(changePlaylist(tracks));
    }
  };

  return (
    <Container>
      <StatusBar style="inverted" />

      <TopBar title={"Favoritas"} optionFn={() => setViewActions(true)} />

      <Box mt={"xl"}>
        {tracks?.data && (
          <FlatList
            data={tracks?.data}
            renderItem={({ item, index }) => (
              <ItemTrack
                trackData={item}
                showAddPlaylist={false}
                index={index}
              />
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
        title="Minhas favoritas"
        visible={viewActions}
        onClose={() => setViewActions(false)}
      >
        <Box alignItems={"center"}>
          <Box flexDirection={"row"} justifyContent={"space-between"}>
            <TouchableOpacity onPress={() => reproduce()}>
              <Box alignItems={"center"}>
                <Ionicons
                  name="play-circle"
                  size={40}
                  color={theme.colors.textColor1}
                />
                <Typography>Tocar todas</Typography>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </ModalBottom>

      <PlayerBottom autoControlTrack={false} />
    </Container>
  );
};
