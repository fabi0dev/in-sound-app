import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export const FeaturedPlaylists = ({
  data,
}: IFeaturedPlaylists): JSX.Element => {
  const navigation = useNavigation();

  return (
    <Box>
      <Box>{!data?.playlists && <Typography>Nenhuma playlist</Typography>}</Box>

      <Box mt={"xs"} mb={"xx"}>
        <Typography marginBottom={"nano"} variant="title1">
          Playlists
        </Typography>

        <ScrollView horizontal={true}>
          {data?.playlists?.data.map((playlist: IPlaylists, key) => {
            return (
              <Box key={key} pr={"xxxs"} pt={"none"}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewPlaylist", {
                      playlist,
                    })
                  }
                  style={{ width: 120 }}
                >
                  <Image
                    source={{
                      uri: playlist.picture_big,
                    }}
                    width={120}
                    height={120}
                    style={{ borderRadius: 10 }}
                  />

                  <Typography
                    mt={"nano"}
                    variant="title2"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {playlist.title}
                  </Typography>
                </TouchableOpacity>
              </Box>
            );
          })}
        </ScrollView>
      </Box>
    </Box>
  );
};
