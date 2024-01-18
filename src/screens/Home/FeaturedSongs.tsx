import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { FlatList, Image } from "react-native";

interface FeaturedSongsProps {
  data: {
    tracks: {
      data: [];
    };
  };
}

interface ItemFeaturedProps {
  itemData: {};
}

export const FeaturedSongs = ({ data }: FeaturedSongsProps): JSX.Element => {
  const ItemFeatured = ({ itemData }: ItemFeaturedProps) => {
    console.log("ok");
    return (
      <Box flexDirection={"row"} mb={"nano"}>
        <Box mr={"cake"}>
          <Image
            source={{
              uri: itemData.album.cover_medium,
            }}
            width={75}
            height={75}
            style={{ borderRadius: 10 }}
          />
        </Box>

        <Box flexDirection={"column"}>
          <Box mb={"prim"}>
            <Typography fontSize={15} ellipsizeMode="middle">
              {itemData.title_short}
            </Typography>
          </Box>
          <Typography color={"textColor2"} fontSize={14}>
            {itemData.artist.name}
          </Typography>

          <Typography text color={"textColor3"} fontSize={14}>
            {itemData.album.title}
          </Typography>
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
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};
