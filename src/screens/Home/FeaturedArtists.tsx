import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface IArtists {
  name: string;
  tracklist: string;
  picture_big: string;
}
interface IFeaturedArtists {
  data: {
    artists?: {
      data: Array<IArtists>;
      total: number;
    };
  };
}

export const FeaturedArtists = ({ data }: IFeaturedArtists): JSX.Element => {
  const navigation = useNavigation();

  return (
    <Box>
      <Box>{!data?.artists && <Typography>Nenhuma playlist</Typography>}</Box>

      <Box mt={"xs"} mb={"xx"}>
        <Typography marginBottom={"nano"} variant="title1">
          Artistas
        </Typography>

        <ScrollView horizontal={true}>
          {data?.artists?.data.map((artist: IArtists, key) => {
            return (
              <Box key={key} p={"prim"} mr="prim">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewArtist", {
                      artist,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: artist.picture_big,
                    }}
                    width={80}
                    height={80}
                    style={{ borderRadius: 100 }}
                  />
                  <Box alignItems={"center"} width={80}>
                    <Typography
                      mt={"nano"}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      variant="title3"
                    >
                      {artist.name}
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
