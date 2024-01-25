import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { ScrollView, TouchableOpacity } from "react-native";
import { soundController } from "@services/index";
import { useDispatch, useSelector } from "react-redux";
import { PictureTrack } from "@components/PictureTrack";
import { changeMusic, selectPlayerBottom } from "@redux/playerBottomSlice";
import { selectFavorites } from "@redux/favoritesSlice";

interface ITracks {
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

export const FeaturedFavorites = (): JSX.Element => {
  const dispatch = useDispatch();
  const { tracks } = useSelector(selectFavorites);
  const { sound } = useSelector(selectPlayerBottom);

  const play = async (trackData: ITracks) => {
    dispatch(changeMusic(trackData));
    await soundController.load(trackData.preview);
  };

  return (
    <Box>
      <Box mt={"nano"} mb={"nano"}>
        {tracks?.data.length > 0 && (
          <Typography marginBottom={"nano"} variant="title1">
            Suas favoritas
          </Typography>
        )}

        <ScrollView horizontal={true}>
          <Box
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            {tracks?.data.map((track: ITracks, key) => {
              if (key >= 6) {
                return;
              }

              return (
                <Box width={85} key={key} mb={"cake"}>
                  <TouchableOpacity onPress={() => play(track)}>
                    <Box alignItems={"center"} justifyContent={"center"}>
                      <PictureTrack
                        current={sound.id == track.id}
                        uri={track.album.cover_medium}
                        size="small"
                        animationCurrent={true}
                      />

                      <Box alignItems={"center"}>
                        <Typography
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          mt={"prim"}
                          variant="title2"
                          color={
                            sound.id == track.id ? "primary" : "textColor1"
                          }
                        >
                          {track.title}
                        </Typography>

                        <Typography
                          mt={"prim"}
                          color={"textColor2"}
                          variant="title3"
                        >
                          {track.artist.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                </Box>
              );
            })}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};
