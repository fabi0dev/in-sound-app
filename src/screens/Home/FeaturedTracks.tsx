import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { TouchableOpacity } from "react-native";
import { soundController } from "@services/index";
import { changeMusic, selectPlayerBottom } from "@redux/playerBottomSlice";
import { useDispatch, useSelector } from "react-redux";
import { PictureTrack } from "@components/PictureTrack";

interface ITracks {
  id: string;
  title: string;
  title_short: string;
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

interface IFeaturedTracks {
  data: {
    tracks?: {
      data: Array<ITracks>;
      total: number;
    };
  };
}

export const FeaturedTracks = ({ data }: IFeaturedTracks): JSX.Element => {
  const dispatch = useDispatch();
  const { sound } = useSelector(selectPlayerBottom);

  const play = async (trackData: ITracks) => {
    dispatch(changeMusic(trackData));
    await soundController.load(trackData.preview);
  };

  return (
    <Box>
      <Box mt={"nano"} mb={"nano"}>
        <Typography marginBottom={"nano"} variant="title1">
          Músicas populares
        </Typography>

        <Box
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {data?.tracks?.data.map((track: ITracks, key) => {
            return (
              <Box key={key} mb={"cake"}>
                <TouchableOpacity onPress={() => play(track)}>
                  <Box flexDirection={"row"}>
                    <Box mr={"cake"}>
                      <PictureTrack
                        current={sound?.id == track.id}
                        uri={track.album.cover_medium}
                        size="small"
                        animationCurrent={true}
                      />
                    </Box>

                    <Box width={"80%"}>
                      <Typography
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        mt={"prim"}
                        variant="titleMusic"
                        color={sound?.id == track.id ? "primary" : "textColor1"}
                      >
                        {track.title !== "" ? track.title : track.title_short}
                      </Typography>

                      <Typography
                        mt={"prim"}
                        color={"textColor2"}
                        variant="title2"
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
      </Box>
    </Box>
  );
};
