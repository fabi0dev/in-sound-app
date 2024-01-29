import React from "react";
import { Box } from "../Box/Box";
import { Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "@redux/playerBottomSlice";
import { soundController } from "@services/SoundController";
import { Typography } from "../Typography";
import { PictureTrack } from "../PictureTrack";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "@themes/default";
import {
  addTrackInPlaylist,
  removeTrackPlaylist,
  selectPlaylist,
} from "@redux/playlistSlice";

interface Itrack {
  id: number;
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

interface IItemTrack {
  trackData: Itrack;
  showPicture?: boolean;
  showAddPlaylist?: boolean;
  index?: number;
}

export const ItemTrack: React.FC<IItemTrack> = ({
  trackData,
  showPicture = true,
  showAddPlaylist = true,
  index,
}) => {
  const dispatch = useDispatch();
  const { sound } = useSelector(selectPlayerBottom);
  const playlist = useSelector(selectPlaylist);

  const windowWidth = Dimensions.get("window").width;

  const play = async (track: Itrack) => {
    dispatch(changeMusic(track));
    await soundController.load(track.preview);
  };

  const checkAddInPlaylist = (id: number) => {
    if (playlist !== undefined) {
      const isAdd = playlist.tracks.data.filter((item) => id == item.id);

      if (isAdd.length > 0) {
        return true;
      }
    }
    return false;
  };

  const addInPlaylist = (track: Itrack) => {
    if (!checkAddInPlaylist(track.id)) {
      dispatch(addTrackInPlaylist(track));
    } else {
      dispatch(removeTrackPlaylist(track));
    }
  };

  return (
    <Box flexDirection={"row"}>
      <Box
        width={"100%"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        mb={"nano"}
      >
        {index != undefined && (
          <Box width={15} mr={"cake"} justifyContent={"center"}>
            <Typography fontSize={10}>{index + 1}.</Typography>
          </Box>
        )}

        <Box width={(windowWidth * 80) / 100}>
          <TouchableOpacity onPress={() => play(trackData)}>
            <Box flexDirection={"row"}>
              {showPicture && (
                <Box mr={"cake"}>
                  <PictureTrack
                    current={sound?.id == trackData.id}
                    uri={trackData.album.cover_medium}
                    size="small"
                    animationCurrent={true}
                  />
                </Box>
              )}

              <Box width={"80%"}>
                <Box mb={"prim"}>
                  <Typography
                    variant="titleMusic"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    color={sound?.id == trackData.id ? "primary" : "textColor1"}
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

        <Box alignItems={"center"} justifyContent={"center"}>
          {showAddPlaylist && (
            <TouchableOpacity onPress={() => addInPlaylist(trackData)}>
              <Icon
                name={checkAddInPlaylist(trackData.id) ? "checkmark" : "add"}
                size={30}
                color={theme.colors.textColor1}
              />
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Box>
  );
};
