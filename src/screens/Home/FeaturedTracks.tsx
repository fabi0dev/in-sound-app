import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { theme } from "@themes/default";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { soundController } from "../../services/SoundController";
import { useNavigation } from "@react-navigation/native";
import { changeMusic, selectPlayerBottom } from "../../redux/playerBottomSlice";
import { useDispatch, useSelector } from "react-redux";
import AnimatedLottieView from "lottie-react-native";

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

interface IFeaturedTracks {
  data: {
    tracks?: {
      data: Array<ITracks>;
      total: number;
    };
  };
}

export const FeaturedTracks = ({ data }: IFeaturedTracks): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { sound, playing } = useSelector(selectPlayerBottom);

  const play = async (trackData: ITracks) => {
    dispatch(changeMusic(trackData));
    await soundController.play(trackData.preview);
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
            if (key >= 6) {
              return;
            }

            return (
              <Box width={120} key={key} mb={"cake"}>
                <TouchableOpacity onPress={() => play(track)}>
                  <Box alignItems={"center"} justifyContent={"center"}>
                    <ImageBackground
                      source={{
                        uri: track.artist.picture_medium,
                      }}
                      borderRadius={10}
                      style={{
                        width: 120,
                        height: 120,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      opacity={sound.id == track.id ? 0.5 : 1}
                    >
                      {sound.id == track.id && (
                        <AnimatedLottieView
                          style={{
                            width: 30,
                            height: 30,
                          }}
                          source={require("@assets/animations/sound-equalizer.json")}
                          autoPlay
                          speed={playing ? 1 : 0}
                        />
                      )}
                    </ImageBackground>
                    <Box alignItems={"center"}>
                      <Typography
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        mt={"prim"}
                        variant="title2"
                        color={sound.id == track.id ? "primary" : "textColor1"}
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
      </Box>
    </Box>
  );
};
