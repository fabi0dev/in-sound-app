import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { theme } from "@themes/default";
import { Dispatch, SetStateAction, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { soundController } from "../../services/SoundController";
import { useNavigation } from "@react-navigation/native";

interface FeaturedSongsProps {
  data: {
    tracks?: {
      data: [];
    };
  };
  soundCurrent: {};
  setSoundCurrent: Dispatch<SetStateAction<{}>>;
}

interface ItemFeaturedProps {
  id: string;
  itemData: {
    id: string;
    preview: string;
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

export const FeaturedSongs = ({
  data,
  soundCurrent,
  setSoundCurrent,
}: FeaturedSongsProps): JSX.Element => {
  const navigation = useNavigation();
  const [soundPlayer, setSoundPlayer] = useState({});

  const ItemFeatured = ({ itemData }: ItemFeaturedProps) => {
    const play = async () => {
      await soundController.setSoundCurrent(itemData, true);
      setSoundCurrent(itemData);
      setSoundPlayer(itemData);
    };

    return (
      <Box
        bg={itemData.id == soundPlayer.id ? "lightOpacity1" : ""}
        flexDirection={"row"}
        p={"prim"}
        mb={"nano"}
      >
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
            <TouchableOpacity onPress={() => play()}>
              <Box mb={"prim"}>
                <Typography
                  color={
                    itemData.id == soundPlayer.id ? "primary" : "textColor1"
                  }
                  fontSize={15}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  variant="bold"
                >
                  {itemData.title_short}
                </Typography>
              </Box>
              <Typography color={"textColor3"} fontSize={14}>
                {itemData.artist.name}
              </Typography>

              <Typography
                color={"textColor2"}
                fontSize={14}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {itemData.album.title}
              </Typography>
            </TouchableOpacity>
          </Box>

          <Box
            alignContent={"center"}
            width={"35%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TouchableOpacity>
              <Icon
                name="heart-outline"
                size={30}
                color={theme.colors.textColor1}
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
