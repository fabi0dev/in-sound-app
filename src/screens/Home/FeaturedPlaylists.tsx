import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PicturePlaylist } from "@components/PicturePlaylist";
import { memo } from "react";

interface IPlaylists {
  title: string;
  tracklist: string;
  picture_big: string;
}
interface IFeaturedPlaylists {
  data: {
    playlists?: {
      data: Array<IPlaylists>;
      total: number;
    };
  };
}

export const FeaturedPlaylists = memo(
  ({ data }: IFeaturedPlaylists): JSX.Element => {
    const navigation = useNavigation();

    return (
      <Box>
        <Box mt={"xs"} mb={"xx"}>
          <Typography marginBottom={"nano"} variant="title1">
            Playlists
          </Typography>

          <ScrollView horizontal={true}>
            {data?.playlists?.data.map((playlist: IPlaylists, key) => {
              return (
                <Box key={key} pr={"xxxs"} pt={"none"}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ViewPlaylist", {
                        playlist,
                      });
                    }}
                  >
                    <PicturePlaylist uri={playlist.picture_big} size="medium" />

                    <Box mt={"prim"} width={120}>
                      <Typography
                        variant="title2"
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {playlist.title}
                      </Typography>
                    </Box>
                  </TouchableOpacity>
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      </Box>
    );
  }
);
