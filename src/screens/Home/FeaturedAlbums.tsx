import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PicturePlaylist } from "@components/PicturePlaylist";

interface IAlbums {
  title: string;
  tracklist: string;
  cover_medium: string;
}
interface IFeaturedAlbums {
  data: {
    albums?: {
      data: Array<IAlbums>;
      total: number;
    };
  };
}

export const FeaturedAlbums = ({ data }: IFeaturedAlbums): JSX.Element => {
  const navigation = useNavigation();

  return (
    <Box>
      <Box mt={"xs"} mb={"xx"}>
        <Typography marginBottom={"nano"} variant="title1">
          Albuns
        </Typography>

        <ScrollView horizontal={true}>
          {data?.albums?.data.map((album: IAlbums, key) => {
            return (
              <Box key={key} pr={"xxxs"} pt={"none"}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewAlbum", {
                      album,
                    })
                  }
                >
                  <PicturePlaylist uri={album.cover_medium} size="medium" />

                  <Box mt={"prim"} width={120}>
                    <Typography
                      variant="title2"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {album.title}
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
};
