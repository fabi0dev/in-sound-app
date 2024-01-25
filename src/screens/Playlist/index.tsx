import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { PictureTrack } from "@components/PictureTrack";
import { TopBar } from "@components/TopBar";
import { Typography } from "@components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "../../redux/playerBottomSlice";
import { soundController } from "../../services";
import { selectPlaylist } from "../../redux/playlistSlice";
import { FlatList, TouchableOpacity } from "react-native";

export const Playlist = () => {
  const dispatch = useDispatch();
  const { sound } = useSelector(selectPlayerBottom);
  const { tracks } = useSelector(selectPlaylist);

  const ItemTrack = ({ trackData, index }) => {
    const play = async () => {
      dispatch(changeMusic(trackData));
      await soundController.play(trackData.preview);
    };

    return (
      <Box flexDirection={"row"} p={"prim"} mb={"nano"}>
        <Box mr={"cake"} justifyContent={"center"}>
          <Typography fontSize={10}>{index + 1}.</Typography>
        </Box>
        <Box mr={"cake"}>
          <PictureTrack
            current={sound.id == trackData.id}
            uri={trackData.album.cover_medium}
            size="small"
          />
        </Box>

        <Box flexDirection={"row"}>
          <Box justifyContent={"center"} flexDirection={"column"} width={"80%"}>
            <TouchableOpacity onPress={() => play()}>
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
      <TopBar title={"Playlist atual"} />

      <Box mt={"sm"}>
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
    </Container>
  );
};
