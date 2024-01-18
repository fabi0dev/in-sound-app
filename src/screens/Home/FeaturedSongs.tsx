import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { theme } from "@themes/default";
import { FlatList, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface FeaturedSongsProps {
  data: {
    tracks: {
      data: [];
    };
  };
}

interface ItemFeaturedProps {
  id: string;
  itemData: {
    title_short: string;
    artist: {
      name: string;
    };
    album: {
      title: string;
      cover_medium: string;
    };
  };
}

export const FeaturedSongs = ({ data }: FeaturedSongsProps): JSX.Element => {
  const ItemFeatured = ({ itemData }: ItemFeaturedProps) => {
    return (
      <Box flexDirection={"row"} mb={"nano"}>
        <Box mr={"cake"}>
          <Image
            source={{
              uri: itemData.album.cover_medium,
            }}
            width={65}
            height={65}
            style={{ borderRadius: 10 }}
          />
        </Box>

        <Box flexDirection={"row"}>
          <Box flexDirection={"column"} width={"60%"}>
            <Box mb={"prim"}>
              <Typography fontSize={15} ellipsizeMode="tail" numberOfLines={1}>
                {itemData.title_short}
              </Typography>
            </Box>
            <Typography color={"textColor2"} fontSize={14}>
              {itemData.artist.name}
            </Typography>

            <Typography
              color={"textColor3"}
              fontSize={14}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {itemData.album.title}
            </Typography>
          </Box>

          <Box
            alignContent={"center"}
            width={"35%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TouchableOpacity>
              <Icon
                name="play-outline"
                size={35}
                color={theme.colors.textColor2}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box>{!data?.tracks && <Typography>Nenhuma ainda</Typography>}</Box>

      {data?.tracks && (
        <FlatList
          data={data?.tracks.data}
          renderItem={({ item }) => <ItemFeatured itemData={item} />}
          keyExtractor={(item: ItemFeaturedProps) => item.id}
        />
      )}
    </Box>
  );
};
